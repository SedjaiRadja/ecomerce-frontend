"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

type EcommerceProductCardProps = {
  product: Product;
  isNew?: boolean;
  theme?: "default" | "home";
};

export default function EcommerceProductCard({
  product,
  isNew = false,
  theme = "default",
}: EcommerceProductCardProps) {
  const { addToCart } = useCart();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  const isHomeTheme = theme === "home";

  const handleAddToCart = async () => {
    if (product.stock <= 0 || adding) return;

    try {
      setAdding(true);
      setError(false);

      await addToCart(product._id, 1);

      setAdded(true);
      window.setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier :", err);
      setError(true);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card className="group/card flex w-full min-w-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none">
      {/* Product image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#E8E2D9]">
        <Link
          href={`/products/${product._id}`}
          aria-label={`Voir ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "transition-transform duration-500 group-hover/card:scale-[1.03]",
              isHomeTheme
                ? "object-contain p-3 sm:p-5"
                : "object-cover"
            )}
          />
        </Link>

        {isNew && (
          <span className="pointer-events-none absolute left-2 top-2 z-10 bg-[#F8F6F2]/95 px-2 py-1 font-inter text-[7px] uppercase tracking-[0.18em] text-[#292722] sm:left-3 sm:top-3 sm:text-[9px]">
            Nouveau
          </span>
        )}

        <button
          type="button"
          aria-label={
            isWishlisted
              ? "Retirer des favoris"
              : "Ajouter aux favoris"
          }
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((value) => !value)}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-transform hover:scale-105 sm:right-3 sm:top-3"
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isWishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-[#292722]"
            )}
            strokeWidth={1.3}
          />
        </button>

        <Link
          href={`/products/${product._id}`}
          aria-label={`Découvrir ${product.name}`}
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5 sm:bottom-3 sm:right-3"
        >
          <ArrowUpRight
            className="h-4 w-4 text-[#292722]"
            strokeWidth={1.2}
          />
        </Link>
      </div>

      {/* Product information */}
      <CardContent className="flex min-w-0 flex-1 flex-col space-y-2 border-b border-[#E8E2D9] px-0 pb-3 pt-3 sm:pb-4 sm:pt-4">
        <p className="truncate font-inter text-[8px] uppercase tracking-[0.18em] text-[#292722]/50 sm:text-[9px]">
          {product.category}
        </p>

        <div className="flex min-w-0 items-start justify-between gap-2">
          <Link
            href={`/products/${product._id}`}
            className="min-w-0 flex-1"
          >
            <h3 className="line-clamp-2 font-inter text-[11px] font-medium leading-5 text-[#292722] sm:text-sm">
              {product.name}
            </h3>
          </Link>

          <span className="shrink-0 whitespace-nowrap font-inter text-[10px] font-medium text-[#292722] sm:text-sm">
            {product.price.toLocaleString("fr-FR")} DA
          </span>
        </div>

        <p className="line-clamp-2 min-h-7 font-inter text-[9px] leading-4 text-[#292722]/55 sm:text-[10px]">
          {product.description}
        </p>
      </CardContent>

      {/* Add to cart */}
      <CardFooter className="flex-col items-stretch gap-2 px-0 pb-0 pt-3">
        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={adding || product.stock <= 0}
          className={cn(
            "h-9 w-full cursor-pointer rounded-none border px-2 font-inter text-[8px] font-normal uppercase tracking-[0.08em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:text-[9px] sm:tracking-[0.14em]",
            added
              ? "border-[#52745B] bg-[#52745B] text-white hover:bg-[#52745B]"
              : "border-[#292722] bg-[#292722] text-white hover:bg-[#1f1d1a]"
          )}
        >
          <ShoppingBag
            className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
            strokeWidth={1.3}
          />

          <span className="truncate">
            {product.stock <= 0
              ? "Rupture de stock"
              : adding
                ? "Ajout..."
                : added
                  ? "Ajouté ✓"
                  : "Ajouter au panier"}
          </span>
        </Button>

        {error && (
          <p role="alert" className="text-xs text-red-600">
            Impossible d&apos;ajouter le produit. Réessaie.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}