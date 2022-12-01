import Link from "next/link";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
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

export const BlogButton = () => {
    return (
        <Container>
            <Link href="/blog">
                <a>
                    <Tooltip title="Блог">
                        <RssFeedIcon />
                    </Tooltip>
                </a>
            </Link>
        </Container>
    );
};
