import { CategoryItem } from 'store/categories/categories.type';
import { ActionWithPayload, createAction, withMatcher } from 'utils/reducer';
import { CART_ACTION_TYPES, CartItem } from './cart.type';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    const existedCartItem = cartItems.find((item) => item.id === cartItemToRemove.id);

    if (existedCartItem && existedCartItem.quantity === 1) {
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

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem): CartItem[] => {
    return cartItems.filter((item) => item.id !== cartItemToClear.id);
};

type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);

    return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);

    return setCartItems(newCartItems);
};
