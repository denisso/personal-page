import { FallbackError } from "../components/Elements/FallbackError";

const title = "Внутренняя ошибка сервера";

const Page = () => {
    return <FallbackError title={title} />;
};

export default Page;
