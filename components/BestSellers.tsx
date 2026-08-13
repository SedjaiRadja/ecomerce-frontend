import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "./ProductCard";

const bestSellers = [
  {
    id: "1",
    name: "Robe Élégante",
    description: "Une silhouette intemporelle pensée pour le quotidien.",
    price: 12900,
    image: "/products/product-1.png",
    category: "Femme",
    stock: 8,
  },
  {
    id: "2",
    name: "Veste Structurée",
    description: "Une coupe raffinée aux lignes contemporaines.",
    price: 15900,
    image: "/products/product-2.png",
    category: "Femme",
    stock: 5,
  },
  {
    id: "3",
    name: "Chemise Classique",
    description: "Une pièce essentielle au style minimal et élégant.",
    price: 8900,
    image: "/products/product-3.png",
    category: "Homme",
    stock: 12,
  },
  {
    id: "4",
    name: "Pantalon Tailleur",
    description: "Une coupe fluide pour une allure sophistiquée.",
    price: 10900,
    image: "/products/product-4.png",
    category: "Homme",
    stock: 7,
  },
];

export default function BestSellers() {
  return (
    <section className="w-full bg-[#F3F1ED] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between sm:mb-12">
          <div>
            <p className="font-jost text-[10px] uppercase tracking-[0.35em] text-black/50 sm:text-xs">
              Sélection Allure
            </p>

            <h2 className="mt-3 font-jost text-2xl font-light uppercase tracking-[0.08em] text-black sm:text-3xl lg:text-4xl">
              Les plus aimés
            </h2>
          </div>

          <Link
            href="/products"
            className="group hidden items-center gap-2 border-b border-black pb-1 font-jost text-[10px] uppercase tracking-[0.2em] sm:inline-flex"
          >
            Voir tout
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 border-b border-black pb-1 font-jost text-[10px] uppercase tracking-[0.2em]"
          >
            Voir toute la collection
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
