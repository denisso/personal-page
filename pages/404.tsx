import { GetStaticProps } from "next";
import { FallbackError } from "../components/Elements/FallbackError";

const title = "Страница не найдена";

const Page = () => {
    return <FallbackError title={title} />;
};

export default Page;

export const getStaticProps: GetStaticProps = async () => {
    const props = {};
    return {
        props,
    };
};
