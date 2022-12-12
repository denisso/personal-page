import React from "react";

export type TIntersectionElement = {
    element: Element;
    trigger: ({
        entity,
        entities,
        unobserve,
    }: {
        entity?: IntersectionObserverEntry;
        entities?: IntersectionObserverEntry[];
        unobserve: () => void;
    }) => void;
};

export type TIntersectionMethods = {
    addElement: ({ element, trigger }: TIntersectionElement) => {
        unobserve: () => void;
    };
    removeElement: (element: Element) => void;
};

type TuseIntersectionOtions = {
    root: null | HTMLElement;
    rootMargin: string; // like "50px 0px"
    threshold: number | Array<number>; // like 0.2 or [0, 0.25, 0.5, 0.75, 1]
};

export const useIntersection = (
    options: TuseIntersectionOtions = {
        root: null,
        rootMargin: "50px 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
    }
) => {
    const refArrayElements = React.useRef<
        Map<TIntersectionElement["element"], TIntersectionElement["trigger"]>
    >(new Map());

    const refObserver = React.useRef<IntersectionObserver>();

    React.useEffect(() => {

        refObserver.current = new IntersectionObserver((entities) => {
            for (const entity of entities) {
                const { target } = entity;
                if (refArrayElements.current.has(target)) {
                    const trigger = refArrayElements.current.get(target);
                    if (trigger) {
                        trigger({
                            entity,
                            entities,
                            unobserve: () => {
                                try {
                                    refObserver.current?.unobserve(target);
                                    refArrayElements.current?.delete(target);
                                } catch (err) {}
                            },
                        });
                    }
                }
            }
        }, options);
        //
        try {
            const elements = refArrayElements.current.keys();

            while (true) {
                const element = elements.next();
                if (element.done) break;
                refObserver.current?.observe(element.value);
            }
        } catch (err) {}
    }, [options]);

    const addElement: TIntersectionMethods["addElement"] = React.useCallback(
        ({ element, trigger }) => {
            if (element !== null) {
                try {
                    if (!refArrayElements.current.get(element)) {
                        refObserver.current?.observe(element);
                        refArrayElements.current.set(element, trigger);
                    }
                } catch (err) {}
            }
            return { unobserve: () => refObserver.current?.unobserve(element) };
        },
        []
    );

    const removeElement: TIntersectionMethods["removeElement"] =
        React.useCallback((element) => {
            refObserver?.current?.unobserve(element);
            if (refArrayElements.current.has(element)) {
                refArrayElements.current.delete(element);
            }
        }, []);
    return {
        addElement,
        removeElement,
    };
};
