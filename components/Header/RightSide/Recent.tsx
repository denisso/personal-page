import Link from "next/link";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
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

export const Recent = () => {
    return (
        <Container>
            <Link href="/recent">
                <a>
                    <Tooltip title="Новые посты">
                        <LibraryAddOutlinedIcon />
                    </Tooltip>
                </a>
            </Link>
        </Container>
    );
};
