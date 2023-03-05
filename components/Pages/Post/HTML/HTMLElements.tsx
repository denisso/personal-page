import React from "react";
import slugify from "slugify";
import { HTMLComponent } from "../../../Service/HTMLComponent";
import { PostContext, THeadingElement } from "./../../Post/PostContext";
import { CodeSection } from "./CodeSection";
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

export const HTMLElements = ({ content }: { content: string }) => {
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
  }, [headers, setCurrent]);

  React.useEffect(() => {
    window.addEventListener("scroll", trigger);
    window.addEventListener("resize", trigger);
    trigger();
    return () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("resize", trigger);
    };
  }, [trigger]);

  const markdownComponents = React.useMemo(() => {
    let indx = 0;
    const HeaderComponent = (
      elementName: string,
      props: {
        children: Array<string | { props?: { children?: Array<string> } }>;
      }
    ) => {
      indx++;
      let result: ReturnType<typeof React.createElement> = <></>;
      try {
        let content = "";
        const children = props?.children?.[0];
        if (typeof children === "object") {
          content = children?.props?.children?.[0] || "header" + indx;
        }
        if (typeof children === "string") {
          content = children;
        }
        const hash = "header--" + slugify(content?.toLowerCase());

        result = React.createElement(
          elementName,
          {
            key: hash,
            id: hash,
            className: "PostHeader",
            ref: (element: HTMLHeadingElement) => {
              if (
                element &&
                !headers.current.find(
                  ({ element: headerElement }) => headerElement === element
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
          children
        );
      } catch (e) {
        const hash = "header--" + Date.now();
        result = React.createElement(
          elementName,
          {
            className: "PostHeader",
            key: hash,
            id: hash,
            ref: (element: HTMLHeadingElement) => {
              if (
                element &&
                !headers.current.find(
                  ({ element: headerElement }) => headerElement === element
                )
              ) {
                headers.current.push({
                  element,
                  content: "Header " + indx,
                  hash,
                  level: +elementName?.[1],
                });
              }
            },
          },
          "Header" + indx
        );
      }
      return result;
    };

    const result = {};
    // bind html headers h1 to h6
    for (let i = 1; i <= 6; i++) {
      result[`h${i}`] = HeaderComponent.bind(null, `h${i}`);
    }
    return result;
  }, [headers]);
  markdownComponents["section"] = CodeSection;
  return <HTMLComponent content={content} components={markdownComponents} />;
};
