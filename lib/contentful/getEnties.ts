import { gql } from "@apollo/client";
import { clientWrapper } from ".";
import { queryGenerator, TSchema } from "./queryGenerator";
import { handleResponse } from "./handleResponse";
import { TResponseGeneric } from "../types";
export type TContentfulResponse = {
    error: string | boolean;
    data?: any;
};

interface IGetEntities {
    ({ schema }: { schema: TSchema }): Promise<TResponseGeneric>;
}

export const getEntities: IGetEntities = ({ schema }) => {
    const query = queryGenerator.generate(schema);
    return clientWrapper(
        {
            query: gql(String.raw`${query}`),
            variables: {},
        },
        ({ data, error }: TContentfulResponse) => {
            const result: TResponseGeneric = { error: false, data: [] };
            if (error) {
                result.error = error;
                return result;
            }

            result.data = handleResponse({ data, schema });
            return result;
        }
    );
};
