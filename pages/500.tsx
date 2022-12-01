import { GetStaticProps } from "next";
import { FallbackError } from "../components/Elements/FallbackError";

const title = "Внутренняя ошибка сервера";

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
