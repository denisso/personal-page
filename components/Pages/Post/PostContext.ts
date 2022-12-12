import React from "react";

export type THeadingElement = {
    element: HTMLHeadingElement;
    hash: string;
    content: string;
    level?: number;
};

export type TheadingContext = {
    setCurrent: (arg: number) => void;
    current: number;
    headers: {current: Array<THeadingElement>};
}

export const PostContext = React.createContext<TheadingContext>({
    setCurrent: () => {},
    current: 0,
    headers: {current: []}
});
