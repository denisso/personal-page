import React from "react"
import { ImageLazy } from "../../Elements/LoadingLazy/ImageLazy";
import { LoadingLazy } from "../../Elements/LoadingLazy";
import { TPageGeneric } from "../../../lib/types";
import styled from "styled-components";
import { ImageStyles } from "./GenericImageStyles";
const Container = styled("div")`
width: 100%;
    ${({ theme }) => theme.breakpoints.up("md")} {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    ${({ theme }) => theme.breakpoints.down("md")} {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .HeaderImage {
        ${ImageStyles}
    }
`;
export const ImageHead = ({ data }: TPageGeneric) => {

    return (
        <Container>
            {data?.image && (
                <LoadingLazy className="HeaderImage" variant="rounded">
                    <ImageLazy
                        src={data?.image?.url}
                        alt={"Title image"}
                        height={240}
                        width={400}
                    />
                </LoadingLazy>
            )}
        </Container>
    );
};
