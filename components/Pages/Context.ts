import React from "react";
import { TIntersectionMethods } from "../hooks/useIntersection";
export const Context = React.createContext<{
    addElement: TIntersectionMethods["addElement"];
}>({ addElement: () => null});
