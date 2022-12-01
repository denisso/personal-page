import type { NextApiRequest, NextApiResponse } from "next";
import { EErrorAPI } from "../../lib/types";
import getConfig from "next/config";
type TResult = {
    result?: boolean;
    error?: EErrorAPI | string;
    message?: string;
};
interface INextApiRequestEndpoint extends NextApiRequest {
    query: {
        endpoint: string;
    };
    body: {
        token?: string;
        limitReached?: any;
    };
}
export default async function handler(
    req: INextApiRequestEndpoint,
    res: NextApiResponse<TResult>
) {
    const result: TResult = {}
    const body = req.body;
    try {
        const { serverRuntimeConfig } = getConfig();
        if (!process.env.SECURITY_TOKEN) {
            result.error = "the security token not set";
            return res.status(200).json(result);
        }
        if (body?.token !== process.env.SECURITY_TOKEN) {
            result.error = "the security token is incorrect";
            return res.status(200).json(result);
        }
        
        if (body && body?.limitReached) {
            serverRuntimeConfig.errorApi = EErrorAPI.limitReached;
            result.error = EErrorAPI.limitReached;
        }
        return res.json({ result: true });
    } catch (err: any) {
        return res.status(500).send({ error: err.message });
    }
}
