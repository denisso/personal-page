import React from "react";
import styled from "styled-components";
import { TPageGeneric } from "../../lib/types";
import Link from "next/link";
import { DateCreateUpdate } from "./DateCreateUpdate";
import { ImageLazy } from "./LoadingLazy/ImageLazy";
import { LoadingLazy } from "./LoadingLazy";
import { EntitiesRefs } from "./EntitiesRefs";
const Container = styled("div")`
    &.DefaultStyle {
        width: 80%;
        margin: 0 auto;
        transition: width var(--transition);
        ${({ theme }) => theme?.breakpoints?.down("lg")} {
            width: 85%;
        }
        ${({ theme }) => theme?.breakpoints?.down("md")} {
            width: 95%;
        }
        ${({ theme }) => theme?.breakpoints?.down("sm")} {
            width: 100%;
        }
    }

    .LinkedBox {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        gap: 1rem;
        .Item {
            background: ${({ theme }) => theme.palette.color1[300]};
            padding: 0.5rem;
            border-radius: 0.5rem;
            .ImageBox {
                flex-shrink: 0;
                width: 6.8rem;
                height: 3.5rem;
                float: left;
                margin-right: 1rem;
                border-radius: 0.5rem;
                overflow: hidden;
                .Image {
                    height: auto;
                    width: 6.8rem;
                    display: block;
                }
            }
            .InfoBlock {
                flex: 1;
                .Title {
                    font-weight: bold;
                }
                .Content {
                    & > * + * {
                        margin-left: 1rem;
                    }
                    .SubTitle {
                        & a {
                            text-decoration: underline;
                        }
                        .SubtitleText + a.ReadMore {
                            margin-left: 0.5rem;
                            white-space: nowrap;
                        }
                    }
                }
                .Refs {
                    margin-top: 0.2rem;
                    display: flex;
                    justify-content: center;
                }
                &::after {
                    content: "";
                    clear: both;
                    display: block;
                }
            }
            .Refs {
                display: flex;
                justify-content: center;
            }
        }
    }
`;

type TEntitiesLinksProps = {
    linked: Array<TPageGeneric["data"]>;
    title?: string;
    className?: string;
    filter?: string | Array<string>; // not implemented yet
    callbackClick?: (...args: any[]) => void;
};

/**
 * Current entity list links for example: [Entity: category] has ["Links" posts]
 * @param param0
 * @returns
 */

export const EntitiesLinks = ({
    linked,
    title,
    className,
    callbackClick,
}: TEntitiesLinksProps) => {
    if (!linked?.length) return <></>;
    return (
        <Container className={`${className ? className : "DefaultStyle"}`}>
            {title && <h3 className="Title">{title}</h3>}
            <div className="LinkedBox">
                {linked.map((linkedItem, index) => (
                    <div
                        key={linkedItem.slug}
                        className="Item"
                        id={`materials-${linkedItem?.type}-${linkedItem?.slug}`}
                    >
                        {linkedItem?.image?.url && (
                            <LoadingLazy className="ImageBox" variant="rounded">
                                <ImageLazy
                                    path={linkedItem?.image?.path || ""}
                                    alt={"image"}
                                    width={linkedItem?.image?.width}
                                    height={linkedItem?.image?.height}
                                    className="Image"
                                />
                            </LoadingLazy>
                        )}
                        <div className="InfoBlock">
                            <div className="Title">
                                {index + 1}.{" "}
                                <Link
                                    href={`/${linkedItem?.type?.toLowerCase()}/${
                                        linkedItem?.slug
                                    }`}
                                    passHref
                                >
                                    <a onClick={callbackClick}>
                                        {linkedItem?.title}
                                    </a>
                                </Link>
                            </div>
                            <div className="Content">
                                {/* <span className="Type">
                                    <b>{linkedItem?.type}</b>
                                </span> */}
                                <DateCreateUpdate
                                    publishedAt={linkedItem?.publishedAt}
                                    firstPublishedAt={
                                        linkedItem?.firstPublishedAt
                                    }
                                />
                                <span className="SubTitle">
                                    {linkedItem?.subtitle &&
                                        linkedItem?.subtitle?.trim() !== "" && (
                                            <span className="SubtitleText">
                                                {linkedItem?.subtitle}
                                            </span>
                                        )}

                                    <Link
                                        href={`/${linkedItem?.type?.toLowerCase()}/${
                                            linkedItem?.slug
                                        }`}
                                        passHref
                                    >
                                        <a
                                            className="ReadMore"
                                            onClick={callbackClick}
                                        >
                                            Читать далее
                                        </a>
                                    </Link>
                                </span>
                            </div>
                            <div className="Refs">
                                <EntitiesRefs refs={linkedItem?.refs?._all} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};
