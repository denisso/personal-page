import React from "react";
import { TIntersectionMethods } from "../hooks/useIntersection";

interface IContext {
    addElement: TIntersectionMethods["addElement"];
}

export const Context = React.createContext<IContext | null>(null);
