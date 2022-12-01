import { TImage, TPropsGeneric } from "../types";
import { convertMarkdownToHtml } from "../markdowntoHtml";
import { ETypeFields, TSchema, TSchemaItem } from "./queryGenerator";
import serialize from "serialize-javascript";

const getPropsGeneric = ({ data }: { data: any }): TPropsGeneric => {
    const result: TPropsGeneric = {};
    if (data instanceof Object === false) return result;
    data.sys?.id && (result.id = data.sys.id);
    data.title && (result.title = data.title);
    data.subtitle && (result.subtitle = data.subtitle);
    data.slug && (result.slug = data.slug);
    if (Array.isArray(data.image) && data.image.length) {
        const image: { [key: string]: any } = {};
        if (data.image[0] instanceof Object)
            Object.assign(image, data.image[0]);

        result.image = image as TImage;
        result.image.path = image?.public_id;
    }

    data?.sys?.publishedAt && (result.publishedAt = data?.sys?.publishedAt);
    data?.sys?.firstPublishedAt &&
        (result.firstPublishedAt = data?.sys?.firstPublishedAt);
    result.type = data?.__typename;

    return result;
};

type THandleResponseProps = {
    data: any;
    schema: TSchema;
};

type TResponseResult<T = TPropsGeneric> = {
    [key: string]: Array<T>;
};

interface IHandleResponse<T = TPropsGeneric> {
    ({ data }: THandleResponseProps): TResponseResult<T>;
}
export const handleResponse: IHandleResponse = ({
    data,
    schema,
}: {
    data: any;
    schema: TSchema;
}) => {
    const result: TResponseResult = {};

    for (const schemaItem of schema) {
        if (!Object.keys(data).find((entity) => entity === schemaItem.entity))
            continue;

        if (!result[schemaItem.entity]) result[schemaItem.entity] = [];
        const dataItems = data[schemaItem.entity]?.items;
        if (Array.isArray(dataItems) && dataItems.length) {
            for (const data of dataItems) {
                const obj = {};
                Object.assign(obj, getOwnProps({ data, schemaItem }));
                Object.assign(obj, getLinksAndRefs({ data, schemaItem }));
                let sanitizeResult = {};
                try {
                    sanitizeResult = JSON.parse(
                        serialize(obj, { isJSON: true })
                    );
                } catch (err) {}
                result[schemaItem.entity].push(sanitizeResult);
            }
        }
    }

    return result;
};

function getOwnProps({
    data,
    schemaItem,
}: {
    data: any;
    schemaItem: TSchemaItem;
}) {
    const result: TPropsGeneric & { [key: string]: any } = {};

    if (schemaItem.entity !== data.__typename) {
        return result;
    }
    result.type = data.__typename;
    if (schemaItem?.fields !== ETypeFields.custom) {
        Object.assign(result, getPropsGeneric({ data }));
    }
    if (schemaItem?.fields === ETypeFields.previewAndBody) {
        data?.body && (result.body = convertMarkdownToHtml(data?.body));
    }

    if (schemaItem?.fieldsCustom?.length) {
        for (const field of schemaItem.fieldsCustom) {
            /**
             * case fieldsCustom: ["slug"]
             */
            if (typeof field === "string") result[field] = data[field];

            /**
             * case 
            fieldsCustom: [{
                query: string; // can be "oneword" or path "word1/word2"
                dataPath?: string; // can be "oneword"
                data: Array<string>| null;
             }]
             */
            if (field instanceof Object) {
                const obj: { [key: string]: any } = {};
                let res: any = {};
                if (typeof field.query === "string") {
                    /**
                     * follow the path in the query
                     * case [{query: "linkedFrom/entryCollection/total", ...}]
                     */
                    res = field.query
                        .split("/")
                        .reduce(
                            (p: any, e: string) =>
                                p instanceof Object && p[e] && p[e]
                                    ? p[e]
                                    : undefined,
                            data
                        );
                }
                /**
                 * case fieldsCustom: [{... data: ["hello", "short"]}]
                 * every field from data put to result
                 */
                if (field.data?.length && res instanceof Object) {
                    for (const fname of field.data) {
                        if (res[fname]) obj[fname] = res[fname];
                    }
                }
                /**
                 * case [{query: "linkedFrom/entryCollection/total", data: null}]
                 * result.total = value from query(linkedFrom/entryCollection/total)
                 */
                if (field.data === null && res) {
                    const arr = field.query.split("/");

                    obj[arr[arr.length - 1]] = res;
                }
                if (field.dataPath) {
                    /**
                     * case fieldsCustom: [{..., path: "json",...]}]
                     * result.json = obj
                     */
                    result[field.dataPath] = obj;
                } else {
                    /**
                     * without path: put data to result root
                     * case fieldsCustom: [{query: "json", data: ["hello", "short"]}]
                     */
                    Object.assign(result, obj);
                }
            }
        }
    }
    return result;
}

function getLinksOrRefs({
    entities,
    schemaItem,
    type,
}: {
    entities: Array<any>;
    schemaItem: any;
    type: any;
}) {
    const result: any = {};
    if (schemaItem[type] && entities?.length) {
        result[type] = { _all: [] };
        for (const entity of entities) {
            for (const entitySchema of schemaItem[type]) {
                if (entitySchema.entity !== entity.__typename) {
                    continue;
                }
                const res = getOwnProps({
                    data: entity,
                    schemaItem: entitySchema,
                });
                if (res.type) {
                    if (!Array.isArray(result[type][res.type]))
                        result[type][res.type] = [];
                    result[type][res.type].push(res);

                    Object.assign(
                        res,
                        getLinksAndRefs({
                            data: entity,
                            schema: entitySchema,
                        })
                    );
                    result[type]._all.push(res);
                }
            }
        }
    }
    return result;
}

function getLinksAndRefs({ data, schemaItem }: any) {
    const result: {
        refs?: { [key: string]: any };
        links?: { [key: string]: any };
    } = {};

    if (
        data instanceof Object === false ||
        schemaItem instanceof Object === false
    ) {
        return result;
    }
    Object.assign(
        result,
        getLinksOrRefs({
            entities: data.linkedFrom?.entryCollection?.items,
            schemaItem,
            type: "links",
        })
    );
    Object.assign(
        result,
        getLinksOrRefs({
            entities: data.refsCollection?.items,
            schemaItem,
            type: "refs",
        })
    );
    return result;
}
