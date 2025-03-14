import { tittleFont } from "@/config/fonts"
import Link from "next/link"
import { IoSearchOutline } from "react-icons/io5"
import { Menu } from "./Menu"
import { Cart } from "./Cart"

export const TopMenu = () => {
    return (
        <nav className="flex px-5 justify-between items-center w-full">

            {/* Logo */}
            <div>
                <Link href='/'>
                    <span className={`${tittleFont.className} font-bold antialiased cursor-pointer`}>
                        Teslo
                    </span>
                    <span> | Shop</span>
                </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden sm:block">
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href={'/gender/men'}
                >
                    Hombres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href={'/gender/women'}
                >
                    Mujeres
                </Link>
                <Link
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    href={'/gender/kid'}
                >
                    Niños
                </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center">

                <Link href={'/search'} className="mx-2">
                    <IoSearchOutline className="size-5" />
                </Link>

                <Cart />

                <Menu />

            </div>
        </nav>
    )
}
