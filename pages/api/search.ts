import type { NextApiRequest, NextApiResponse } from "next";
import { getSearch } from "../../lib/contentful/getSearch";
import { TResponseGeneric } from "../../lib/types";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TResponseGeneric>
) {
    const { search } = req.query;
    let realString = search;
    if (Array.isArray(search)) {
        realString = search[0];
    }

    const response = await getSearch({ search: realString as string });
    res.status(200).json(response);
}
