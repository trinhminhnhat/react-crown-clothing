import { createContext, useReducer } from 'react';

import { createAction } from 'utils/reducer';

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

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        };

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(state.cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(state.cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(state.cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
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
