import { TSchema } from "./contentful/queryGenerator";
import { GetStaticPropsResult } from "next";
import { TResponseGeneric, TPageGeneric } from "./types";
import { getEntities } from "./contentful/getEnties";
interface IgetRealSlug {
    (slug: string[] | string | undefined): string;
}
export const getSlug: IgetRealSlug = (slug) => {
    let result = "";
    if (Array.isArray(slug)) {
        result = typeof slug[0] === "string" ? slug[0] : "";
    } else if (typeof slug === "string") {
        result = slug;
    }
    return result;
};

type ThandleDataResult = TPageGeneric["data"] | null;

interface IgetStaticPropsWrapper {
    (arg: {
        schema: TSchema;
        handlerData: (data: TResponseGeneric["data"]) => ThandleDataResult;
    }): Promise<GetStaticPropsResult<TPageGeneric>>;
}
export const getStaticPropsWrapper: IgetStaticPropsWrapper = async ({
    schema,
    handlerData,
}) => {
    const response: TResponseGeneric = await getEntities({
        schema,
    });
    const props: TPageGeneric = { data: {}, error: false };
    const revalidate = 24 * 3600;

    try {
        if (response.error) {
            const result = {
                props: { error: response.error, data: {} },
                revalidate,
            };
            return result;
        }
        const result = handlerData(response.data);
        if (result === null) {
            return { notFound: true, revalidate };
        }
        return { props: { data: result }, revalidate };
    } catch (err) {
        props.error = err.message;
    }
    return { props, revalidate };
};
