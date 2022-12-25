import React from "react"
import { TPageGeneric } from "../../lib/types";
import { GetStaticProps } from "next";
import { EEntities } from "../../lib/types";
import { TSchema, ETypeFields } from "../../lib/contentful/queryGenerator";
import { getSlug, getStaticPropsWrapper } from "../../lib/getStaticProps";
import dynamic from "next/dynamic";

const Post = dynamic<TPageGeneric>(() =>
    import("../../components/Pages/Post").then((res) => res.Post)
);
//import { Post } from "../../components/Pages/Post";
const PostsPage = (props: TPageGeneric) => <Post {...props} />;

export default PostsPage;

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
            entity: EEntities.posts,
            fields: ETypeFields.previewAndBody,
            fieldsCustom: [],
            variables: { where: { slug }, limit: 1 },
            links: [
                {
                    entity: EEntities.notes,
                    fields: ETypeFields.preview,
                    fieldsCustom: [],
                },
            ],

            refs: [
                {
                    entity: EEntities.category,
                    fields: ETypeFields.preview,
                    fieldsCustom: [],
                },
            ],
        },
    ];

    const result = await getStaticPropsWrapper({
        schema,
        handlerData: (data) => {
            if (!data?.[EEntities.posts]?.items?.[0]) {
                return null;
            }
            return data[EEntities.posts].items[0];
        },
    });

    return result;
};
