import { gql } from "@apollo/client";
import { clientWrapper, TContentfulResponse } from ".";
import { TMenu, TMenuItem, EEntities } from "../types";
import { queryGenerator, TSchema, ETypeFields } from "./queryGenerator";
import { handleResponse } from "./handleResponse";

const schema: TSchema = [
    {
        entity: EEntities.category,
        fields: ETypeFields.custom,
        fieldsCustom: [
            {
                "items/linkedFrom/entryCollection/total": { data: null },
                items: ["title", "slug"],
            },
        ],
    },
    {
        entity: EEntities.posts,
        fields: ETypeFields.custom,
        fieldsCustom: ["total"],
    },
];

export type TMenuResponse = {
    data?: {
        menu?: TMenu["menu"];
        total?: number;
    };
    error?: string | boolean;
};

const variables = {};
interface IGetMenu {
    (): Promise<TMenuResponse>;
}

const query = queryGenerator.generate(schema);

type THandleResult = {
    [key: string]: { items: Array<TMenuItem>; total: number };
};
export const getMenu: IGetMenu = () => {
    return clientWrapper(
        { query: gql(String.raw`${query}`), variables },
        ({ data, error }: TContentfulResponse) => {
            const result: TMenuResponse = {};
            if (error) {
                result.error = error;
                return result;
            }
            const response: THandleResult = handleResponse({
                data,
                schema,
            }) as THandleResult;
            result.data = {};
            if (
                Array.isArray(response?.[EEntities.category]?.items) &&
                response[EEntities.category].items.length
            ) {
                result.data.menu = response[EEntities.category].items.filter(
                    (item: TMenuItem) => item?.total
                );
            }
            if (response?.[EEntities.posts]?.total) {
                result.data.total = response[EEntities.posts].total;
            }

            return result;
        }
    );
};
