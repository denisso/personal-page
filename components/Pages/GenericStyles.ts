import { css } from "styled-components";
/**
 * Variables are constant and do not participate in setting up the MUI theme
 *
 */
export const ImageStyles = css`
    width: 70%;
    height: 120px;
    ${({ theme }) => theme.breakpoints.up("sm")} {
        width: 70%;
        height: 140px;
    }
    ${({ theme }) => theme.breakpoints.between("sm", "lg")} {
        width: 50%;
        height: 160px;
    }
    ${({ theme }) => theme.breakpoints.between("lg", "xl")} {
        width: 40%;
        height: 180px;
    }
    ${({ theme }) => theme.breakpoints.up("xl")} {
        width: 30%;
        height: 240px;
    }
    margin: 0 auto;
    border-radius: 0.5rem;
    overflow: hidden;
`;
