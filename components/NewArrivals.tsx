import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

const products = [
  {
    name: "Robe Élégante",
    description: "Une silhouette intemporelle pensée pour le quotidien.",
    price: 12900,
    image: "/products/product-1.png",
    category: "Femme",
    stock: 8,
  },
  {
    name: "Veste Structurée",
    description: "Une coupe raffinée aux lignes contemporaines.",
    price: 15900,
    image: "/products/product-2.png",
    category: "Femme",
    stock: 5,
  },
  {
    name: "Chemise Classique",
    description: "Une pièce essentielle au style minimal et élégant.",
    price: 8900,
    image: "/products/product-3.png",
    category: "Homme",
    stock: 12,
  },
  {
    name: "Pantalon Tailleur",
    description: "Une coupe fluide pour une allure sophistiquée.",
    price: 10900,
    image: "/products/product-4.png",
    category: "Homme",
    stock: 7,
  },
];

export default function NewArrivals() {
  return (
    <section
      id="collection"
      className="w-full bg-[#C8C5C0] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between sm:mb-14">
          <div>
            <p className="mb-3 font-jost text-[10px] uppercase tracking-[0.35em] text-black/50 sm:text-xs">
              Nouvelle sélection
            </p>

            <h2 className="font-jost text-2xl font-light uppercase tracking-[0.12em] text-black sm:text-3xl lg:text-4xl">
              Nouveautés
            </h2>
          </div>

          <Link
            href="/products"
            className="group hidden items-center gap-2 font-jost text-[10px] uppercase tracking-[0.2em] text-black sm:flex"
          >
            Voir toute la collection
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-4 sm:gap-x-5 lg:gap-x-7">
          {products.map((product) => (
            <div key={product.name} className="group">
              {/* Image */}
              <Link href="/products">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#BDBAB5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Nouveau */}
                  <div className="absolute left-2 top-2 sm:left-4 sm:top-4">
                    <span className="bg-[#C8C5C0]/90 px-2 py-1 font-jost text-[7px] uppercase tracking-[0.18em] text-black backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[9px]">
                      Nouveau
                    </span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-3 right-3 hidden h-8 w-8 items-center justify-center rounded-full bg-[#C8C5C0]/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:flex">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.2} />
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="mb-1 font-jost text-[8px] uppercase tracking-[0.2em] text-black/40 sm:text-[9px]">
                      {product.category}
                    </p>

                    <h3 className="font-jost text-xs font-medium tracking-wide text-black sm:text-sm">
                      {product.name}
                    </h3>
                  </div>

                  <p className="whitespace-nowrap font-jost text-xs text-black sm:text-sm">
                    {product.price.toLocaleString("fr-FR")} DA
                  </p>
                </div>

                {/* Description */}
                <p className="mt-2 hidden max-w-[240px] font-jost text-[10px] leading-4 text-black/50 sm:block">
                  {product.description}
                </p>

                {/* Add to Cart */}
                <button
                  type="button"
                  className="
                  cursor-pointer
                    mt-4
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    border
                    border-black
                    bg-black
                    px-3
                    py-2.5
                    font-jost
                    text-[8px]
                    uppercase
                    tracking-[0.18em]
                    text-white
                    transition-all
                    duration-300
                    hover:bg-transparent
                    hover:text-black
                    sm:py-3
                    sm:text-[9px]
                  "
                >
                  <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.3} />
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="flex items-center gap-2 border-b border-black pb-1.5 font-jost text-[10px] uppercase tracking-[0.2em] text-black"
          >
            Voir toute la collection
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
