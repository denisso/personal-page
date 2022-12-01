import React from "react";
import Image from "next/image";
import { Context } from "./Context";
import styled from "styled-components";
type TImageProps = {
    src?: string;
    alt: string;
    className?: string;
    path?: string;
    width?: string | number;
    height?: string | number;
};

const ImageStyled = styled(Image)`
    object-fit: contain;
    opacity: 0;
    transition: 1s opacity;
    &.visible {
        opacity: 1;
    }
`;

enum ELoad {
    Initial = 0,
    Error,
    Succes,
}

const getSRc = ({
    width,
    height,
    src,
    path,
}: {
    width: string | number;
    height: string | number;
    src: string;
    path: string;
}): string => {
    let result = "";
    if (src) {
        if (src.indexOf("//") == 0) {
            result = "https:";
        }
        result += src;
    } else if (path) {
        result = `https://res.cloudinary.com/mrdramm/image/upload/${
            width ? "w_" + width : ""
        }${height ? ",h_" + height : ""},c_limit/${path}`;
    }

    return result;
};

export const ImageLazy = ({
    src,
    alt,
    width,
    height,
    className,
    path,
}: TImageProps) => {
    const { onload } = React.useContext(Context);
    const [load, setLoad] = React.useState(ELoad.Initial);
    return (
        <ImageStyled
            src={getSRc({ width, height, src, path })}
            alt={alt}
            onLoadingComplete={() => {
                setLoad(ELoad.Succes);
                onload && onload({ load: true });
            }}
            onError={() => {
                setLoad(ELoad.Error);
                onload && onload({ load: false });
            }}
            className={`${className}${load === ELoad.Succes ? " visible" : ""}`}
            layout="fill"
        />
    );
};
