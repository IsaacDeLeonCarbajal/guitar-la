import { useMemo } from "react";

import type { Cart as CartType, Item as ItemType } from "../Types/models";

export const useCart = (cart: CartType, setCart: React.Dispatch<React.SetStateAction<CartType>>) => {
    const addItemToCart = (item: ItemType) => {
        if (Object.hasOwn(cart, item.id))
            return;

        setCart(() => ({
            ...cart,
            [item.id]: {
                ...item,
                quantity: 1,
            },
        }));
    }

    const removeItemFromCart = (id: ItemType['id']) => {
        if (!Object.hasOwn(cart, id))
            return;

        const updatedCart = { ...cart };

        delete updatedCart[id];

        setCart(() => updatedCart);
    }

    const updateQuantityBy = (id: ItemType['id'], amount: number) => {
        if (!Object.hasOwn(cart, id))
            return;

        const item = { ...cart[id] };

        item.quantity += amount;

        if (item.quantity < 1 || item.quantity > 5)
            return;

        setCart(() => ({
            ...cart,
            [item.id]: item,
        }));
    }

    const clearCart = () => {
        setCart([]);
    }

    const cartTotal = useMemo(() => {
        return Object.values(cart).reduce((prev, curr) => prev += (curr.price * curr.quantity), 0);
    }, [cart]);

    const isEmpty = useMemo(() => {
        return Object.keys(cart).length == 0;
    }, [cart]);

    return {
        addItemToCart,
        removeItemFromCart,
        updateQuantityBy,
        clearCart,
        cartTotal,
        isEmpty,
    };
}
