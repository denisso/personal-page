import React from "react";
import styled from "styled-components";
import { LinksProfiles } from "./Elements/LinksProfiles";
import useTheme from "@mui/material/styles/useTheme";
import dynamic from "next/dynamic";
const ModalSendMessage= dynamic(() =>
    import("./Footer/ModalSendMessage")
);
// import { ModalSendMessage } from "./Footer/ModalSendMessage";
const ModalSearch = dynamic(() =>
    import("./Footer/ModalSearch")
);
// import { ModalSearch } from "./Footer/ModalSearch";
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => theme?.palette?.color1[100]};
    padding: 2rem;
    background-color: ${({ theme }) => theme?.palette?.color4[600]};
    gap: 1rem;
    margin-top: 2rem;
    ${({ theme }) => theme.breakpoints.down("md")} {
        margin-top: 1rem;
    }
`;

export const Footer = () => {
    const theme = useTheme();
    return (
        <>
            <Container>
                <LinksProfiles color={theme?.palette?.color1[100]} />
                <small>Автор сайта Денис aka mr_dramm</small>
            </Container>
            <ModalSendMessage />
            <ModalSearch />
        </>
    );
};
