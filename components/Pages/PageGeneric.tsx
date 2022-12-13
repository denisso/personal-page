import React from "react";
import { Markdown } from "../Service/Markdown";
import { TPageGeneric } from "../../lib/types";
import styled from "styled-components";
import { EntitiesLinks } from "../Elements/EntitiesLinks";
import { FallbackError } from "../Elements/FallbackError";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { FallbackLoading } from "../Elements/FallbackLoading";
import {HeaderBlock} from "./_Parts/HeaderBlock"
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    .Header {
        display: flex;
        align-items: center;
        gap: 1rem;

        .Sign {
            font-size: 2.5rem;
        }
    }

    .Body {
        background: ${({ theme }) => theme.palette.color1[300]};
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
    .Tags {
        display: flex;
        justify-content: center;
    }
`;

export const Component = ({ data }: TPageGeneric) => {
    return (
        <Container>
            <h1 className="Header">
                <span className="Sign">✍️</span> {data?.title}
            </h1>

            <HeaderBlock data={data}/>

            {data?.body && (
                <section className="Body">
                    <Markdown content={data?.body} />
                </section>
            )}

            <EntitiesLinks
                linked={data?.links instanceof Object && data?.links?._all}
            />
        </Container>
    );
};

export const PageGeneric = (props: TPageGeneric) => {
    const router = useRouter();

    if (router.isFallback) {
        return <FallbackLoading />;
    }
    if (!props.data || props.error) {
        return <FallbackError />;
    }

    return (
        <Layout title={props?.data?.title} description={props?.data?.title}>
            <Component {...props} />
        </Layout>
    );
};
