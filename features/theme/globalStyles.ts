import { createGlobalStyle } from "styled-components";
import { base } from "./styles/base";
import { variables } from "./styles/variables";

const GlobalStyle = createGlobalStyle`
    ${variables} 
    ${base}`;

export default GlobalStyle;
