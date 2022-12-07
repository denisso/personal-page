import { GetStaticProps } from "next";
import { TPageGeneric, TPropsGeneric } from "../lib/types";
import { PageGeneric } from "../components/Pages/PageGeneric";
import { TSchema } from "../lib/contentful/queryGenerator";
import { EEntities } from "../lib/types";
import { ETypeFields } from "../lib/contentful/queryGenerator";
import { getStaticPropsWrapper } from "../lib/getStaticProps";

const Blog = (props: TPageGeneric) => <PageGeneric {...props} />;
export default Blog;

export const getStaticProps: GetStaticProps = async () => {
    const schema: TSchema = [
        {
            entity: EEntities.pages,
            fields: ETypeFields.previewAndBody,
            variables: {
                limit: 1,
                where: { slug: "blog" },
            },
        },
        {
            entity: EEntities.blog,
            fields: ETypeFields.preview,
            variables: { limit: 100, order: "sys_publishedAt_DESC" },
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
            if (Array.isArray(data?.[EEntities.blog]?.items))
                result.links[EEntities.blog] = data[EEntities.blog].items;
            result.links._all = data[EEntities.blog].items;

            return result;
        },
    });

    return result;
};
