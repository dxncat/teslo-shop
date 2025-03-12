'use client';

import { QuantitySelector, SizeSelector } from "@/components"
import type { CartItem, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addToCart)

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState('')

    const AddToCart = () => {
        if (!size) {
            setError('Debes seleccionar una talla')
            return
        }

        const cartProduct: CartItem = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }

        addProductToCart(cartProduct);
        setError('')
        setQuantity(1)
        setSize(undefined)
    }

    return (
        <>
            <span className="mt-2 text-red-500 fade-in">{error}</span>

            {/* Selector de Tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChange={setSize}
            />


            {/* Selector de Cantidad */}
            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
            />


            {/* Button */}
            <button onClick={AddToCart} className="btn-primary my-5">
                Agregar al carrito
            </button>
        </>
    )
}
