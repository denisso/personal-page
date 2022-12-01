import { getEntities } from "../lib/contentful/getEnties";
import { TPageHome } from "../lib/types";
import Layout from "../components/Layout";
import { Home } from "../components/Pages/Home";
import { TSchema, ETypeFields } from "../lib/contentful/queryGenerator";
import { EEntities, TResponseGeneric } from "../lib/types";

const HomePage = (props: TPageHome): JSX.Element => {

    return (
        <Layout
            title={props?.data?.title as string}
            description={`${props?.data?.title} - ${props?.data?.subtitle}`}
        >
            <Home {...props} />
        </Layout>
    );
};

export default HomePage;

export async function getStaticProps() {
    const pageHome: TSchema = [
        {
            entity: EEntities.pages,
            fields: ETypeFields.previewAndBody,
            fieldsCustom: [{ query: "json", data: ["hello", "short"] }],
            variables: { where: { slug: "/" } },
        },
    ];
    const response: TResponseGeneric = await getEntities({
        schema: pageHome,
    });

    const props: TPageHome = { data: {}, error: true };
    try {
        if (response.data[EEntities.pages][0])
            Object.assign(props, {
                data: response.data[EEntities.pages][0],
                error: response.error,
            });
    } catch (err) {
        props.error = err.message;
    }

    return {
        props,
        revalidate: 24 * 3600,
    };
}
