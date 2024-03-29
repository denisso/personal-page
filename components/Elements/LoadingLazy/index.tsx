import React from "react";
import { Skeleton, SkeletonProps } from "@mui/material";
import styled from "styled-components";
import { Context as ContextLoad } from "./Context";
import { useContextGlobal } from "../../ContextGlobal";

const Container = styled("div")`
    position: relative;

    .hidden {
        opacity: 0;
    }

    .skeleton {
        height: 100%;
        transition: opacity var(--transition), height var(--transition);
    }
`;

const SNotIntersected = 0;
const SIntersected = 1;
const SLoadError = 2;
const SLoadSuccess = 3;
const SHideSkeleton = 4;

/**
 * skeletonClassName specify height skeleton
 */
type TLoadingLazyProps = SkeletonProps & {
    className: string;
};

export const LoadingLazy = ({
    variant = "rectangular",
    animation = "wave",
    className,
    children,
}: TLoadingLazyProps) => {
    const [client, setClient] = React.useState(false);
    const ref = React.useRef<Element>();
    const { addElement } = useContextGlobal();
    const [state, setState] = React.useState(SNotIntersected);
    const unobserve = React.useRef<ReturnType<typeof addElement>>();
    React.useEffect(() => {
        setClient(true);
        return () => {
            if (unobserve.current instanceof Function) {
                try {
                    unobserve.current();
                } catch (err) {}
            }
        };
    }, []);
    const onload = React.useCallback(({ load }) => {
        if (load) {
            setState(SLoadSuccess);
        } else {
            setState(SLoadError);
        }
    }, []);
    const trigger = React.useCallback(({ entity, unobserve }) => {
        if (entity.isIntersecting) {
            unobserve();
            setState(SIntersected);
        }
    }, []);

    const childRef = React.useRef<Element>();

    React.useEffect(() => {
        if (childRef.current instanceof HTMLElement) {
            if (state >= SLoadSuccess) {
                setState(SHideSkeleton);
            }
        }
    }, [state]);

    return (
        <ContextLoad.Provider
            value={{
                onload,
            }}
        >
            <Container
                /* class set only height, i do not make prop height because css more useful with media queries */
                className={className}
                ref={(element) => {
                    if (element && !ref.current) {
                        ref.current = element;
                        unobserve.current = addElement({ element, trigger });
                    }
                }}
            >
                <>
                    {client ? (
                        <>
                            {state < SHideSkeleton && (
                                <Skeleton
                                    variant={variant}
                                    animation={animation}
                                    className={`skeleton ${
                                        state >= SLoadSuccess ? "hidden" : ""
                                    }`}
                                />
                            )}

                            {state >= SIntersected ? <>{children}</> : <></>}
                        </>
                    ) : (
                        <>{children}</>
                    )}
                </>
            </Container>
        </ContextLoad.Provider>
    );
};
