import React from "react";
import { NavMenuDynamic } from "./NavMenuDynamic";
import { NavMenuStatic } from "./NavMenuStatic";
type Props = {
    className: string;
};

export const NavMenu = ({ className }: Props) => {
    const [client, setClient] = React.useState(false);
    React.useEffect(() => {
        setClient(true);
    }, []);
    
    return (
        <>
            {client ? (
                <NavMenuDynamic className={className} />
            ) : (
                <NavMenuStatic className={className} />
            )}
        </>
    );
};
