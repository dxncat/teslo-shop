import { CartItem } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartItem[];

    addToCart: (item: CartItem) => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            addToCart: (item: CartItem) => {
                const { cart } = get();

                //revisar si el item ya existe en el carrito
                const itemIndex = cart.some(
                    (item) => (item.id === item.id && item.size === item.size)
                )

                if (!itemIndex) {
                    set({
                        cart: [...cart, item]
                    });
                    return
                }

                //si el item existe, incrementar la cantidad
                const newCart = cart.map((cartItem) => {
                    if (cartItem.id === item.id && cartItem.size === item.size) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + item.quantity
                        }
                    }
                    return cartItem;
                });

                set({
                    cart: newCart
                });
            }
        }), {
        name: 'cart-storage'
    }
    )


);