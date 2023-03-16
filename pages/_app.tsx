import React from "react";
import { AnimatePresence } from "framer-motion";
import { BackdropCustom } from "../components/Footer/BackdropCustom";
import ErrorBoundary from "../components/Service/ErrorBoundary";
import { AppProps } from "next/app";
import { ContextGlobalProvider } from "../components/ContextGlobal";
import { ThemeWrapper } from "../features/theme/ThemeWrapper";

import dynamic from "next/dynamic";

const Header = dynamic<{ [key: string]: any }>(() =>
  import("../components/Header").then((res) => res.Header)
);

const Footer = dynamic<{ [key: string]: any }>(() =>
  import("../components/Footer").then((res) => res.Footer)
);

const GlobalStyle = dynamic<{ [key: string]: any }>(
  () => import("../features/theme/globalStyles")
);

export default function MyApp({
  Component,
  pageProps,
}: AppProps<React.ComponentPropsWithoutRef<typeof Header>>) {
  return (
    <>
      <ContextGlobalProvider>
        <ThemeWrapper>
          <GlobalStyle />
          <Header {...pageProps} />
          <main className="MainContent">
            <ErrorBoundary message={`Error occured while page loading.`}>
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <Component {...pageProps} />
              </AnimatePresence>
            </ErrorBoundary>
          </main>

          <Footer />
          <BackdropCustom />
        </ThemeWrapper>
      </ContextGlobalProvider>
    </>
  );
}
