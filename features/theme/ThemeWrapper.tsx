import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, switchMode } from "./themeSlice";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", function (e) {
                dispatch(
                    switchMode({ themeName: e.matches ? "dark" : "light" })
                );
            });
        const themeName: string =
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

        dispatch(switchMode({ themeName }));
    }, [dispatch]);
    const theme = useSelector(selectTheme);
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
