import React from "react";
import styled from "styled-components";
import { HTMLComponent } from "../Service/HTMLComponent";
import HeroBlock from "../Elements/HeroBlock";
import { TPageHome } from "../../lib/types";
import moment from "moment";
import { FallbackError } from "../Elements/FallbackError";
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    ${({ theme }) => theme.breakpoints.down("md")} {
        gap: 2.2rem;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
        gap: 1.7rem;
    }
    ${({ theme }) => theme.breakpoints.down("xs3")} {
        gap: 1.3rem;
    }
    ${({ theme }) => theme.breakpoints.down("xs2")} {
        gap: 1rem;
    }
`;

export const Home = ({ data, error }: TPageHome) => {
    if (error) {
        <FallbackError />;
    }
    return (
        <Container>
            <HeroBlock
                hello={data?.hello}
                short={data?.short}
                image={data?.image}
            />

            {typeof data?.body === "string" && (
                <section className="blockDescribe">
                    <h2>Обо мне</h2>
                    <HTMLComponent content={data?.body} />
                </section>
            )}

            <div className="publishedAt">
                Обновлено:{" "}
                {moment(data?.publishedAt).format("YYYY/MM/DD HH:mm")}
            </div>
        </Container>
    );
};
