import { EEntities } from "../types";

export const gqlPreviewFragment = `                    
title
subtitle
slug
image
sys {
    id
    publishedAt
    firstPublishedAt
}
`;

export enum ETypeFields {
    preview = 1,
    previewAndBody,
    custom,
}

export type TVariables = {
    limit?: number | null;
    order?: string;
    skip?: number | null;
    where?: { [key: string]: any };
    [key: string]: any;
};

export type TSchemaItem = {
    entity: EEntities;
    fields: ETypeFields;
    fieldsCustom?: Array<
        | string
        | {
              // for example make query field "sys/json" which contain two field "field1" and "field2"
              // response will be contain data by path  "pathData/field1" and "pathData/field2"
              query: string; // can be "oneword" or path "word1/word2"
              dataPath?: string; // can be "oneword"
              data: Array<string> | null;
          }
    >;
    variables?: TVariables;
    links?: Array<TSchemaItem>;
    refs?: Array<TSchemaItem>;
};
export type TSchema = Array<TSchemaItem>;

class QueryGenerator {
    generateItem(schemaItem: TSchemaItem) {
        let result = `
        
            ${schemaItem.entity}: ${schemaItem.entity.toLowerCase()}Collection${
            schemaItem.variables ? this.genVariables(schemaItem.variables) : ""
        } {
                items {\n`;
        result += this.genGeneric(schemaItem);
        result += this.genRefs(schemaItem);
        result += this.genLinks(schemaItem);
        result += `
                }
            }
        `;
        return result;
    }
    generate(schema: TSchema) {
        let result = `query queryData{\n`;
        for (const schemaItem of schema) {
            result += this.generateItem(schemaItem);
        }
        result += "}";
        return result;
    }
    genVariables(variables: TVariables, deep = 0) {
        let str = "";
        if (variables instanceof Object) {
            if (variables instanceof Array) {
                str += "[";
                for (const key in variables) {
                    str += this.genVariables(variables[key], deep + 1);
                }
                str += "]";
            } else {
                str += deep ? "{ " : "(";
                for (const key in variables) {
                    str += key + ": ";
                    str += this.genVariables(variables[key], deep + 1);
                }
                str += deep ? " }" : ")";
            }
        } else {
            str +=
                typeof variables === "string"
                    ? `"${variables}"`
                    : variables + ", ";
        }
        return str;
    }
    genGeneric(schema: TSchemaItem) {
        let result = ``;
        if (!schema?.fields) return result;
        if (
            [ETypeFields.preview, ETypeFields.previewAndBody].includes(
                schema.fields
            )
        ) {
            result += gqlPreviewFragment;
        }
        if (schema.fields === ETypeFields.previewAndBody) {
            result += `body\n`;
        }
        if (Array.isArray(schema.fieldsCustom) && schema.fieldsCustom?.length) {
            for (const field of schema.fieldsCustom) {
                if (typeof field === "string") {
                    result += `${field}\n`;
                }
                if (
                    field instanceof Object &&
                    typeof field.query === "string"
                ) {
                    // parse path "word" to "word" or "word1/word2" to "word1 {word2}"
                    result += field.query.split("/").reduce((p, e, i, a) => {
                        let result = "";
                        if (i) {
                            result += "{\n";
                        }
                        result += `${e}\n`;
                        if (i === a.length - 1) {
                            result += "}\n".repeat(i);
                        }
                        return p + result;
                    }, "");
                }
            }
        }
        return result;
    }
    genRefs(schema: TSchemaItem) {
        if (!schema?.refs?.length) {
            return "";
        }
        const result = `
            refsCollection(limit: null) {
              items {
                ${this.reduceLinksAndRefs(schema?.refs)}
              }
            }
          `;
        return result;
    }
    genLinks(schema: TSchemaItem) {
        if (!schema?.links?.length) {
            return "";
        }
        const result = `
        linkedFrom {
            entryCollection(limit: null) {
              items {
                ${this.reduceLinksAndRefs(schema?.links)}
              }
            }
          }`;
        return result;
    }

    reduceLinksAndRefs(schemaArray?: Array<TSchemaItem>) {
        let result = "";
        result += schemaArray?.length
            ? schemaArray.reduce((p: string, entitySchema: TSchemaItem) => {
                  let result = `... on ${entitySchema.entity} {\n`;
                  result += this.genGeneric(entitySchema);
                  result += this.genRefs(entitySchema);
                  result += this.genLinks(entitySchema);
                  result += `}`;
                  return p + result;
              }, "")
            : "";
        return result;
    }
}

interface IQueryGenerator {
    generate: (schema: TSchema) => string;
}
export const queryGenerator: IQueryGenerator = new QueryGenerator();
