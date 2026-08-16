"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [cartError, setCartError] = useState("");
  const images = [product.image, product.image, product.image, product.image];

  const [selectedImage, setSelectedImage] = useState(product.image);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const addToCart = async () => {
    if (product.stock <= 0) return;

    setIsAddingToCart(true);
    setCartMessage("");
    setCartError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product.id,
            quantity,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data || "Impossible d'ajouter au panier",
        );
      }

      setCartMessage("Produit ajouté au panier");
    } catch (error) {
      setCartError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setIsAddingToCart(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#F5F3F0] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          href="/products"
          className="group mb-8 inline-flex items-center gap-2 font-jost text-[10px] uppercase tracking-[0.2em] text-black"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            strokeWidth={1.2}
          />
          Retour à la collection
        </Link>

        {/* Main */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ================= IMAGE GALLERY ================= */}

          <div className="grid grid-cols-[72px_1fr] gap-3 sm:grid-cols-[90px_1fr]">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Voir l'image ${index + 1}`}
                  className={`relative aspect-[3/4] overflow-hidden border transition-all duration-300 ${
                    selectedImage === image && index === 0
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="90px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#C8C5C0]">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* Category */}
              <div className="absolute left-4 top-4">
                <span className="bg-[#F5F3F0]/90 px-3 py-1.5 font-jost text-[8px] uppercase tracking-[0.2em] text-black backdrop-blur-sm">
                  {product.category}
                </span>
              </div>
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}

          <div className="flex flex-col justify-center py-2 lg:py-10">
            {/* Category */}
            <p className="font-jost text-[9px] uppercase tracking-[0.25em] text-black/40">
              {product.category}
            </p>

            {/* Name */}
            <h1 className="mt-3 max-w-xl font-jost text-3xl font-light uppercase tracking-[0.08em] text-black sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-6 font-jost text-xl tracking-wide text-black sm:text-2xl">
              {product.price.toLocaleString("fr-FR")} DA
            </p>

            {/* Divider */}
            <div className="my-7 h-px w-full bg-black/10" />

            {/* Description */}
            <div>
              <p className="font-jost text-[10px] uppercase tracking-[0.2em] text-black/40">
                Description
              </p>

              <p className="mt-3 max-w-lg font-jost text-sm leading-7 text-black/60">
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  product.stock > 0 ? "bg-black" : "bg-black/20"
                }`}
              />

              <p className="font-jost text-[9px] uppercase tracking-[0.18em] text-black/50">
                {product.stock > 0
                  ? `${product.stock} pièces disponibles`
                  : "Rupture de stock"}
              </p>
            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="mt-8">
                <p className="mb-3 font-jost text-[9px] uppercase tracking-[0.2em] text-black/40">
                  Quantité
                </p>

                <div className="flex h-11 w-32 items-center justify-between border border-black/15">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-full w-10 items-center justify-center text-black transition-opacity disabled:opacity-30"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={1.2} />
                  </button>

                  <span className="font-jost text-xs">{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="flex h-full w-10 items-center justify-center text-black transition-opacity disabled:opacity-30"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.2} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {/* Add to cart */}
              <button
                type="button"
                onClick={addToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className="
    group
    flex
    min-h-12
    flex-1
    items-center
    justify-center
    gap-3
    border
    border-black
    bg-black
    px-5
    font-jost
    text-[9px]
    uppercase
    tracking-[0.2em]
    text-white
    transition-all
    duration-300
    hover:bg-transparent
    hover:text-black
    disabled:cursor-not-allowed
    disabled:opacity-40
  "
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.2} />

                {isAddingToCart ? "Ajout..." : "Ajouter au panier"}
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="Ajouter aux favoris"
                className={`
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  border
                  border-black/15
                  transition-all
                  duration-300
                  sm:w-14
                  ${
                    isFavorite
                      ? "bg-black text-white"
                      : "bg-transparent text-black hover:bg-black hover:text-white"
                  }
                `}
              >
                <Heart
                  className="h-4 w-4"
                  strokeWidth={1.2}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Additional information */}
            <div className="mt-10 border-t border-black/10">
              <div className="flex items-center justify-between border-b border-black/10 py-5">
                <span className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/50">
                  Livraison
                </span>

                <span className="font-jost text-[10px] text-black">
                  Livraison disponible
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-black/10 py-5">
                <span className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/50">
                  Retours
                </span>

                <Link
                  href="/contact"
                  className="group flex items-center gap-1.5 font-jost text-[10px] text-black"
                >
                  En savoir plus
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1.2}
                  />
                </Link>
              </div>

              <div className="flex items-center justify-between py-5">
                <span className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/50">
                  Catégorie
                </span>

                <span className="font-jost text-[10px] text-black">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
