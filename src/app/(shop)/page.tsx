import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function ({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages, currentPage } = await getPaginatedProductsWithImages({ page })

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
