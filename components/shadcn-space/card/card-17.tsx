"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/CartProvider";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
};

type EcommerceProductCardProps = {
  product: Product;
  isNew?: boolean;
};

export default function EcommerceProductCard({
  product,
  isNew = false,
}: EcommerceProductCardProps) {
  const { addToCart } = useCart();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

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
  console.log("Product images:", product.images);
  return (
    <Card className="group/card flex h-full w-full min-w-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-transparent p-0 shadow-none">
      {/* Editorial product image */}
      <div className="relative aspect-[3/4] shrink-0 overflow-hidden bg-[#E8E2D9]">
        <Link
          href={`/products/${product._id}`}
          aria-label={`Voir ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.images?.[0] || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
          />
        </Link>

        {/* Signature detail */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#292722]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

        <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-[#B49A78] transition-all duration-500 group-hover/card:w-full" />

        {isNew && (
          <span className="absolute left-2 top-2 bg-[#F8F6F2] px-2 py-1.5 font-inter text-[9px] uppercase tracking-[0.12em] text-[#292722] sm:left-3 sm:top-3 sm:px-3">
            Nouveau
          </span>
        )}

        <button
          type="button"
          aria-label={
            isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"
          }
          aria-pressed={isWishlisted}
          onClick={() => setIsWishlisted((value) => !value)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F6F2]/95 text-[#292722] transition-all duration-200 hover:bg-white sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted ? "fill-[#292722] text-[#292722]" : "text-[#292722]",
            )}
            strokeWidth={1.4}
          />
        </button>

        <Link
          href={`/products/${product._id}`}
          aria-label={`Découvrir ${product.name}`}
          className="absolute bottom-3 right-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-[#F8F6F2]/95 text-[#292722] opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 sm:h-9 sm:w-9"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.3} />
        </Link>
      </div>

      {/* Product information */}
      <CardContent className="flex flex-col gap-2 px-1.5 pb-3 pt-3 sm:gap-2.5 sm:px-3 sm:pb-4 sm:pt-4">
        <p className="truncate font-inter text-[9px] uppercase tracking-[0.14em] text-[#292722]/60 sm:text-[10px] sm:tracking-[0.16em]">
          {product.category}
        </p>

        <div className="grid min-h-[42px] grid-cols-[minmax(0,1fr)_auto] items-start gap-1.5 sm:min-h-[48px] sm:gap-3">
          <Link href={`/products/${product._id}`} className="min-w-0">
            <h3 className="line-clamp-2 font-playfair text-[13px] leading-[1.45] text-[#292722] transition-colors duration-200 group-hover/card:text-[#52745B] sm:text-base">
              {product.name}
            </h3>
          </Link>

          <span className="whitespace-nowrap pt-0.5 font-inter text-[10px] font-medium tabular-nums text-[#292722] sm:text-sm">
            {product.price.toLocaleString("fr-FR")} DA
          </span>
        </div>

        <p className="line-clamp-2 min-h-[34px] font-inter text-[10px] leading-[1.7] text-[#292722]/65 sm:min-h-[40px] sm:text-xs">
          {product.description}
        </p>

        <div className="mt-0.5 h-px w-8 bg-[#B49A78] transition-all duration-300 group-hover/card:w-14" />
      </CardContent>

      {/* Aligned footer */}
      <CardFooter className="mt-auto flex-col items-stretch gap-2 px-1.5 pb-1 sm:gap-2.5 sm:px-3 sm:pb-1">
        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={adding || product.stock <= 0}
          className={cn(
            "flex h-9 w-full min-w-0 items-center justify-center gap-1 rounded-none border px-1.5 font-inter text-[10px] font-normal normal-case tracking-normal transition-colors duration-200 sm:h-10 sm:gap-2 sm:px-3 sm:text-xs",
            added
              ? "border-[#52745B] bg-[#52745B] text-white hover:bg-[#52745B]"
              : product.stock <= 0
                ? "cursor-not-allowed border-[#E8E2D9] bg-[#E8E2D9] text-[#292722]/60"
                : "border-[#292722] bg-[#292722] text-white hover:border-[#52745B] hover:bg-[#52745B]",
          )}
        >
          <ShoppingBag
            className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
            strokeWidth={1.4}
          />

          <span className="min-w-0 truncate">
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
          <p
            role="alert"
            className="px-1 font-inter text-[10px] leading-relaxed text-red-700 sm:text-xs"
          >
            Impossible d&apos;ajouter le produit. Réessaie.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
