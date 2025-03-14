'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image'
import Link from 'next/link';

export const ProductsInCart = () => {

    const productsInCart = useCartStore(state => state.cart)

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
                            <QuantitySelector quantity={3} setQuantity={value => console.log(value)} />

                            <button className="underline mt-3">
                                Remover
                            </button>
                        </div>

                    </div>

                ))
            }
        </>
    )
}
