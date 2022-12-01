import type { NextApiRequest, NextApiResponse } from "next";
import { TErrorAPI, EErrorAPI } from "../../../lib/types";
import getConfig from "next/config";

interface INextApiRequestEndpoint extends NextApiRequest {
    query: {
        endpoint: string;
    };
    body: {
        token?: string;
        data: string;
    };
}

type TResponse = {
    result?: { [key: string]: any };
    error?: TErrorAPI["error"] | string | false;
};

export default async function handler(
    req: INextApiRequestEndpoint,
    res: NextApiResponse<TResponse>
) {
    const result: TResponse = {};
    const body = req?.body;
    try {
        const { serverRuntimeConfig } = getConfig();
        switch (req?.query?.endpoint) {
            case "revalidate":
                {
                    if (!process.env.SECURITY_TOKEN) {
                        result.error = "the security token not set";
                        return res.status(200).json(result);
                    }
                    if (body?.token !== process.env.SECURITY_TOKEN) {
                        result.error = "the security token is incorrect";
                        return res.status(200).json(result);
                    }
                    if (serverRuntimeConfig.errorApi === EErrorAPI.noError) {
                        // logic here
                        const entities = JSON.parse(body.data);
                        for (const entity in entities) {
                            result[entity] = [];
                            if (Array.isArray(entities[entity])) {
                                for (const slug of entities[entity]) {
                                    try {
                                        await res.revalidate(
                                            `/${entity.toLowerCase()}/${slug.toLowerCase()}`
                                        );
                                        result[entity].push({ [slug]: true });
                                    } catch (err) {
                                        result[entity].push({ [slug]: false });
                                    }
                                }
                            } else {
                                return res
                                    .status(500)
                                    .send({ error: "entity key not array" });
                            }
                        }
                    } else {
                        return res
                            .status(500)
                            .send({ error: serverRuntimeConfig.errorApi });
                    }
                }
                break;
            default:
        }
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }

    res.status(200).json(result);
}
