import { TPageGeneric } from "../../lib/types";
import { PageGeneric } from "../../components/Pages/PageGeneric";
import { GetStaticProps } from "next";
import { EEntities } from "../../lib/types";
import { TSchema, ETypeFields } from "../../lib/contentful/queryGenerator";
import { getSlug, getStaticPropsWrapper } from "../../lib/getStaticProps";

const NotesPage = (props: TPageGeneric) => <PageGeneric {...props} />;

export default NotesPage;

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
            entity: EEntities.notes,
            fields: ETypeFields.previewAndBody,
            fieldsCustom: [],
            variables: { where: { slug }, limit: 1 },
            refs: [
                {
                    entity: EEntities.posts,
                    fields: ETypeFields.preview,
                    fieldsCustom: [],
                },
            ],
        },
    ];

    const result = await getStaticPropsWrapper({
        schema,
        handlerData: (data) => {
            if (!data[EEntities.notes][0]) {
                return null;
            }
            return data[EEntities.notes][0];
        },
    });

    return result;
};
