import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/modal";
import { ModalNav } from "./ModalNav";
import MenuIcon from '@mui/icons-material/Menu';
type Props = {
    className: string;
};
const Container = styled(Box)`
    .MuiSvgIcon-root {
        fill: var(--colorHIaT);
        height: var(--iconHeight);
        width: var(--iconHeight);
        transition: fill var(--transition);
        &:hover {
            fill: var(--colorHIaTHover);
        }
    }`;

export const NavMenuDynamic = ({ className }: Props) => {
    const dispatch = useDispatch();
    const hendleClick = () => {
        dispatch(openModal({ modal: "navMenu" }));
    };

    return (
        <Container sx={{ minWidth: 60 }} className={className}>
            <Button onClick={hendleClick}><MenuIcon/></Button>
            <ModalNav />
        </Container>
    );
};
