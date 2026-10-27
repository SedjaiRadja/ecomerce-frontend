
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartProvider";

export type ProductCardProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  genre?: string;
  stock: number;
};

type EcommerceProductCardProps = {
  product: ProductCardProduct;
  isNew?: boolean;
  theme?: "default" | "home";
};

export default function EcommerceProductCard({
  product,
  isNew = false,
  theme = "default",
}: EcommerceProductCardProps) {
  const { addToCart } = useCart();

  const [isFavorite, setIsFavorite] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const outOfStock = product.stock <= 0;

  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(product.price);

  const genreLabels: Record<string, string> = {
    femme: "Femme",
    homme: "Homme",
    enfant: "Enfant",
  };

  const genre = product.genre?.toLowerCase() ?? "";

  const handleAddToCart = async () => {
    if (outOfStock || adding) return;

    setAdding(true);
    setAdded(false);
    setError("");

    try {
      await addToCart(product._id, 1);
      setAdded(true);
    } catch (err) {
      console.error("Erreur lors de l'ajout au panier :", err);
      setError("Impossible d'ajouter ce produit.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden border border-[#E8E2D9] ${
        theme === "home" ? "bg-[#F8F6F2]" : "bg-white"
      }`}
    >
      {/* Image : même ratio pour toutes les cartes */}
      <div className="relative aspect-[3/4] shrink-0 overflow-hidden bg-[#F8F6F2]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 sm:p-3"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#8C8174]">
            Image indisponible
          </div>
        )}

        {isNew && (
          <span className="absolute left-2 top-2 bg-white/95 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-[#8C8174] sm:left-3 sm:top-3 sm:text-[9px]">
            Nouveau
          </span>
        )}

        {outOfStock && (
          <span className="absolute bottom-2 left-2 bg-white/95 px-2 py-1 text-[8px] uppercase tracking-wide text-[#777168]">
            Épuisé
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsFavorite((previous) => !previous)}
          aria-label={
            isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
          aria-pressed={isFavorite}
          className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#E8E2D9] bg-white/95 sm:right-3 sm:top-3 sm:h-8 sm:w-8 ${
            isFavorite ? "text-[#B49A78]" : "text-[#777168]"
          }`}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <Link
          href={`/products/${product._id}`}
          aria-label={`Voir ${product.name}`}
          className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-[#E8E2D9] bg-white/95 text-[#292722] hover:bg-[#292722] hover:text-white sm:bottom-3 sm:right-3 sm:h-8 sm:w-8"
        >
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Informations produit : espace régulier et hauteur flexible */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
        <p className="mb-1.5 truncate text-[8px] uppercase tracking-[0.16em] text-[#B49A78] sm:text-[9px]">
          {product.category}
        </p>

        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 min-w-0 flex-1 text-[11px] font-medium leading-4 text-[#292722] sm:text-xs sm:leading-5">
            {product.name}
          </h3>

          <p className="shrink-0 whitespace-nowrap pt-0.5 text-[10px] font-medium tabular-nums text-[#292722] sm:text-xs">
            {formattedPrice} DA
          </p>
        </div>

        {/* Genre : sous le nom et le prix */}
        <p className="mt-1 text-[9px] uppercase tracking-wide text-[#777168] sm:text-[10px]">
          {genreLabels[genre] ?? product.genre ?? "Collection"}
        </p>

        {/* Hauteur réservée pour aligner les boutons */}
        <p className="mt-2 line-clamp-2 min-h-8 text-[9px] leading-4 text-[#8C8174] sm:text-[10px]">
          {product.description}
        </p>
      </div>

      {/* Bouton aligné en bas de chaque carte */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={outOfStock || adding}
        className={`mt-auto flex min-h-9 w-full items-center justify-center gap-1.5 px-1.5 py-2 text-[8px] font-medium uppercase tracking-[0.08em] text-white transition-colors sm:gap-2 sm:text-[9px] sm:tracking-[0.1em] ${
          added
            ? "bg-[#52745B]"
            : outOfStock || adding
              ? "cursor-not-allowed bg-[#8C8174]"
              : "bg-[#292722] hover:bg-[#444039]"
        }`}
      >
        <ShoppingBag size={12} strokeWidth={1.5} />

        <span>
          {outOfStock
            ? "Indisponible"
            : adding
              ? "Ajout..."
              : added
                ? "Ajouté au panier"
                : "Ajouter au panier"}
        </span>
      </button>

      {error && (
        <p role="alert" className="px-2 py-1 text-center text-[9px] text-red-600">
          {error}
        </p>
      )}
    </article>
  );
}
