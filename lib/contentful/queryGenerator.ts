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
        | string // uses in generator and result handler, can be "oneword"
        | {
              // uses in generator, can be "oneword" or path "word1/word2"
              [key: string]:
                  | {
                        dataPath?: string; // uses in result handler, can be "oneword" or path "word1/word2"
                        data?: Array<string> | null; // uses in result handler, list fields of the requested variable
                    }
                  | Array<string>; // uses in result handler, can be ["oneword"]
          }
    >;
    variables?: TVariables;
    links?: Array<TSchemaItem>;
    refs?: Array<TSchemaItem>;
};
export type TSchema = Array<TSchemaItem>;

class QueryGenerator {
    generate(schema: TSchema) {
        let result = `query queryData{\n`;
        for (const schemaItem of schema) {
            result += this.generateItem(schemaItem);
        }
        result += "}";
        return result;
    }
    generateItem(schemaItem: TSchemaItem) {
        let result = `
            ${schemaItem.entity}: ${schemaItem.entity.toLowerCase()}Collection${
            schemaItem.variables ? this.genVariables(schemaItem.variables) : ""
        } {\n`;
        result += this.genFields(schemaItem, { isItems: false });
        let resultItems = "";
        resultItems += this.genItems(schemaItem);
        resultItems += this.genRefs(schemaItem);
        resultItems += this.genLinks(schemaItem);
        if (resultItems.trim() !== "") {
            result += `items {\n`;
            result += resultItems;
            result += `}\n`;
        }
        result += `}\n`;
        return result;
    }
    genItems(schema: TSchemaItem) {
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
        result += this.genFields(schema, { isItems: true });
        return result;
    }
    genField(field: string, { isItems = false }: { isItems?: boolean }) {
        let result = "";
        if (typeof field === "string") {
            const path = field.split("/");
            if (
                ((path[0] === "items" && isItems) ||
                    (path[0] !== "items" && !isItems)) &&
                path.length
            ) {
                if (path[0] === "items") {
                    path.splice(0, 1);
                }
                result += path.reduce((p, e, i, a) => {
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
        return result;
    }
    genFields(schema: TSchemaItem, { isItems }: { isItems: boolean }) {
        let result = ``;

        if (Array.isArray(schema.fieldsCustom) && schema.fieldsCustom.length) {
            for (const field of schema.fieldsCustom) {
                // fieldCustom: ["somefieldname"]
                if (typeof field === "string") {
                    result += this.genField(field, { isItems });
                }
                // fieldCustom: [{"pathto": ["somefieldname1", "somefieldname2"]}]
                // or
                // fieldCustom: [{"pathto": {dataPath: string, data: Array}}]
                if (field instanceof Object) {
                    // parse path "word" to "word" or "word1/word2" to "word1 {word2}"
                    for (const [pathto, pathtoValue] of Object.entries(field)) {
                        if (Array.isArray(pathtoValue)) {
                            for (const value of pathtoValue) {
                                result += this.genField(pathto + "/" + value, {
                                    isItems,
                                });
                            }
                        } else {
                            result += this.genField(pathto, { isItems });
                        }
                    }
                }
            }
        }
        return result;
    }
    genVariables(variables: TVariables, deep = 0, key = "") {
        let str = "";
        if (variables instanceof Object) {
            if (variables instanceof Array) {
                str += "[";
                for (const key in variables) {
                    str += this.genVariables(variables[key], deep + 1, key);
                }
                str += "]";
            } else {
                str += deep ? "{ " : "(";
                for (const key in variables) {
                    str += key + ": ";
                    str += this.genVariables(variables[key], deep + 1, key);
                }
                str += deep ? " }" : ")";
            }
        } else {
            str +=
                typeof variables === "string"
                    ? key === "order"
                        ? `${variables}`
                        : `"${variables}"`
                    : variables + ", ";
        }
        return str;
    }
    genRefs(schema: TSchemaItem) {
        if (!schema?.refs?.length) {
            return "";
        }
        const result = `
            refsCollection(limit: null) {
                ${this.reduceLinksAndRefs(schema?.refs)}
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
                ${this.reduceLinksAndRefs(schema?.links)}
            }
          }`;
        return result;
    }
    reduceLinksAndRefs(schemaArray?: Array<TSchemaItem>) {
        let result = "";
        result += schemaArray?.length
            ? schemaArray.reduce((p: string, entitySchema: TSchemaItem) => {
                  let result = "";
                  result += this.genFields(entitySchema, { isItems: false });
                  let resultItems = "";
                  resultItems += this.genItems(entitySchema);
                  resultItems += this.genRefs(entitySchema);
                  resultItems += this.genLinks(entitySchema);
                  if (resultItems.trim() !== "") {
                      result = `items {\n... on ${entitySchema.entity} {\n`;
                      result += resultItems;
                      result += `}\n}`;
                  }

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
