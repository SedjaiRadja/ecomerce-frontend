import ProductDetails from "@/components/ProductDetails";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product: Product | null = null;

  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      product = data.product ?? data;
    }
  } catch (error) {
    console.error("Product fetch error:", error);
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F3F0] px-4 text-center">
        <p className="font-jost text-[9px] uppercase tracking-[0.25em] text-black/40">
          Produit introuvable
        </p>

        <h1 className="mt-4 font-jost text-2xl font-light uppercase tracking-[0.1em] text-black">
          Ce produit n&apos;existe pas
        </h1>

        <Link
          href="/products"
          className="mt-8 border border-black bg-black px-6 py-3 font-jost text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
        >
          Retour à la collection
        </Link>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
