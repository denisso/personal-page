import React from "react";
import styled from "styled-components";
import { NavMenu } from "./Header/NavMenu";
import { Logo } from "./Header/Logo";
import { ThemeSwitcher } from "./Header/RightSide/ThemeSwitcher";
import { SendMessage } from "./Header/RightSide/SendMessage";
import { BlogButton } from "./Header/RightSide/BlogButton";
import { Recent } from "./Header/RightSide/Recent";
import { Search } from "./Header/RightSide/Search";

const Container = styled("div")`
    ${({ theme }) => theme.breakpoints.up("sm")} {
        border-top-left-radius: var(--borderRadiusBlock);
        border-top-right-radius: var(--borderRadiusBlock);
    }
    display: flex;
    align-items: center;
    position: sticky;
    z-index: var(--zIndexSteakyHeader);
    top: 0px;
    background-color: ${({ theme }) => theme.palette.colorRoot};
    outline: 2px solid ${({ theme }) => theme.palette.colorRoot};
    transition: background-color var(--transition);
    box-shadow: var(--boxShadowHorizontal) rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
    gap: 1rem;
    color: var(--colorText);
    transition: color var(--transition);
    .Logo {
        flex-shrink: 0;
    }
    .Side {
        display: flex;
        align-items: center;
        margin-left: auto;
        flex-shrink: 0;
        gap: 1rem;
    }
`;

export const Header = () => {
    return (
        <Container>
            <Logo className="Logo" />
            <NavMenu className="NavMenu" />

            <div className="Side">
                <Search />
                <Recent />
                <BlogButton />
                <ThemeSwitcher />
                <SendMessage />
            </div>
        </Container>
    );
};
