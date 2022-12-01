import { TPageGeneric } from "../../lib/types";
import { PageGeneric } from "../../components/Pages/PageGeneric";
import { GetStaticProps } from "next";
import { EEntities, TResponseGeneric } from "../../lib/types";
import { TSchema, ETypeFields } from "../../lib/contentful/queryGenerator";
import { getEntities } from "../../lib/contentful/getEnties";

const NotesPage = (props: TPageGeneric) => <PageGeneric {...props} />;

export default NotesPage;

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    let realSlug = "";
    if (Array.isArray(context?.params?.slug)) {
        realSlug = context?.params?.slug[0];
    } else if (typeof context?.params?.slug === "string") {
        realSlug = context?.params?.slug;
    }
    const schema: TSchema = [
        {
            entity: EEntities.notes,
            fields: ETypeFields.previewAndBody,
            fieldsCustom: [],
            variables: { where: { slug: realSlug }, limit: 1 },
            refs: [
                {
                    entity: EEntities.posts,
                    fields: ETypeFields.preview,
                    fieldsCustom: [],
                },
            ],
        },
    ];
    const response: TResponseGeneric = await getEntities({
        schema,
    });
    const props: TPageGeneric = { data: {}, error: false };

    try {
        if (response.data[EEntities.notes][0])
            props.data = response.data[EEntities.notes][0];
    } catch (err) {
        props.error = err.message;
    }

    return {
        props,
        revalidate: 24 * 3600,
    };
};
