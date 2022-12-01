/**
 * not implemented yet
 */
import type { NextApiRequest, NextApiResponse } from "next";
import {tokenGenerate} from "../../lib/token"

type TResponseGeneric = {
    data: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TResponseGeneric>
) {

    res.status(200).json({ data: await tokenGenerate() });
}
