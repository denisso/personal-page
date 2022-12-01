import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { openModal } from "../../../features/modal";
const Container = styled("div")`
    height: var(--iconHeight);
    width: var(--iconHeight);
    .MuiSvgIcon-root {
        fill: var(--colorHIaT);
        height: var(--iconHeight);
        width: var(--iconHeight);
        transition: fill var(--transition);
        &:hover {
            fill: var(--colorHIaTHover);
        }
    }
`;

export const Search = () => {
    const dispatch = useDispatch();
    return (
        <Container>
            <a onClick={() => dispatch(openModal({ modal: "search" }))}>
                <Tooltip title="Поиск">
                    <SearchIcon />
                </Tooltip>
            </a>
        </Container>
    );
};
