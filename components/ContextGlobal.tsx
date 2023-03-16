import React from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../store";
import { useIntersection } from "../components/hooks/useIntersection";
import { TIntersectionMethods } from "./hooks/useIntersection";

type TContext = {
  openBackDrop: boolean;
  setOpenBackDrop: React.Dispatch<React.SetStateAction<boolean>>;
  addElement: TIntersectionMethods["addElement"];
};

const Context = React.createContext<TContext | undefined>(undefined);

interface IContextProvider {
  (props: { children: React.ReactNode }): JSX.Element;
}

export const ContextGlobalProvider: IContextProvider = ({ children }) => {
  const [openBackDrop, setOpenBackDrop] = React.useState(false);
  const { addElement } = useIntersection();
  const router = useRouter();
  React.useEffect(() => {
    router.events.on("routeChangeStart", () => setOpenBackDrop(true));
    router.events.on("routeChangeComplete", () => setOpenBackDrop(false));
    router.events.on("routeChangeError", () => setOpenBackDrop(false));
  }, [router]);
  return (
    <Provider store={store}>
      <Context.Provider value={{ openBackDrop, setOpenBackDrop, addElement }}>
        {children}
      </Context.Provider>
    </Provider>
  );
};

export const useContextGlobal = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};
