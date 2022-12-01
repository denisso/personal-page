import { gql } from "@apollo/client";
import { clientWrapper, TContentfulResponse } from ".";
import { handleResponse } from "./handleResponse";
import { queryGenerator, ETypeFields, TSchema } from "./queryGenerator";
import { TResponseGeneric, EEntities } from "../types";

interface IGetSearch {
    (arg: {
        search: string;
        skip?: number;
        limit?: number;
        order?: string;
    }): Promise<TResponseGeneric>;
}

export const getSearch: IGetSearch = ({ search, skip = null, limit = 20 }) => {
    if (typeof search !== "string" || search === "") {
        Promise.resolve({ data: [] });
    }
    const schema: TSchema = [
        {
            entity: EEntities.posts,
            fields: ETypeFields.preview,
            variables: {
                where: {
                    OR: [{ body_contains: search }, { title_contains: search }],
                },
                skip,
                limit,
            },
            refs: [
                {
                    entity: EEntities.category,
                    fields: ETypeFields.preview,
                },
            ],
        },
    ];
    const query = queryGenerator.generate(schema);

    return clientWrapper(
        { query: gql(String.raw`${query}`) },
        ({ data, error }: TContentfulResponse) => {
            const result: TResponseGeneric = { data: [], error: false };
            if (error) {
                result.error = error;
                return result;
            }
            const response = handleResponse({ data, schema });
            try {
                if (
                    response[EEntities.posts] &&
                    Array.isArray(response[EEntities.posts])
                ) {
                    result.data = response[EEntities.posts];
                }
            } catch (err) {
                result.error = err.message;
            }

            return result;
        }
    );
};
