import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export default async function ({ params }: Props) {

    const { id } = await params;

    if (id !== 'men' && id !== 'women') {
        notFound()
    }

    return (
        <div>page {id}</div>
    )
}
