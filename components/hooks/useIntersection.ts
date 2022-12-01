import React from "react";

export type TIntersectionNode = {
    node: Element;
    trigger: ({
        entity,
        unobserve,
    }: {
        entity?: IntersectionObserverEntry;
        unobserve: () => void;
    }) => void;
};

export type TIntersectionMethods = {
    addNode: ({ node, trigger }: TIntersectionNode) => {
        unobserve: () => void;
    };
    removeNode: (node: Element) => void;
};
export const useIntersection = () => {
    const refArrayNodes = React.useRef<
        Map<TIntersectionNode["node"], TIntersectionNode["trigger"]>
    >(new Map());

    const refObserver = React.useRef<IntersectionObserver>();

    React.useEffect(() => {
        const options = {
            root: null,
            rootMargin: "50px 0px",
            threshold: 0.2,
        };
        refObserver.current = new IntersectionObserver((entities) => {
            for (let indx = 0; indx < entities.length; indx++) {
                const { target } = entities[indx];
                if (refArrayNodes.current.has(target)) {
                    const trigger = refArrayNodes.current.get(target);
                    if (trigger) {
                        trigger({
                            entity: entities[indx],
                            unobserve: () => {
                                try {
                                    refObserver.current?.unobserve(target);
                                    refArrayNodes.current?.delete(target);
                                } catch (err) {}
                            },
                        });
                    }
                }
            }
        }, options);
        //
        try {
            const nodes = refArrayNodes.current.keys();

            while (true) {
                const node = nodes.next();
                if (node.done) break;
                refObserver.current?.observe(node.value);
            }
        } catch (err) {}
    }, []);

    const addNode: TIntersectionMethods["addNode"] = React.useCallback(
        ({ node, trigger }) => {
            if (node !== null) {
                try {
                    if (!refArrayNodes.current.get(node)) {
                        refObserver.current?.observe(node);
                        refArrayNodes.current.set(node, trigger);
                    }
                } catch (err) {}
            }
            return { unobserve: () => refObserver.current?.unobserve(node) };
        },
        []
    );

    const removeNode: TIntersectionMethods["removeNode"] = React.useCallback(
        (node) => {
            refObserver?.current?.unobserve(node);
            if (refArrayNodes.current.has(node)) {
                refArrayNodes.current.delete(node);
            }
        },
        []
    );
    return {
        addNode,
        removeNode,
    };
};
