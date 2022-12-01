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
            { query: "linkedFrom/entryCollection/total", data: null },
            "title",
            "slug",
        ],
    },
];

const variables = {};
interface IGetMenu {
    (): Promise<TMenu & { error: string | boolean }>;
}

const query = queryGenerator.generate(schema);

export const getMenu: IGetMenu = () => {
    return clientWrapper(
        { query: gql(String.raw`${query}`), variables },
        ({ data, error }: TContentfulResponse) => {
            const result: TMenu & { error?: string | true } = { menu: [] };
            if (error) {
                result.error = error;
                return result;
            }
            const menuItems: { [key: string]: Array<TMenuItem> } =
                handleResponse({
                    data,
                    schema,
                }) as { [key: string]: Array<TMenuItem> };

            if (
                Array.isArray(menuItems[EEntities.category]) &&
                menuItems[EEntities.category]?.length
            ) {
                result.menu = menuItems[EEntities.category]
            }

            return result;
        }
    );
};
