import type { NextApiRequest, NextApiResponse } from "next";
import { getMenu } from "../../../lib/contentful/getMenu";
import { menu, errorContentful, TErrorAPI, EErrorAPI } from "../../../data";
import { TMenu } from "../../../lib/types";

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

                    if (errorContentful.error !== EErrorAPI.noError) {
                        result.error = errorContentful.error;
                        return res.status(200).json(result);
                    }
                    const response = await getMenu();
                    if (response.error) {
                        errorContentful.error = EErrorAPI.requestError;
                        result.error = errorContentful.error;
                        return res.status(200).json(result);
                    }
                    menu.menu = [...response.menu];
                    result.menu = menu.menu;
                }
                break;
            case "getmenu":
                {
                    if (Array.isArray(menu.menu) && menu.menu.length == 0) {
                        const response = await getMenu();
                        if (response.error) {
                            errorContentful.error = EErrorAPI.requestError;
                            result.error = errorContentful.error;
                            return res.status(200).json(result);
                        }
                        menu.menu = [...response.menu];
                        result.menu = menu.menu;
                    } else {
                        result.menu = menu.menu;
                        result.error = errorContentful.error;
                    }
                }
                break;
            default:
        }
    } catch (err) {
        return res.status(500).send({ error: err.message, menu: [] });
    }

    res.status(200).json(result);
}
