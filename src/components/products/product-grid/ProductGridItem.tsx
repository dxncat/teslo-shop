'use client';

import { Product } from "@/interfaces";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    return (
        <Link
            href={`/product/${product.slug}`}
        >
            <div className="rounded-md overflow-hidden fade-in">
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover rounded"
                    width={500}
                    height={500}
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
                <div className="p-4 flex flex-col">
                    <span className="hover:text-blue-700"> {product.title}</span>
                    <span className="font-bold">${product.price}</span>
                </div>
            </div>
        </Link>
    )
}
