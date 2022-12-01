import { css } from "styled-components";
/**
 * Variables are constant and do not participate in setting up the MUI theme
 *
 */
export const variables = css`
    :root {
        --font1: ${({ theme }) => theme.typography.font1};
        --font2: ${({ theme }) => theme.typography.font2};
        --zIndexModal: ${({ theme }) => theme.zIndex.modal};
        --zIndexSteakyHeader: ${({ theme }) => theme.zIndex.appBar};
        --transition: ${({ theme }) =>
            theme.transitions.duration.standard + "ms"};
        --colorText: ${({ theme }) => theme.palette.color1[900]};
        /* color header icons and text */
        --colorHIaT: ${({ theme }) => theme.palette.color1[600]};
        --colorHIaTHover: ${({ theme }) => theme.palette.color1[900]};
        --colorTags: ${({ theme }) => theme.palette.colorText};
        --borderRadiusBlock: 0.5rem;
        --borderRadiusInput: 0.3rem;
        --opacityFadeOut: 0.6;
        --boxShadowVertical: 10px 0px 8px -6px;
        --boxShadowHorizontal: 0px 10px 8px -6px;
        --iconHeight: 2rem;
    }
`;
