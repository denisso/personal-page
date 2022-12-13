import { TImage, TPropsGeneric, THandleResponseResult } from "../types";
import { convertMarkdownToHtml } from "../markdowntoHtml";
import { ETypeFields, TSchema, TSchemaItem } from "./queryGenerator";
import serialize from "serialize-javascript";

const getPropsGeneric = ({ data }: { data: any }): TPropsGeneric => {
    const result: TPropsGeneric = {};
    if (data instanceof Object === false) return result;
    if (data.sys?.id) result.id = data.sys.id;
    if (data.title) result.title = data.title;
    if (data.subtitle) result.subtitle = data.subtitle;
    if (data.slug) result.slug = data.slug;
    if (Array.isArray(data.image) && data.image.length) {
        const image: { [key: string]: any } = {};
        if (data.image[0] instanceof Object) {
            Object.assign(image, data.image[0]);
            image.url = data.image[0].original_secure_url;
        }

        result.image = image as TImage;
        result.image.path = image?.public_id;
    }

    if (data?.sys?.publishedAt) result.publishedAt = data?.sys?.publishedAt;
    if (data?.sys?.firstPublishedAt)
        result.firstPublishedAt = data?.sys?.firstPublishedAt;
    result.type = data?.__typename;

    return result;
};

type THandleResponseProps = {
    data: any;
    schema: TSchema;
};

interface IHandleResponse<T = TPropsGeneric> {
    (arg: THandleResponseProps): THandleResponseResult<T>;
}

export const handleResponse: IHandleResponse = ({
    data,
    schema,
}: {
    data: any;
    schema: TSchema;
}) => {
    const result: THandleResponseResult = {};
    if (data instanceof Object === false || !Array.isArray(schema)) {
        return result;
    }
    for (const schemaItem of schema) {
        if (!Object.keys(data).find((entity) => entity === schemaItem.entity))
            continue;
        if (!result[schemaItem.entity]) {
            result[schemaItem.entity] = {};
        }
        Object.assign(
            result[schemaItem.entity],
            getOwnProps({
                data: data?.[schemaItem.entity],
                schemaItem,
                isItems: false,
            })
        );
        const dataItems = data?.[schemaItem.entity]?.items;
        if (Array.isArray(dataItems) && dataItems.length) {
            for (const dataItem of dataItems) {
                const obj = {};
                Object.assign(
                    obj,
                    getOwnProps({ data: dataItem, schemaItem, isItems: true })
                );
                Object.assign(
                    obj,
                    getLinksAndRefs({ data: dataItem, schemaItem })
                );

                if (Object.keys(obj).length) {
                    if (!Array.isArray(result[schemaItem.entity]?.items)) {
                        result[schemaItem.entity].items = [];
                    }
                    let sanitizeResult = {};
                    try {
                        sanitizeResult = JSON.parse(
                            serialize(obj, { isJSON: true })
                        );
                    } catch (err) {}
                    result[schemaItem.entity]?.items?.push(sanitizeResult);
                }
            }
        }
    }

    return result;
};
/**
 * const result = getlastPart("one/two/three/test") // { start: "one", path, last: "test" }
 * @param str string
 */
const getParts = (
    str: string
): {
    isItemFirst: boolean;
    start: string;
    pathArray: Array<string>;
    pathStr: string;
    last: string;
    pathNoItems: string;
} => {
    const pathArray = str.split("/");
    const isItemFirst = pathArray[0] === "items";
    const pathNoItems = isItemFirst
        ? pathArray.slice(1, pathArray.length).join("/")
        : pathArray.join("/");
    return {
        pathNoItems,
        isItemFirst,
        start: pathArray[0],
        pathArray,
        pathStr: pathArray.join("/"),
        last: pathArray[pathArray.length - 1],
    };
};

/**
 * get property by path
 * const obj = { one: { two: { three: { test: 1 } } } }
 * const value = getValue("one/two/three/test", obj); // 1
 * @param path string
 * @param obj Object
 */
const getValue = (path: string, obj: { [key: string]: any }) => {
    if (typeof path !== "string") return undefined;
    const safePath = path[0] === "/" ? path.slice(1, path.length) : path;
    return safePath.split("/").reduce((acc, c) => acc && acc[c], obj);
};

/**
 *
 * const value = createObj("one/two/three", { hello: "world" });
 * result:
 * { one: { two: { three: { hello: 'world' } } } }
 * @param path string
 * @param arg Object
 */
const createObj = (path: string, arg?: { [key: string]: any }) => {
    const result: { [key: string]: any } = {};
    if (typeof path !== "string" && arg instanceof Object === false) {
        return result;
    }
    if (path === "" && arg instanceof Object) {
        return arg;
    }
    path.split("/").reduce((acc, c, i, arr) => {
        const obj = i === arr.length - 1 && arg instanceof Object ? arg : {};
        acc[c] = obj;
        return obj;
    }, result);

    return result;
};
function getOwnProps({
    data,
    schemaItem,
    isItems,
}: {
    data: any;
    schemaItem: TSchemaItem;
    isItems?: boolean;
}) {
    /**
     * { [key: string]: any } for custom props
     */
    const result: TPropsGeneric & { [key: string]: any } = {};

    if (!data.__typename.includes(schemaItem.entity)) {
        return result;
    }
    result.type = data.__typename;
    if (isItems) {
        if (schemaItem?.fields !== ETypeFields.custom) {
            Object.assign(result, getPropsGeneric({ data }));
        }
        if (schemaItem?.fields === ETypeFields.previewAndBody) {
            if (data.body) result.body = convertMarkdownToHtml(data.body);
        }
    }

    if (schemaItem?.fieldsCustom?.length) {
        for (const field of schemaItem.fieldsCustom) {
            /**
             * case fieldsCustom: ["slug"] can be "oneword" or path "word1/word2"
             */
            if (typeof field === "string") {
                const { start, last, pathNoItems } = getParts(field);
                if (
                    (start === "items" && isItems) ||
                    (start !== "items" && !isItems)
                ) {
                    const val = getValue(pathNoItems, data);
                    if (val) {
                        result[last] = val;
                    }
                }
            }

            /**
              case 
              fieldsCustom: [{
                  [key:string]: // can be "oneword" or path "word1/word2"
                  {
                    dataPath?: string; // can be "oneword" or path "word1/word2"
                    data: Array<string>| null;
                  } | Array<string>;
               }]
               */
            if (field instanceof Object) {
                for (const [fieldKey, fieldValue] of Object.entries(field)) {
                    const { start, pathNoItems } = getParts(fieldKey);
                    if (
                        (start !== "items" && isItems) ||
                        (start === "items" && !isItems)
                    ) {
                        continue;
                    }
                    /**
              case 
              fieldsCustom: [{
                  [fieldKey:string]: Array<string>;
               }]
            */
                    if (Array.isArray(fieldValue)) {
                        for (const val of fieldValue) {
                            if (
                                (start === "items" && isItems) ||
                                (start !== "items" && !isItems)
                            ) {
                                result[val] = getValue(
                                    pathNoItems + "/" + val,
                                    data
                                );
                            }
                        }
                    } else if (fieldValue instanceof Object) {
                        /**
              case 
              fieldsCustom: [{
                  [fieldKey:string]: {
                    dataPath?: string; // can be "oneword"
                    data: Array<string>| null;
                  }
               }]
              */

                        if (Array.isArray(fieldValue.data)) {
                            //   fieldsCustom: [{
                            //     [fieldKey:string]: {
                            //       dataPath?: string;
                            //       data: Array<string>;
                            //     }
                            //  }]

                            for (const val of fieldValue.data) {
                                if (typeof val === "string") {
                                    if (
                                        typeof fieldValue.dataPath === "string"
                                    ) {
                                        if (
                                            (start === "items" && isItems) ||
                                            (start !== "items" && !isItems)
                                        ) {
                                            Object.assign(
                                                result,
                                                createObj(fieldValue.dataPath, {
                                                    [val]: getValue(
                                                        pathNoItems + "/" + val,
                                                        data
                                                    ),
                                                })
                                            );
                                        }
                                    } else {
                                        if (
                                            (start === "items" && isItems) ||
                                            (start !== "items" && !isItems)
                                        ) {
                                            result[val] = getValue(
                                                pathNoItems + "/" + val,
                                                data
                                            );
                                        }
                                    }
                                }
                            }
                        } else {
                            if (typeof fieldValue.dataPath === "string") {
                                //   fieldsCustom: [{
                                //     [fieldKey:string]: {
                                //       dataPath?: string;
                                //       data: null;
                                //     }
                                //  }]
                                if (
                                    (start === "items" && isItems) ||
                                    (start !== "items" && !isItems)
                                ) {
                                    const path = fieldValue.dataPath.split("/");
                                    Object.assign(
                                        result,
                                        createObj(fieldValue.dataPath, {
                                            [path[path.length - 1]]: getValue(
                                                pathNoItems,
                                                data
                                            ),
                                        })
                                    );
                                }
                            } else {
                                //   fieldsCustom: [{
                                //     [fieldKey:string]: {
                                //       dataPath?: null;
                                //       data: null;
                                //     }
                                //  }]
                                if (
                                    (start === "items" && isItems) ||
                                    (start !== "items" && !isItems)
                                ) {
                                    const path = fieldKey.split("/");
                                    result[path[path.length - 1]] = getValue(
                                        pathNoItems,
                                        data
                                    );
                                }
                            }
                        }
                    } else {
                        /**
               fieldsCustom: [{
                  [key:string]: null;
               }]
               */
                    }
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
                    isItems: true,
                });
                if (res.type) {
                    if (!Array.isArray(result[type][res.type]))
                        result[type][res.type] = [];
                    result[type][res.type].push(res);

                    Object.assign(
                        res,
                        getLinksAndRefs({
                            data: entity,
                            schemaItem: entitySchema,
                        })
                    );
                    result[type]._all.push(res);
                }
            }
        }
    }
    return result;
}

function getLinksAndRefs({
    data,
    schemaItem,
}: {
    data: any;
    schemaItem: TSchemaItem;
}) {
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
