import { GetStaticProps } from "next";
import { TPageGeneric } from "../lib/types";
import { PageGeneric } from "../components/Pages/PageGeneric";
import { TSchema } from "../lib/contentful/queryGenerator";
import { EEntities } from "../lib/types";
import { ETypeFields } from "../lib/contentful/queryGenerator";
import { getEntities } from "../lib/contentful/getEnties";

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
            variables: { limit: 100 },
        },
    ];
    const props: TPageGeneric = { data: {}, error: false };
    const entites = await getEntities({ schema });

    try {
        props.data = entites.data[EEntities.pages][0];
        props.data.links = {};
        props.data.links[EEntities.blog] = entites.data[EEntities.blog];
        props.data.links._all = entites.data[EEntities.blog];
    } catch (err) {
        props.error = err.message;
    }

    return { props, revalidate: 24 * 3600 };
};
