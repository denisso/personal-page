import { GetStaticProps } from "next";
import { TPageGeneric, EEntities, TResponseGeneric } from "../lib/types";
import { PageGeneric } from "../components/Pages/PageGeneric";
import { getEntities } from "../lib/contentful/getEnties";
import { TSchema } from "../lib/contentful/queryGenerator";
import { ETypeFields } from "../lib/contentful/queryGenerator";
const RecentPosts = (props: TPageGeneric) => <PageGeneric {...props} />;
export default RecentPosts;

export const getStaticProps: GetStaticProps = async () => {
    const schema: TSchema = [
        {
            entity: EEntities.pages,
            fields: ETypeFields.previewAndBody,
            variables: { where: { slug: "recent" }, limit: 1 },
            links: [
                {
                    entity: EEntities.posts,
                    fields: ETypeFields.preview,
                },
            ],
        },
    ];
    const response: TResponseGeneric = await getEntities({
        schema,
    });
    const props: TPageGeneric = { data: {}, error: false };

    try {
        if (response.data[EEntities.pages][0])
            props.data = response.data[EEntities.pages][0];
    } catch (err) {
        props.error = err.message;
    }

    return {
        props,
        revalidate: 24 * 3600,
    };
};
