import React from "react";
import { Markdown } from "../Service/Markdown";
import { TPageGeneric } from "../../lib/types";
import styled from "styled-components";
import { EntitiesLinks } from "../Elements/EntitiesLinks";
import { FallbackError } from "../Elements/FallbackError";
import Layout from "../Layout";
import { useRouter } from "next/router";
import { FallbackLoading } from "../Elements/FallbackLoading";
import TocIcon from "@mui/icons-material/Toc";
import { ModalTOC } from "./Post/ModalTOC";
import { useDispatch } from "react-redux";
import { openModal } from "../../features/modal";
import slugify from "slugify";
import { PostContext, THeadingElement } from "./Post/PostContext";
import { Button } from "@mui/material";
import { HeaderBlock } from "./_Parts/HeaderBlock";
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .Header {
        display: flex;
        align-items: center;
        gap: 1rem;

        .Sign {
            font-size: 2.5rem;
        }
    }

    .Body {
        background: ${({ theme }) => theme.palette.color1[300]};
        padding: 0.5rem;
        border-radius: 0.5rem;
        .PostHeader {
            scroll-snap-align: start;
            scroll-margin-top: 5rem;
        }
    }
    .TableOfTheContent {
        position: sticky;
        bottom: 0.5rem;
        display: flex;
        justify-content: center;
        .ButtonTOC {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.3rem 1rem;

            .Icon {
                width: 1.8rem;
                height: 1.8rem;
            }
            .Content {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
`;

interface IgetCurrentheader {
    (arg: {
        topOffset: number;
        indexTopPrev: number;
        headers: Array<THeadingElement>;
    }): number;
}

const getCurrentheader: IgetCurrentheader = ({
    topOffset,
    headers,
    indexTopPrev,
}) => {
    let indexTop = indexTopPrev;
    if (!Array.isArray(headers)) return indexTop;
    let prevTop = 0;
    if (headers[headers.length - 1]?.element?.getBoundingClientRect()?.y < 0) {
        return headers.length - 1;
    }
    for (let indx = 0; indx < headers.length; indx++) {
        const rect = headers[indx]?.element?.getBoundingClientRect();
        const clientHeight = document.documentElement.clientHeight;
        if (!rect) continue;
        if (rect.y >= topOffset && rect.y < clientHeight) {
            indexTop = indx;
            break;
        }
        if (rect.y >= clientHeight) {
            indexTop = prevTop;
            break;
        }
        prevTop = indx;
    }

    return indexTop;
};

const MarkdownCustom = ({ content }: { content: string }) => {
    const { setCurrent, headers } = React.useContext(PostContext);

    const topHeader = React.useRef(0);

    const trigger = React.useCallback(() => {
        topHeader.current = getCurrentheader({
            headers: headers.current,
            topOffset: 70,
            indexTopPrev: topHeader.current,
        });

        if (setCurrent instanceof Function) {
            setCurrent(topHeader.current);
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener("scroll", trigger);
        window.addEventListener("resize", trigger);
        trigger();
        return () => {
            window.removeEventListener("scroll", trigger);
            window.removeEventListener("resize", trigger);
        };
    }, []);

    const markdownComponents = React.useMemo(() => {
        const HeaderComponent = (
            elementName: string,
            props: { children: Array<string> }
        ) => {
            const content = props.children.join(" ");
            const hash = "header--" + slugify(content.toLowerCase());
            return React.createElement(
                elementName,
                {
                    key: hash,
                    id: hash,
                    className: "PostHeader",
                    ref: (element: HTMLHeadingElement) => {
                        if (
                            element &&
                            !headers.current.find(
                                ({ element: headerElement }) =>
                                    headerElement === element
                            )
                        ) {
                            headers.current.push({
                                element,
                                content,
                                hash,
                                level: +elementName?.[1],
                            });
                        }
                    },
                },
                content
            );
        };

        const result = {};
        for (let i = 1; i <= 6; i++) {
            result[`h${i}`] = HeaderComponent.bind(null, `h${i}`);
        }
        return result;
    }, []);
    return <Markdown content={content} components={markdownComponents} />;
};

export const Component = ({ data }: TPageGeneric) => {
    const dispatch = useDispatch();
    const { headers, current } = React.useContext(PostContext);
    const handleOpenModal = () => {
        dispatch(openModal({ modal: "modalTOC" }));
    };
    return (
        <Container>
            <h1 className="Header">
                <span className="Sign">✍️</span> {data?.title}
            </h1>
            <HeaderBlock data={data} />

            {data?.body && (
                <section className="Body">
                    <MarkdownCustom content={data?.body} />
                </section>
            )}

            <EntitiesLinks
                linked={data?.links instanceof Object && data?.links?._all}
            />

            <div className="TableOfTheContent">
                <Button
                    className="ButtonTOC"
                    onClick={handleOpenModal}
                    variant="outlined"
                >
                    <TocIcon className="Icon" />
                    <div className="Content">
                        {headers.current[current]?.content}
                    </div>
                </Button>
            </div>
        </Container>
    );
};

export const Post = (props: TPageGeneric) => {
    const router = useRouter();

    const [current, setCurrent] = React.useState(-1);
    const headers = React.useRef([]);
    if (router.isFallback) {
        return <FallbackLoading />;
    }
    if (!props.data || props.error) {
        return <FallbackError />;
    }

    return (
        <Layout title={props?.data?.title} description={props?.data?.title}>
            <PostContext.Provider value={{ headers, current, setCurrent }}>
                <Component {...props} />
                <ModalTOC />
            </PostContext.Provider>
        </Layout>
    );
};
