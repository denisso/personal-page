import type { NextApiRequest, NextApiResponse } from "next";
import { TErrorAPI, EErrorAPI } from "../../../lib/types";
import { reqValidation } from "../../../lib/helpersAPI";
interface INextApiRequestEndpoint extends NextApiRequest {
    query: {
        endpoint: string;
    };
    body: {
        token?: string;
        path?: string;
        "path[]"?: Array<string>;
    };
}

type TResponse = {
    data?: string;
    error?: TErrorAPI["error"] | string | false;
};

export default async function handler(
    req: INextApiRequestEndpoint,
    res: NextApiResponse<TResponse>
) {
    const result: TResponse = { data: "" };
    const body = req?.body;
    try {
        switch (req?.query?.endpoint) {
            case "revalidate":
                {
                    const reqValid = reqValidation(req);
                    if (reqValid.error !== EErrorAPI.noError) {
                        return res
                            .status(reqValid.status)
                            .send({ error: reqValid.error });
                    }

                    if (
                        typeof body?.path !== "string" &&
                        !Array.isArray(body?.["path[]"])
                    ) {
                        return res.status(402).send({
                            error: "path not string || Array<string> || undefined",
                        });
                    }

                    if (typeof body?.path === "string") {
                        res.revalidate(body.path);
                        result.data = `${body.path} revalidated`;
                    } else if (Array.isArray(body["path[]"])) {
                        for (const path of body["path[]"]) {
                            if (typeof path === "string") {
                                await res.revalidate(path);
                                result.data += `${path} revalidated, `;
                            }
                        }
                    }
                }
                break;
            default:
        }
    } catch (err) {
        return res.status(500).send({ error: err?.message });
    }

    res.status(200).json(result);
}
