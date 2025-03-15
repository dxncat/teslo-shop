"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export const ProductsSummary = () => {

    const router = useRouter();
    const cart = useCartStore(state => state.cart);

    const [loaded, setLoaded] = useState(false);

    const getSummaryInformation = () => {
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
    };

    useEffect(() => {
        const items = getSummaryInformation();

        if (items.itemsInCart === 0 && loaded === true) {
            router.replace('/empty');
        }

        setLoaded(true);
    }, [loaded]);

    if (!loaded) return <p>Loading...</p>;

    const summary = getSummaryInformation();

    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{summary.itemsInCart} artículos</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(summary.subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(summary.tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(summary.total)}</span>
        </div>
    );
};