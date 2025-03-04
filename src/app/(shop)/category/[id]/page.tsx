import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: Category;
    };
}

export default async function ({ params }: Props) {

    const { id } = await params;

    const products = initialData.products.filter((product) => product.gender === id);

    const labels: Record<Category, string> = {
        'men': 'Hombres',
        'women': 'Mujeres',
        'kid': 'Niños',
        'unisex': 'Unisex'
    }

    if (!products.length) {
        notFound()
    }


    return (
        <>
            <Title
                title={labels[id]}
                subtitle={`Productos para ${labels[id]}`}
            />

            <ProductGrid products={products} />
        </>
    )
}
