import { createContext, useState } from "react";

export const CartContext = createContext ({
    cartItems: [],
    setCartItems: () => {},
    addItem: () => {},
    subtractItem: () => {},
    removeItem: () => {},
    totalQuantity: null,
    totalCost: null
});

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
    const [cartItems, setCartItems] = useState([]);

    const addItem = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const subtractItem = (productToSubtract) => {
        setCartItems(subtractCartItem(cartItems, productToSubtract));
    }

    const removeItem = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const totalCost = cartItems.reduce((cost, item) => cost + (item.price * item.quantity), 0);

    const totalQuantity = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = {addItem, subtractItem, removeItem, cartItems, totalQuantity, totalCost}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}