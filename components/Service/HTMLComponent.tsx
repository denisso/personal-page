import React from "react";
import {Content} from "./HTMLComponentStyles"
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { LoadingLazy } from "../Elements/LoadingLazy";
import { ImageLazy } from "../Elements/LoadingLazy/ImageLazy";

const ImageLazyComponent = ({ src, alt }: JSX.IntrinsicElements["img"]) => (
    <LoadingLazy className="LoadingLazy" variant="rounded">
        <ImageLazy src={src} alt={alt || ""} className="ImageLazy" />
    </LoadingLazy>
);

export const HTMLComponent = ({
    content,
    className,
    components,
}: {
    content?: string;
    className?: string;
    components?: { [key: string]: React.ReactNode };
}) => {
    // if (typeof content !== "string") return <></>;

    const HTML = React.useMemo(() => {
        let result = <></>;
        try {
            result = unified()
                .use(rehypeParse, { fragment: true })
                .use(rehypeReact, {
                    createElement: React.createElement,
                    Fragment: React.Fragment,
                    components: {
                        ...components,
                        img: ImageLazyComponent,
                    },
                })
                .processSync(content).result;
        } catch (err) {}

        return result;
    }, [content, components]);

    return <Content className={className}>{HTML}</Content>;
};
