export const revalidate = 60; // 60 segundos

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

import { Gender } from '@prisma/client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';



interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    // read route params
    const { gender } = await params;

    // fetch data

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: gender ?? "Producto no encontrado",
        description: `La mejor ropa para ${gender} en un solo lugar`,
        openGraph: {
            title: gender ?? "Producto no encontrado",
            description: `La mejor ropa para ${gender} en un solo lugar`,
            images: ["/imgs/starman_750x750.png"],
        },
    };
}


export default async function GenderByPage({ params, searchParams }: Props) {

    const { gender } = await params;

    const { page: pageString = '1' } = await searchParams;
    const page = parseInt(pageString);

    const { products, totalPages } = await getPaginatedProductsWithImages({
        page,
        gender: gender as Gender,
    });


    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }


    const labels: Record<string, string> = {
        'men': 'para hombres',
        'women': 'para mujeres',
        'kid': 'para niños',
        'unisex': 'para todos'
    }

    // if ( id === 'kids' ) {
    //   notFound();
    // }


    return (
        <>
            <Title
                title={`Artículos de ${labels[gender]}`}
                subtitle="Todos los productos"
                className="mb-2"
            />

            <ProductGrid
                products={products}
            />

            <Pagination totalPages={totalPages} />

        </>
    );
}