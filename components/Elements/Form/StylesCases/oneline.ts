import { css } from "styled-components";

export const styleOneLine = css`
    display: flex;
    gap: 1rem;

    ${({ theme }) => theme.breakpoints.up("md")} {
        .Fields {
            flex-grow: 1;
            flex-shrink: 1;
            overflow-y: visible;
            z-index: 100;
        }
        .Controls {
            flex-shrink: 0;
            .Buttons {
                margin-left: 1rem;
                display: flex;
                gap: 1rem;

                .ButtonClose {
                    padding: 0;
                    .Icon {
                        height: 3rem;
                        width: 3rem;
                    }
                }
            }
        }
    }
    ${({ theme }) => theme.breakpoints.down("md")} {
        flex-direction: column;
        align-items: stretch;
        .Controls {
            flex-shrink: 0;
            .Buttons {
                display: flex;
                gap: 1rem;
                .ButtonSubmit {
                    flex: 1;
                }
                .ButtonClose {
                    padding: 0;
                    .Icon {
                        height: 3rem;
                        width: 3rem;
                    }
                }
            }
        }
    }
`;
