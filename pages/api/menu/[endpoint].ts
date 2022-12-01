import type { NextApiRequest, NextApiResponse } from "next";
import { getMenu } from "../../../lib/contentful/getMenu";
import { TErrorAPI, EErrorAPI, TMenu } from "../../../lib/types";
import getConfig from "next/config";

interface INextApiRequestEndpoint extends NextApiRequest {
    query: {
        endpoint: string;
    };
    body: {
        token?: string;
    };
}

type TMenuResponse = TMenu & { error?: TErrorAPI["error"] | string | false };

export default async function handler(
    req: INextApiRequestEndpoint,
    res: NextApiResponse<TMenuResponse>
) {
    const result: TMenuResponse = {
        menu: [],
    };
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

                    if (serverRuntimeConfig.errorApi !== EErrorAPI.noError) {
                        result.error = serverRuntimeConfig.errorApi;
                        return res.status(200).json(result);
                    }
                    const response = await getMenu();
                    if (response.error) {
                        serverRuntimeConfig.errorApi = EErrorAPI.requestError;
                        result.error = serverRuntimeConfig.errorApi;
                        return res.status(200).json(result);
                    }

                    serverRuntimeConfig.MENU = [...response.menu];

                    result.menu = serverRuntimeConfig.MENU;
                }
                break;
            case "getmenu":
                {

                    if (
                        !Array.isArray(serverRuntimeConfig.MENU) ||
                        serverRuntimeConfig.MENU.length == 0
                    ) {
                        const response = await getMenu();

                        if (response.error) {
                            serverRuntimeConfig.errorApi =
                                EErrorAPI.requestError;
                            result.error = serverRuntimeConfig.errorApi;
                            return res.status(200).json(result);
                        }
                        serverRuntimeConfig.MENU = [...response.menu];
                    }
                    result.menu = serverRuntimeConfig.MENU;
                    result.error = serverRuntimeConfig.errorApi;
                }
                break;
            default:
        }
    } catch (err) {
        return res.status(500).send({ error: err.message, menu: [] });
    }

    res.status(200).json(result);
}
