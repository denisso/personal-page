import React from "react";
import { Content } from "./HTMLComponentStyles";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { LoadingLazy } from "../Elements/LoadingLazy";
import { ImageLazy } from "../Elements/LoadingLazy/ImageLazy";
import Link from "next/link";

const ImageLazyComponent = ({ src, alt }: JSX.IntrinsicElements["img"]) => (
    <LoadingLazy className="LoadingLazy" variant="rounded">
        <ImageLazy src={src} alt={alt || ""} className="ImageLazy" />
    </LoadingLazy>
);

const Ahref = ({ href, rel, target, children }: JSX.IntrinsicElements["a"]) => {
    return (
        <Link href={href || "#"}>
            <a {...(rel ? { rel } : {})} {...(target ? { target } : {})}>
                {children}
            </a>
        </Link>
    );
};

export const HTMLComponent = ({
    content,
    className,
    components,
}: {
    content?: string;
    className?: string;
    components?: { [key: string]: React.ReactNode };
}) => {
    const HTML = React.useMemo(() => {
        let result = <></>;
        try {
            result = unified()
                .use(rehypeParse, { fragment: true })
                .use(rehypeSanitize, {
                    ...defaultSchema,
                    tagNames: [
                        ...(defaultSchema.tagNames || []),
                        "section",
                        "iframe",
                    ],

                    attributes: {
                        ...defaultSchema.attributes,
                        "*": ["className"],
                        iframe: [
                            "width",
                            "height",
                            "src",
                            "title",
                            "allow",
                            "allowfullscreen",
                        ],
                        a: ["href", "rel", "target"],
                    },
                })
                .use(rehypeReact, {
                    createElement: React.createElement,
                    Fragment: React.Fragment,
                    components: {
                        ...components,
                        img: ImageLazyComponent,
                        a: Ahref,
                    },
                })
                .processSync(content).result;
        } catch (err) {}

        return result;
    }, [content, components]);

    return <Content className={className}>{HTML}</Content>;
};
