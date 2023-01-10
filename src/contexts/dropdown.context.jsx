import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducers/reducer.utils";

export const DropdownContext = createContext ({
    openCart: false,
    setOpenCart: (boolean) => {}
});

const INITIAL_STATE = {
    openCart: false
};

export const DROPDOWN_ACTION_TYPES = {
    SET_OPEN_CART: 'SET_OPEN_CART'
};

const DropdownReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case DROPDOWN_ACTION_TYPES.SET_OPEN_CART:
            return {
                ...state,
                openCart: payload
            };
        default:
            throw new Error(`unhandled type of ${type} in dropdownReducer`);
    };
};

export const DropdownProvider = ({ children }) => {
    const [{ openCart }, dispatch] = useReducer(DropdownReducer, INITIAL_STATE);

    const setOpenCart = (bool) => {
        dispatch(createAction(DROPDOWN_ACTION_TYPES.SET_OPEN_CART, bool ));
    };

    const value = {openCart, setOpenCart}
    return (
        <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>
    )
}