import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Type animation used in ItemAnimatePresence
 */
const animations = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
};

export type Props = {
    children: React.ReactNode;
    className?: string;
};

export const AnimationBox = ({ children }: Props) => {
    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            {children}
        </AnimatePresence>
    );
};

export const AnimationItem = ({ className, children }: Props) => {
    return (
        <motion.div
            className={className}
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};
