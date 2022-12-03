import { PageGeneric } from "../../components/Pages/PageGeneric";
import { GetStaticProps } from "next";
import { EEntities, TPageGeneric } from "../../lib/types";
import { TSchema, ETypeFields } from "../../lib/contentful/queryGenerator";
import { getSlug, getStaticPropsWrapper } from "../../lib/getStaticProps";

const Blog = (props: TPageGeneric) => <PageGeneric {...props} />;

export default Blog;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = getSlug(context?.params?.slug);
    const schema: TSchema = [
        {
            entity: EEntities.blog,
            fields: ETypeFields.previewAndBody,
            fieldsCustom: [],
            variables: { where: { slug }, limit: 1 },
        },
    ];

    const result = await getStaticPropsWrapper({
        schema,
        handlerData: (data) => {
            if (!data[EEntities.blog][0]) {
                return null;
            }
            return data[EEntities.blog][0];
        },
    });

    return result;
};
