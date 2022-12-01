import styled from "styled-components";
import Layout from "../Layout";
import Link from "next/link";
const LayoutStyled = styled(Layout)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .Message {
        text-align: center;
    }
    & .MessageLink .Link {
        text-decoration: underline;
    }
`;
const titleError = "Что-то пошло не так как планировалось";

export const FallbackError = ({ title }: { title?: string }) => {
    title = title || titleError;
    return (
        <LayoutStyled
            title={titleError}
            description={
                "На сайте можно найти много материала по веб разработке."
            }
        >
            <div className="Message">{title}</div>
            <div className="MessageLink">
                <Link href={"/"}>
                    <a className="Link">{"Вернуться на главную страницу"}</a>
                </Link>
            </div>
        </LayoutStyled>
    );
};
