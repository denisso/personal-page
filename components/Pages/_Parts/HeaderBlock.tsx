import React from "react"
import { ImageLazy } from "../../Elements/LoadingLazy/ImageLazy";
import { LoadingLazy } from "../../Elements/LoadingLazy";
import { TPageGeneric } from "../../../lib/types";
import { DateCreateUpdate } from "../../Elements/DateCreateUpdate";
import { EntitiesRefs } from "../../Elements/EntitiesRefs";
import styled from "styled-components";
import { ImageStyles } from "./GenericImageStyles";
const Container = styled("div")`
    gap: 1rem;
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
    .MetaData {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: ${({ theme }) => theme.palette.color1[300]};
        padding: 0.5rem;
        border-radius: 0.5rem;
    }
`;
export const HeaderBlock = ({ data }: TPageGeneric) => {
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
            <div className="MetaData">
                <DateCreateUpdate
                    publishedAt={data?.publishedAt}
                    firstPublishedAt={data?.firstPublishedAt}
                    hidden={data?.type === "category"}
                />
                <EntitiesRefs
                    refs={data?.refs instanceof Object && data?.refs?._all}
                />
            </div>
        </Container>
    );
};
