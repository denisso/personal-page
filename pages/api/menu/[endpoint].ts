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
        data: { menu: [], articles: 0 },
        error: EErrorAPI.noError,
    };

    try {
        const { serverRuntimeConfig } = getConfig();
        switch (req?.query?.endpoint) {
            case "revalidate":
                {
                    // check method, token, header props
                    const reqValid = reqValidation(req);
                    if (reqValid.error !== EErrorAPI.noError) {
                        return res
                            .status(reqValid.status)
                            .send({ error: reqValid.error });
                    }
                    //if error send error and finish work, do not rewrite prev menu
                    const response = await getMenu();
                    if (response.error) {
                        result.data = response?.data
                        result.error = response.error || EErrorAPI.requestError;
                        return res.status(200).json(result);
                    }
                    serverRuntimeConfig.MENU.data = { ...response.data };
                    result.data = serverRuntimeConfig.MENU.data;
                }
                break;
            case "getmenu":
                {
                    if (!serverRuntimeConfig?.MENU?.data?.menu?.length) {
                        const response = await getMenu();

                        if (response.error) {
                            result.error = response.error || EErrorAPI.requestError;
                            return res.status(200).json(result);
                        }
                        serverRuntimeConfig.MENU.data = { ...response.data };
                    }
                    result.data = serverRuntimeConfig.MENU.data;
                }
                break;
            default:
        }
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }

    res.status(200).json(result);
}
