import type { Cart as CartType, Item as ItemType } from "../Types";

export type CartState = {
    items: CartType,
};

export type CartAction =
    { type: 'add', payload: { item: ItemType } } |
    { type: 'remove', payload: { id: ItemType['id'] } } |
    { type: 'update-quantity', payload: { id: ItemType['id'], amount: number } } |
    { type: 'clear' };

export const cartReducer = (state: CartState, action: CartAction) => {
    switch (action.type) {
        case 'add':
            if (Object.hasOwn(state.items, action.payload.item.id))
                return state;

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.item.id]: {
                        ...action.payload.item,
                        quantity: 1,
                    },
                },
            };
        case 'remove': {
            if (!Object.hasOwn(state.items, action.payload.id))
                return state;

            const updatedCart = { ...state.items };

            delete updatedCart[action.payload.id];

            return {
                ...state,
                items: updatedCart,
            };
        }
        case 'update-quantity': {
            if (!Object.hasOwn(state.items, action.payload.id))
                return state;

            const item = { ...state.items[action.payload.id] };

            item.quantity += action.payload.amount;

            if (item.quantity < 1 || item.quantity > 5)
                return state;

            return {
                ...state,
                items: {
                    ...state.items,
                    [item.id]: item,
                }
            }
        }
        case 'clear':
            return {
                items: {},
            };
    }
}
