"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

type Product = {
  _id: string;
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
  theme?: "default" | "home";
};

export default function ProductCard({
  product,
  isNew = false,
  theme = "default",
}: ProductCardProps) {
  const { addToCart } = useCart();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const isHomeTheme = theme === "home";

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;

    try {
      setAdding(true);

      console.log("PRODUCT SENT TO CART:", {
        id: product._id,
        name: product.name,
        quantity: 1,
      });

      await addToCart(product._id, 1);

      console.log("Produit ajouté au panier");

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="w-full">
      <Link
        href={`/products/${product._id}`}
        className={`group relative block aspect-[3/4] overflow-hidden ${
          isHomeTheme ? "bg-[#E8E2D9]" : "bg-[#C8C5C0]"
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {isNew && (
          <div className="absolute left-2 top-2 z-10 sm:left-4 sm:top-4">
            <span className="bg-[#F8F6F2]/90 px-2 py-1 font-inter text-[7px] uppercase tracking-[0.18em] text-[#292722] backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[9px]">
              Nouveau
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 hidden h-8 w-8 items-center justify-center rounded-full bg-[#FFFFFF]/90 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:flex">
          <ArrowUpRight className="h-4 w-4 text-[#292722]" strokeWidth={1.2} />
        </div>
      </Link>

      <div className="flex min-h-[175px] flex-col pt-4 sm:min-h-[185px]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="mb-1 font-inter text-[8px] uppercase tracking-[0.2em] text-[#292722]/45 sm:text-[9px]">
              {product.category}
            </p>

            <Link href={`/products/${product._id}`}>
              <h3 className="font-inter text-xs font-medium tracking-wide text-[#292722] sm:text-sm">
                {product.name}
              </h3>
            </Link>
          </div>

          <p className="whitespace-nowrap font-inter text-xs text-[#292722] sm:text-sm">
            {product.price.toLocaleString("fr-FR")} DA
          </p>
        </div>

        <p className="mt-2 min-h-[32px] max-w-[240px] font-inter text-[9px] leading-4 text-[#292722]/60 sm:min-h-[40px] sm:text-[10px] sm:leading-4">
          {product.description}
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={adding || product.stock <= 0}
          className={`mt-auto flex w-full cursor-pointer items-center justify-center gap-2 border px-3 py-2.5 font-inter text-[8px] uppercase tracking-[0.18em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-[9px] ${
            added
              ? "border-[#52745B] bg-[#52745B] text-[#FFFFFF]"
              : "border-[#292722] bg-[#292722] text-[#FFFFFF] hover:bg-[#1f1d1a]"
          }`}
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.3} />

          {product.stock <= 0
            ? "Rupture de stock"
            : adding
              ? "Ajout..."
              : added
                ? "Ajouté ✓"
                : "Ajouter au panier"}
        </button>
      </div>
    </div>
  );
}
