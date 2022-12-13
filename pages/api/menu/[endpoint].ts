import type { NextApiRequest, NextApiResponse } from "next";
import { getMenu, TMenuResponse } from "../../../lib/contentful/getMenu";
import { EErrorAPI } from "../../../lib/types";
import getConfig from "next/config";
import { reqValidation } from "../../../lib/helpersAPI";

interface INextApiRequestEndpoint extends NextApiRequest {
    query: {
        endpoint: string;
    };
    body: {
        token?: string;
    };
}

export default async function handler(
    req: INextApiRequestEndpoint,
    res: NextApiResponse<TMenuResponse>
) {
    const result: TMenuResponse = {

    };

    try {
        const { serverRuntimeConfig } = getConfig();
        switch (req?.query?.endpoint) {
            case "revalidate":
                {
                    const reqValid = reqValidation(req);
                    if (reqValid.error !== EErrorAPI.noError) {
                        return res
                            .status(reqValid.status)
                            .send({ error: reqValid.error });
                    }

                    const response = await getMenu();
                    if (response.error) {
                        serverRuntimeConfig.errorApi = EErrorAPI.requestError;
                        result.error = serverRuntimeConfig.errorApi;
                        return res.status(200).json(result);
                    }
                    serverRuntimeConfig.errorApi = EErrorAPI.noError
                    serverRuntimeConfig.MENU = {...response.data};

                    result.data = serverRuntimeConfig.MENU;
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
                        serverRuntimeConfig.errorApi = serverRuntimeConfig.noError;
                        serverRuntimeConfig.MENU = {...response.data};
                    }
                    result.data = serverRuntimeConfig.MENU;
                    result.error = serverRuntimeConfig.errorApi;
                }
                break;
            default:
        }
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }

    res.status(200).json(result);
}
