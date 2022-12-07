import { GetStaticProps } from "next";
import { TPageGeneric, EEntities, TPropsGeneric } from "../lib/types";
import { PageGeneric } from "../components/Pages/PageGeneric";
import { TSchema, ETypeFields } from "../lib/contentful/queryGenerator";
import { getStaticPropsWrapper } from "../lib/getStaticProps";

const RecentPosts = (props: TPageGeneric) => <PageGeneric {...props} />;
export default RecentPosts;

export const getStaticProps: GetStaticProps = async () => {
    const schema: TSchema = [
        {
            entity: EEntities.pages,
            fields: ETypeFields.previewAndBody,
            variables: { where: { slug: "recent" }, limit: 1 },
        },
        {
            entity: EEntities.posts,
            fields: ETypeFields.preview,
            variables: { limit: 20, order: "sys_publishedAt_DESC" },
        },
    ];

    const result = await getStaticPropsWrapper({
        schema,
        handlerData: (data) => {
            if (!data?.[EEntities.pages]?.items?.[0]) {
                return null;
            }
            const result: TPropsGeneric = data[EEntities.pages].items[0];

            result.links = {};
            if (Array.isArray(data?.[EEntities.posts]?.items))
                result.links[EEntities.posts] = data[EEntities.posts].items;
            result.links._all = data[EEntities.posts].items;

            return result;
        },
    });

    return result;
};
