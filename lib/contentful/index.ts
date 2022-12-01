import {
    ApolloClient,
    InMemoryCache,
    ApolloQueryResult,
    ApolloError,
    QueryOptions,
} from "@apollo/client";


/**
 * https://www.apollographql.com/docs/react/api/core/ApolloClient
 */
const client = new ApolloClient({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACEID}/environments/master?access_token=${process.env.CONTENTFUL_TOKEN}`,
    cache: new InMemoryCache(),
});

export type TContentfulResponse = {
    error: string | boolean;
    data?: any;
};

const sleep = (callback: () => any, timeout: number) =>
    new Promise((resolve) => setTimeout(() => resolve(callback()), timeout));

const ApolloClientWrapper = (client: () => any): Promise<TContentfulResponse> =>
    new Promise((resolve, reject) =>
        client()
            .then((response: ApolloQueryResult<any>) => {
                const result: TContentfulResponse = {
                    error: false,
                    data: response?.data,
                };
                resolve(result);
            })
            .catch((err: ApolloError) => {
                reject({ message: err?.message });
            })
    );

/**
 * Function wrapper for handle errors and unify interface
 * @param {*} path
 * @param {*} callback
 * @returns
 */
export const clientWrapper = async (
    options: QueryOptions,
    callback: (response: TContentfulResponse) => void,
    attempts = 8
) => {
    let result: any = {};
    try {
        const response: TContentfulResponse = await ApolloClientWrapper(() =>
            client.query(options)
        );
        result = callback(response);
    } catch (e) {
        let error = "";
        if (typeof e === "string") {
            error = e.toUpperCase();
        } else if (typeof e === "object") {
            const err = e as { message: string };
            error = err.message;
        }

        if (attempts && error.match(/ETIMEDOUT/g)) {
            result = await sleep(
                () => clientWrapper(options, callback, attempts - 1),
                400
            );
        } else {
            result = callback({ error });
        }
    }

    return result;
};
