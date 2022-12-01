import React from "react";
import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import styled from "styled-components";
const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
};

const Main = styled(motion.div)`
    display: flex;
    flex-direction: column;
    padding: 0 3rem;
    ${({ theme }) => theme.breakpoints.down("md")} {
        padding: 0 2.5rem;
    }
    ${({ theme }) => theme.breakpoints.down("sm")} {
        padding: 0 2rem;
    }
    ${({ theme }) => theme.breakpoints.down("xs3")} {
        padding: 0 1.5rem;
    }
    ${({ theme }) => theme.breakpoints.down("xs2")} {
        padding: 0 1rem;
    }
    ${({ theme }) => theme.breakpoints.down("xs1")} {
        padding: 0 0.5rem;
    }
`;

export type Props = Partial<{
    children: React.ReactNode;
    title: string;
    description: string;
    className: string;
}>;

const Layout = ({ children, title, description, className }: Props) => (
    <>
        <NextSeo
            title={`${title} - Сайт React разработчика`}
            description={description}
            openGraph={{ title, description }}
        />
        <Main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: "linear" }}
            className={className}
        >
            {children}
        </Main>
    </>
);

export default Layout;
