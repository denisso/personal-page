import { createTheme } from "@mui/material/styles";
import { grey, blue, blueGrey, indigo } from "@mui/material/colors";
import { reverseColors } from "./themeUtils";
import { stylizeMuiButton } from "./Components/Button";
import { stylizeMuiInput } from "./Components/Input";
export const colors: TColors = {
    colorRoot: "white",
    color1: grey,
    color2: blue,
    color3: blueGrey,
    color4: indigo,
};

export const colorsDark: TColors = {
    colorRoot: "#1a1916",
    color1: reverseColors(colors.color1),
    color2: reverseColors(colors.color2),
    color3: reverseColors(colors.color3),
    color4: reverseColors(colors.color4),
};

export interface IBreakPoints {
    xs1: any;
    xs2: any;
    xs3: any;
    sm1: any;
}

const breakpoints = {
    values: {
        xs: 0,
        xs1: 300,
        xs2: 400,
        xs3: 500,
        sm: 600,
        sm1: 750,
        md: 900,
        lg: 1200,
        xl: 1536,
    },
};

export interface ITypography {
    font1: string;
    font2: string;
    fontSourceCode: string;
}

const style = {
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
    transitions: { duration: { standard: 500 } },
    breakpoints,
    typography: {
        pxToRem: () => `1rem`,
        font1: `'IBM Plex Sans', sans-serif`,
        font2: `'Comfortaa', cursive`,
        fontSourceCode: `'Source Code Pro', monospace`,
        fontFamily: `'Comfortaa', cursive`,
    },
};

export type TColor = {
    [key: string]: string;
};

export type TColors = {
    colorRoot: string;
    color1: TColor;
    color2: TColor;
    color3: TColor;
    color4: TColor;
};

export interface IColors {
    colorRoot: string;
    colorText: string;
    color1: TColor;
    color2: TColor;
    color3: TColor;
    color4: TColor;
}

export const light = createTheme({
    palette: {
        mode: "light",
        colorRoot: colors.colorRoot,
        colorText: colors.color1[900],
        color1: colors["color1"],
        color2: colors["color2"],
        color3: colors["color3"],
        color4: colors["color4"],
    },
    ...style,
    components: {
        ...stylizeMuiButton(colors),
        ...stylizeMuiInput(colors)
    },
});

export const dark = createTheme({
    palette: {
        mode: "dark",
        colorRoot: colorsDark.colorRoot,
        colorText: colorsDark.color1[900],
        color1: colorsDark.color1,
        color2: colorsDark.color2,
        color3: colorsDark.color3,
        color4: colorsDark.color4,
    },
    ...style,
    components: {
        ...stylizeMuiButton(colorsDark),
        ...stylizeMuiInput(colorsDark)
    },
});
