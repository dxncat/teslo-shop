'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);

    const productsInCart = useCartStore(state => state.cart)
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeItem = useCartStore(state => state.removeProduct)

    useEffect(() => {
        setLoaded(true);
    });

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (

                    <div key={product.id + product.size} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />

                        <div>
                            <Link href={`/product/${product.slug}`} className='hover:underline cursor-pointer'>
                                <p>{product.size} - {product.title}</p>
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector quantity={product.quantity} setQuantity={value => updateProductQuantity(product, value)} />

                            <button className="underline mt-3 cursor-pointer" onClick={() => removeItem(product)}>
                                Remover
                            </button>
                        </div>

                    </div>

                ))
            }

        </>
    )
}
