import React from "react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import store from "../store";
import GlobalStyle from "../features/theme/globalStyles";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorBoundary from "../components/Service/ErrorBoundary";
import { AppProps } from "next/app";
import { ThemeWrapper } from "../features/theme/ThemeWrapper";
import { Context } from "../components/Pages/Context";
import { useIntersection } from "../components/hooks/useIntersection";
export default function MyApp({
    Component,
    pageProps,
}: AppProps<React.ComponentPropsWithoutRef<typeof Header>>) {
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const router = useRouter();
    const { addElement } = useIntersection();
    React.useEffect(() => {
        router.events.on("routeChangeStart", () => setOpenBackDrop(true));
        router.events.on("routeChangeComplete", () => setOpenBackDrop(false));
        router.events.on("routeChangeError", () => setOpenBackDrop(false));
    }, [router]);

    return (
        <>
            <Provider store={store}>
                <Context.Provider value={{ addElement }}>
                    <ThemeWrapper>
                        <GlobalStyle />
                        <Header {...pageProps} />
                        <main className="MainContent">
                            <ErrorBoundary
                                message={`Error occured while page "${router.asPath}" loading.`}
                            >
                                <AnimatePresence
                                    exitBeforeEnter
                                    initial={false}
                                    onExitComplete={() => window.scrollTo(0, 0)}
                                >
                                    <Component
                                        {...pageProps}
                                        key={router.asPath}
                                    />
                                </AnimatePresence>
                            </ErrorBoundary>
                        </main>

                        <Footer />
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={openBackDrop}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </ThemeWrapper>
                </Context.Provider>
            </Provider>
        </>
    );
}
