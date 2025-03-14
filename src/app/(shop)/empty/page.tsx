import { Metadata } from 'next';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export async function generateMetadata(
): Promise<Metadata> {


    return {
        title: "Carrito",
        description: "Revisa los productos que has agregado al carrito",
        openGraph: {
            title: "Carrito",
            description: "Revisa los productos que has agregado al carrito",
            images: ["/imgs/starman_750x750.png"],
        }
    };
}

export default function () {
    return (
        <div className="flex justify-center items-center h-screen">

            <IoCartOutline size={80} className="mx-5" />

            <div className="flex flex-col items-center">
                <h1 className="text-xl font-semibold">
                    Tu carrito está vacío
                </h1>

                <Link
                    href='/'
                    className="text-blue-500 mt-2 text-4xl"
                >
                    Regresar
                </Link>

            </div>


        </div>
    );
}