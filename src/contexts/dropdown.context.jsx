import { createContext, useState } from "react";

export const DropdownContext = createContext ({
    openCart: false,
    setOpenCart: (boolean) => {}
});

export const DropdownProvider = ({ children }) => {
    const [openCart, setOpenCart] = useState (false);
    const value = {openCart, setOpenCart}
    return (
        <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>
    )
}