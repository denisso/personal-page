import Link from "next/link";
import LogoIcon from "../../assets/logo.svg";
import styled from "styled-components";

const Container = styled("div")`
    display: flex;
    align-items: center;
    .IconLink {
        display: flex;
        align-items: center;
        .Icon {
            stroke: var(--colorHIaT);
            stroke-width: 8;
            height: var(--iconHeight);
            width: var(--iconHeight);
            transition: stroke var(--transition);
            &:hover{
                stroke: var(--colorHIaTHover);
            }
        }
    }
`;
export const Logo = ({ className }: { className: string }) => {
    return (
        <Container className={className}>
            <Link href="/">
                <a className="IconLink">
                    <LogoIcon className="Icon" />
                </a>
            </Link>
        </Container>
    );
};
