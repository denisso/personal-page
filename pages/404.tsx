import { FallbackError } from "../components/Elements/FallbackError";

const title = "Страница не найдена";

const Page = () => {
    return <FallbackError title={title} />;
};

export default Page;
