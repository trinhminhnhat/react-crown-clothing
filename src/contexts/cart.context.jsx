import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existedCartItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existedCartItem) {
        return cartItems.map((item) => {
            if (item.id === productToAdd.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }

            return item;
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existedCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

    if (existedCartItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== cartItemToRemove.id);
    }

    return cartItems.map((item) => {
        if (item.id === cartItemToRemove.id) {
            return {
                ...item,
                quantity: item.quantity - 1,
            };
        }

        return item;
    });
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
