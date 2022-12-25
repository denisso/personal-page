import styled from "styled-components";
import React from "react";
import { ImageLazy } from "./LoadingLazy/ImageLazy";
import { LinksProfiles } from "./LinksProfiles";
import useTheme from "@mui/material/styles/useTheme";
import { TImage } from "../../lib/types";
import { Theme } from "@mui/material";
import { LoadingLazy } from "./LoadingLazy";
const Container = styled("div")`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1.6rem;
    padding-top: 2rem;

    .Text {
        .Hello {
            font-size: 2.2rem;
            margin-bottom: 1rem;
        }
        .Short {
            font-size: 1.6rem;
            margin-bottom: 1rem;
        }
    }
    .Photo {
        height: 10rem;
        width: 10rem;
        flex-shrink: 0;
        border-radius: 0.4rem;
        overflow: hidden;
        .Skeleton {
            height: 10rem;
            width: 10rem;
        }
    }
    ${({ theme }) => theme.breakpoints.down("md")} {
        gap: 1rem;
        flex-direction: column-reverse;
        .Text {
            .Hello {
                font-size: 1.8rem;
                margin-bottom: 0;
            }
            .Short {
                font-size: 1.4rem;
            }
        }
    }
`;

type THeroBlockProps = {
    hello?: string;
    short?: string;
    image?: TImage;
};

const HeroBlock = ({ hello, short, image }: THeroBlockProps) => {
    const theme: Theme = useTheme();
    return (
        <Container> 
            <div className="Text">
                <h1 className="Hello">{hello}</h1>
                <div className="Short">
                    {typeof short === "string" &&
                        short.split("\n").map((e, i) => (
                            <p className="" key={i}>
                                {e}
                            </p>
                        ))}
                </div>
                <LinksProfiles
                    className="sendMe"
                    color={theme.palette.color1[800]}
                />
            </div>
            {image && (
                <LoadingLazy
                    className="Photo"
                    variant="rounded"
                >
                    <ImageLazy
                        path={image?.path}
                        alt={"Face of the hero"}
                        width={460}
                        height={460}
                    />
                </LoadingLazy>
            )}
        </Container>
    );
};

export default HeroBlock;
