"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

type ProductCardProps = {
  product: Product;
  isNew?: boolean;
};

export default function ProductCard({
  product,
  isNew = false,
}: ProductCardProps) {
  return (
    <div className="group">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#BDBAB5]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {isNew && (
            <div className="absolute left-2 top-2 z-10 sm:left-4 sm:top-4">
              <span className="bg-[#C8C5C0]/90 px-2 py-1 font-jost text-[7px] uppercase tracking-[0.18em] text-black backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[9px]">
                Nouveau
              </span>
            </div>
          )}

          <div className="absolute bottom-3 right-3 hidden h-8 w-8 items-center justify-center rounded-full bg-[#C8C5C0]/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:flex">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.2} />
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex min-h-[175px] flex-col pt-4 sm:min-h-[185px]">
        {/* Category + Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <div>
            {/* Category */}
            <p className="mb-1 font-jost text-[8px] uppercase tracking-[0.2em] text-black/40 sm:text-[9px]">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="font-jost text-xs font-medium tracking-wide text-black sm:text-sm">
              {product.name}
            </h3>
          </div>

          {/* Price */}
          <p className="whitespace-nowrap font-jost text-xs text-black sm:text-sm">
            {product.price.toLocaleString("fr-FR")} DA
          </p>
        </div>

        {/* Description */}
        <p className="mt-2 min-h-[32px] max-w-[240px] font-jost text-[9px] leading-4 text-black/50 sm:min-h-[40px] sm:text-[10px] sm:leading-4">
          {product.description}
        </p>

        {/* Add to Cart */}
        <button
          type="button"
          className="
            mt-auto
            flex
            w-full
            cursor-pointer
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
  );
}
