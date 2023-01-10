import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducers/reducer.utils";

export const CartContext = createContext ({
    cartItems: [],
    setCartItems: () => {},
    addItem: () => {},
    subtractItem: () => {},
    removeItem: () => {},
    totalQuantity: null,
    totalCost: 0
});

const INITIAL_STATE = {
    cartItems: [],
    totalQuantity: null,
    totalCost: 0
};

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: //set generically b/c totalQuantity & totalCost only changes when cartItems changes 
            return {
                ...state,
                ...payload
            };
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    };
};

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map( //return a newArray that maps over the previous cart
            (cartItem) => cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} //if the cart item id matches producttoadd id, just add 1 to its quantity
            : cartItem //else if unmatching map in cartItem as is
        )
    } else {
        return [...cartItems, {...productToAdd, quantity: 1}]; //if no id match, return newArray with all previous values and add a new product with quantity of 1
    }
};

const subtractCartItem = (cartItems, productToSubtract) => {
    const itemToSubtract = cartItems.find(
        (cartItem) => cartItem.id === productToSubtract.id
    );
    if (itemToSubtract.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToSubtract.id);
    } else {
        return cartItems.map(
            (cartItem) => cartItem.id === productToSubtract.id
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        )
    }
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
}

export const CartProvider = ({ children }) => {
    const [{ cartItems, totalQuantity, totalCost }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newTotalCost = newCartItems.reduce((cost, item) => cost + (item.price * item.quantity), 0);
        const newTotalQuantity = newCartItems.reduce((count, item) => count + item.quantity, 0);
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{ 
            cartItems: newCartItems, 
            totalQuantity: newTotalQuantity, 
            totalCost: newTotalCost 
        }));
    };

    const addItem = (productToAdd) => {
        const newCartItems = (addCartItem(cartItems, productToAdd));
        updateCartItemsReducer(newCartItems);
    };

    const subtractItem = (productToSubtract) => {
        const newCartItems = (subtractCartItem(cartItems, productToSubtract));
        updateCartItemsReducer(newCartItems);
    };

    const removeItem = (productToRemove) => {
        const newCartItems = (removeCartItem(cartItems, productToRemove));
        updateCartItemsReducer(newCartItems);
    };

    const value = {addItem, subtractItem, removeItem, cartItems, totalQuantity, totalCost}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};