import { createGlobalStyle } from "styled-components";
import { base } from "./styles/base";
import { variables } from "./styles/variables";
const highlight = require( "highlight.js/styles/default.css");

const GlobalStyle = createGlobalStyle`
    ${highlight}
    ${variables} 
    ${base}`;

export default GlobalStyle;
