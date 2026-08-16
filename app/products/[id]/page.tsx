import ProductDetails from "@/components/ProductDetails";

const products = [
  {
    id: "robe-elegante",
    name: "Robe Élégante",
    description: "Une silhouette intemporelle pensée pour le quotidien.",
    price: 12900,
    image: "/products/product-1.png",
    category: "Femme",
    stock: 8,
  },
  {
    id: "veste-structuree",
    name: "Veste Structurée",
    description: "Une coupe raffinée aux lignes contemporaines.",
    price: 15900,
    image: "/products/product-2.png",
    category: "Femme",
    stock: 5,
  },
  {
    id: "chemise-classique",
    name: "Chemise Classique",
    description: "Une pièce essentielle au style minimal et élégant.",
    price: 8900,
    image: "/products/product-3.png",
    category: "Homme",
    stock: 12,
  },
  {
    id: "pantalon-tailleur",
    name: "Pantalon Tailleur",
    description: "Une coupe fluide pour une allure sophistiquée.",
    price: 10900,
    image: "/products/product-4.png",
    category: "Homme",
    stock: 7,
  },
];

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F3F0]">
        <p className="font-jost text-sm uppercase tracking-[0.2em]">
          Produit introuvable
        </p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
