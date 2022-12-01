import React from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Layout from "../Layout";
const Container = styled(Layout)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    .Title {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        .TextLoading {
            font-size: 1.5rem;
        }
    }
    .Header {
        flex: 0;
        flex-basis: 2rem;
    }
    .Image {
        flex: 0;
        width: 40vw;
        margin: 0 auto;
        flex-basis: 2rem;
    }
    .BeforeBody {
        flex: 0;
        flex-basis: 2rem;
    }
    .Body {
        flex: 1;
    }
`;

export const Component = () => {
    return (
        <Container
            title="Идет загрузка"
            description={
                "На сайте можно найти много материала по веб разработке."
            }
        >
            <div className="Title">
                <CircularProgress />
                <div className="TextLoading">Идет загрузка...</div>
            </div>
            <Skeleton className="Header" variant="rectangular" />
            <Skeleton className="Image" variant="rectangular" />
            <Skeleton className="BeforeBody" variant="rectangular" />
            <Skeleton className="Body" variant="rectangular" />
        </Container>
    );
};

export const FallbackLoading = () => {
    return <Component />;
};
