import type { NextApiRequest } from "next";
import { EErrorAPI } from "./types";

type TResult = { status: number; error: EErrorAPI.noError | string };
interface IreqValidation {
    (req: NextApiRequest): TResult;
}

export const reqValidation: IreqValidation = (req) => {
    const body = req?.body;
    const result: TResult = { status: 200, error: EErrorAPI.noError };
    if (!process.env.SECURITY_TOKEN) {
        result.status = 500;
        result.error = "the security token not set on server side"
        return result;
    }
    if (req?.method !== "POST") {
        result.status = 402;
        result.error = "method must be POST"
        return result;
    }
    if (req?.headers["content-type"] !== "application/x-www-form-urlencoded") {
        result.status = 402;
        result.error = "content-type must be application/x-www-form-urlencoded"
        return result;
    }
    if (body?.token !== process.env.SECURITY_TOKEN) {
        result.status = 401;
        result.error = "the security token is incorrect"
        return result;
    }

    return result
};
