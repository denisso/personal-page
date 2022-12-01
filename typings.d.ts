// SVG Start
import React from "react";
declare module "assets/*.svg" {
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}
// SVG End
// MUI Start

import {
    IColors,
    ITypography,
    IBreakPoints,
} from "./features/theme/themeStyles";
import { Theme } from "@mui/material/styles/createTheme";

import "styled-components";

declare module "@mui/material/styles/createPalette" {
    export interface PaletteOptions extends IColors {}
    export interface Palette extends IColors {}
}

declare module "@mui/material/styles/createTypography" {
    export interface TypographyOptions extends ITypography {}
    export interface Typography extends ITypography {}
}

declare module "@mui/system/createTheme/createBreakpoints" {
    export interface BreakpointOverrides extends IBreakPoints {}
}

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}

// MUI End
// CSS / SCSS Start

declare module "*.scss" {
    const content: Record<string, string>;
    export default content;
}

declare module "*.css" {
    const content: Record<string, string>;
    export default content;
}

// CSS / SCSS End
