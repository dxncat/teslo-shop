'use client';

import { useCartStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5"

export const Cart = () => {

    const items = useCartStore(state => state.getTotalItems());
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
    }, [])


    return (
        <Link href={'/cart'} className="mx-2">
            <div className="relative">
                {
                    (loading && items > 0) && (
                        <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                            {items}
                        </span>
                    )
                }
                <IoCartOutline className="size-5" />
            </div>
        </Link>
    )
}
