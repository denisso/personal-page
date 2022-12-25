import React from "react";
import { TPageHome } from "../lib/types";
import Layout from "../components/Layout";
import { TSchema, ETypeFields } from "../lib/contentful/queryGenerator";
import { EEntities } from "../lib/types";
import { getStaticPropsWrapper } from "../lib/getStaticProps";
import dynamic from "next/dynamic";

const Home = dynamic<TPageHome>(() =>
    import("../components/Pages/Home").then((res) => res.Home)
);
// import { Home } from "../components/Pages/Home";
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
    const schema: TSchema = [
        {
            entity: EEntities.pages,
            fields: ETypeFields.previewAndBody,
            fieldsCustom: [{ "items/json": { data: ["hello", "short"] } }],
            variables: { where: { slug: "/" } },
        },
    ];

    const result = await getStaticPropsWrapper({
        schema,
        handlerData: (data) => {
            if (!data[EEntities.pages]?.items?.[0]) {
                return null;
            }
            return data[EEntities.pages]?.items?.[0];
        },
    });
    return result;
}
