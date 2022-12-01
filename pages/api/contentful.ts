import type { NextApiRequest, NextApiResponse } from "next";
import { errorContentful, EErrorAPI } from "../../data";
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
        if (!process.env.SECURITY_TOKEN) {
            result.error = "the security token not set";
            return res.status(200).json(result);
        }
        if (body?.token !== process.env.SECURITY_TOKEN) {
            result.error = "the security token is incorrect";
            return res.status(200).json(result);
        }
        
        if (body && body?.limitReached) {
            errorContentful.error = EErrorAPI.limitReached;
            result.error = EErrorAPI.limitReached;
        }
        return res.json({ result: true });
    } catch (err: any) {
        return res.status(500).send({ error: err.message });
    }
}
