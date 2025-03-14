import type { CartItem } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartItem[];

    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addToCart: (product: CartItem) => void;
    updateProductQuantity: (product: CartItem, quantity: number) => void;
    removeProduct: (product: CartItem) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            // Methods
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce(
                    (subTotal, product) => product.quantity * product.price + subTotal,
                    0
                );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                );

                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart,
                };
            },

            addToCart: (product: CartItem) => {
                const { cart } = get();

                // 1. Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. Se que el producto existe por talla... tengo que incrementar
                const updatedCartItems = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity };
                    }

                    return item;
                });

                set({ cart: updatedCartItems });
            },

            updateProductQuantity: (product: CartItem, quantity: number) => {
                const { cart } = get();

                const updatedCartItems = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });

                set({ cart: updatedCartItems });
            },

            removeProduct: (product: CartItem) => {
                const { cart } = get();
                const updatedCartItems = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );

                set({ cart: updatedCartItems });
            },
        }),

        {
            name: 'cart-storage'
        }
    )
);