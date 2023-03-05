import styled, { css } from "styled-components";

const imageMedia = css`
    height: 22rem;
    transition: 1s height;
    ${({ theme }) => theme.breakpoints.down("md")} {
        height: 18rem;
    }
    @media (max-width: 750px) {
        height: 15rem;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
        height: 12rem;
    }
    @media (max-width: 500px) {
        height: 9.5rem;
    }
    @media (max-width: 400px) {
        height: 7rem;
    }
`;

const PrismJsStyles = css`
    code[class*="language-"],
    pre[class*="language-"] {
        color: #f8f8f2;
        background: 0 0;
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
        font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
        font-size: 1em;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
    }
    pre[class*="language-"] {
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
        border-radius: 0.3em;
    }
    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
        background: #272822;
    }
    :not(pre) > code[class*="language-"] {
        padding: 0.1em;
        border-radius: 0.3em;
        white-space: normal;
    }
    .token.cdata,
    .token.comment,
    .token.doctype,
    .token.prolog {
        color: #8292a2;
    }
    .token.punctuation {
        color: #f8f8f2;
    }
    .token.namespace {
        opacity: 0.7;
    }
    .token.constant,
    .token.deleted,
    .token.property,
    .token.symbol,
    .token.tag {
        color: #f92672;
    }
    .token.boolean,
    .token.number {
        color: #ae81ff;
    }
    .token.attr-name,
    .token.builtin,
    .token.char,
    .token.inserted,
    .token.selector,
    .token.string {
        color: #a6e22e;
    }
    .language-css .token.string,
    .style .token.string,
    .token.entity,
    .token.operator,
    .token.url,
    .token.variable {
        color: #f8f8f2;
    }
    .token.atrule,
    .token.attr-value,
    .token.class-name,
    .token.function {
        color: #e6db74;
    }
    .token.keyword {
        color: #66d9ef;
    }
    .token.important,
    .token.regex {
        color: #fd971f;
    }
    .token.bold,
    .token.important {
        font-weight: 700;
    }
    .token.italic {
        font-style: italic;
    }
    .token.entity {
        cursor: help;
    }
`;
export const Content = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-indent: 2rem;
    ${({ theme }) => theme.breakpoints.down("md")} {
        text-indent: 1.2rem;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
        text-indent: 0.5rem;
    }

    ul,
    ol {
        list-style-position: inside;
    }
    li {
        & > * {
            display: inline;
        }
        ul,
        ol {
            display: block;
            margin-left: 1rem;
        }
    }

    * + h1,
    * + h2,
    * + h3,
    * + h4,
    * + h5,
    * + h6 {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    & a {
        text-decoration: underline !important;
    }
    pre {
        text-indent: 0;
        margin-left: 2rem;
        ${({ theme }) => theme.breakpoints.down("md")} {
            margin-left: 1.2rem;
        }
        ${({ theme }) => theme.breakpoints.down("sm")} {
            margin-left: 0.5rem;
        }
        code {
            font-family: ${({ theme }) => theme.typography.fontSourceCode};
        }
        overflow-x: auto;
    }
    .LoadingLazy {
        margin: 1rem auto;
        ${imageMedia}
    }
    .codeblock {
        .codebox{
            ${PrismJsStyles}
        }
        display: flex;
        position: relative;
        background-color: #272822;
        border-radius: 0.5rem;
        text-indent: 0;
        .codelines,
        .codebox {
            line-height: 1.5rem;
            margin: 0.5em 0;
            padding-top: 1rem
        }
        .codelines {
            pointer-events: none;
            color: #f8f8f2;
            display: flex;
            flex-direction: column;
            padding-right: 1rem;
            font-weight: 900;
            user-select: none;
            padding: 1em;
        }
        .codebox {
            margin-right: 1rem;
            flex-basis: 100%;
            overflow-y: auto;
            .token {
                font-size: 1rem;
            }
            pre, pre[class*="language-"] {
                padding: 0;
                margin: 0;
                color: #f8f8f2;
                background-color: transparent;
                border-radius: 0;
                font-size: 1rem;
                line-height: 1.5rem;
                code {
                    display: block;
                    line-height: 1.5rem;
                    font-size: 1rem;
                }
            }
        }
        .codecopy {
            position: absolute;
            user-select: none;
            top: 1rem;
            right: 1rem;
            background: transparent;
            color: #656565;
            border-color: #656565;
            cursor: pointer;
            border-radius: 0.5rem;
            padding: .3rem 1rem;
            &.copied,
            &:hover {
                color: #f8f8f2;
                border-color: #f8f8f2;
            }
            &.error {
                color: #8b0e0e;
                border-color: #8b0e0e;
            }
        }
    }
    blockquote {
        margin: 0;
        text-indent: 0;
        padding-left: calc(2rem - 5px);
        border-left-width: 5px;
        border-left-style: solid;
    }
    table{
        border-collapse: collapse;

        td, th{
            text-align: center;
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: var(--colorText);
            padding: .2rem .5rem;
        }
        td:not(:last-child), th:not(:last-child){
            border-right-style: solid;
            border-right-width: 1px;
            border-right-color: var(--colorText);
        }
    }
    iframe {
        display: block;
        ${({ theme }) => theme.breakpoints.up("md")} {
            width: 80%;
            height: 400px;
        }
        ${({ theme }) => theme.breakpoints.down("md")} {
            width: 90%;
            height: 330px;
        }
        ${({ theme }) => theme.breakpoints.down("sm")} {
            width: 100%;
            height: 300px;
        }

        margin: 0 auto;
        display: block;
    }
`;