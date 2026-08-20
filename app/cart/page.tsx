"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const {
    items,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleDecrease = async (
    productId: string,
    quantity: number,
  ) => {
    if (quantity <= 1) {
      await removeFromCart(productId);
      return;
    }

    await updateQuantity(productId, quantity - 1);
  };

  const handleIncrease = async (
    productId: string,
    quantity: number,
    stock: number,
  ) => {
    if (quantity >= stock) return;

    await updateQuantity(productId, quantity + 1);
  };

  /*
   * =========================
   * LOADING
   * =========================
   */

  if (loading && items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F3F0]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border border-black/10 border-t-black" />

            <p className="font-jost text-[9px] uppercase tracking-[0.3em] text-black/40">
              Chargement du panier
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * =========================
   * EMPTY CART
   * =========================
   */

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F3F0] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">

          {/* HEADER */}

          <header className="border-b border-black/10 pb-6">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 font-jost text-[9px] uppercase tracking-[0.2em] text-black/50 transition-colors hover:text-black"
            >
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                strokeWidth={1.2}
              />

              Retour à la collection
            </Link>
          </header>

          {/* EMPTY */}

          <div className="flex flex-1 items-center justify-center py-20">
            <div className="max-w-md text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-black/10">
                <ShoppingBag
                  className="h-6 w-6 text-black/50"
                  strokeWidth={1}
                />
              </div>

              <p className="mt-8 font-jost text-[9px] uppercase tracking-[0.3em] text-black/40">
                Votre sélection
              </p>

              <h1 className="mt-4 font-jost text-3xl font-light uppercase tracking-[0.12em] text-black sm:text-4xl">
                Votre panier est vide
              </h1>

              <p className="mx-auto mt-5 max-w-sm font-jost text-xs leading-6 text-black/45">
                Découvrez notre collection et trouvez les pièces pensées
                pour accompagner votre style.
              </p>

              <Link
                href="/products"
                className="group mt-8 inline-flex min-h-12 items-center gap-3 border border-black bg-black px-7 font-jost text-[9px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
              >
                Découvrir la collection

                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.2}
                />
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * =========================
   * CART
   * =========================
   */

  return (
    <main className="min-h-screen bg-[#F5F3F0] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <header className="border-b border-black/10 pb-8">

          <Link
            href="/products"
            className="group mb-8 inline-flex items-center gap-2 font-jost text-[9px] uppercase tracking-[0.22em] text-black/50 transition-colors hover:text-black"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.2}
            />

            Retour à la collection
          </Link>

          <div className="flex items-end justify-between gap-5">

            <div>
              <p className="font-jost text-[9px] uppercase tracking-[0.3em] text-black/40">
                Votre sélection
              </p>

              <h1 className="mt-3 font-jost text-3xl font-light uppercase tracking-[0.13em] text-black sm:text-4xl lg:text-5xl">
                Votre panier
              </h1>
            </div>

            <div className="text-right">
              <p className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/35">
                {totalItems}{" "}
                {totalItems > 1 ? "articles" : "article"}
              </p>
            </div>

          </div>
        </header>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mt-6 border border-black/10 bg-black px-5 py-4">
            <p className="font-jost text-[9px] uppercase tracking-[0.15em] text-white">
              {error}
            </p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_370px] lg:gap-16">

          {/* ================================================== */}
          {/* ITEMS */}
          {/* ================================================== */}

          <section>

            {/* TOP BAR */}

            <div className="flex items-center justify-between border-b border-black/10 pb-4">

              <p className="font-jost text-[9px] uppercase tracking-[0.22em] text-black/40">
                Articles sélectionnés
              </p>

              <button
                type="button"
                onClick={() => clearCart()}
                disabled={loading}
                className="font-jost text-[9px] uppercase tracking-[0.15em] text-black/40 underline underline-offset-4 transition-colors hover:text-black disabled:opacity-30"
              >
                Vider le panier
              </button>

            </div>

            {/* PRODUCTS */}

            <div className="divide-y divide-black/10">

              {items.map((item) => {

                if (typeof item.product === "string") {
                  return null;
                }

                const product = item.product;

                const itemTotal =
                  product.price * item.quantity;

                return (
                  <article
                    key={item._id ?? product._id}
                    className="flex gap-4 py-7 sm:gap-6 sm:py-8"
                  >

                    {/* IMAGE */}

                    <Link
                      href={`/products/${product._id}`}
                      className="group relative block h-32 w-24 shrink-0 overflow-hidden bg-[#C8C5C0] sm:h-44 sm:w-32"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 96px, 128px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </Link>

                    {/* INFO */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between">

                      <div>

                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0">

                            <p className="mb-1.5 font-jost text-[8px] uppercase tracking-[0.22em] text-black/35">
                              {product.category}
                            </p>

                            <Link
                              href={`/products/${product._id}`}
                              className="font-jost text-sm font-medium tracking-wide text-black transition-opacity hover:opacity-50 sm:text-base"
                            >
                              {product.name}
                            </Link>

                          </div>

                          <p className="shrink-0 font-jost text-xs text-black sm:text-sm">
                            {itemTotal.toLocaleString("fr-FR")} DA
                          </p>

                        </div>

                        <p className="mt-2 hidden max-w-md font-jost text-[10px] leading-5 text-black/40 sm:block">
                          {product.description}
                        </p>

                      </div>

                      {/* BOTTOM */}

                      <div className="mt-5 flex items-center justify-between gap-4">

                        {/* QUANTITY */}

                        <div className="flex h-9 items-center border border-black/15">

                          <button
                            type="button"
                            onClick={() =>
                              handleDecrease(
                                product._id,
                                item.quantity,
                              )
                            }
                            disabled={loading}
                            className="flex h-full w-9 items-center justify-center text-black transition-opacity hover:opacity-50 disabled:opacity-30"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus
                              className="h-3 w-3"
                              strokeWidth={1.2}
                            />
                          </button>

                          <span className="flex w-8 items-center justify-center font-jost text-[10px] text-black">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleIncrease(
                                product._id,
                                item.quantity,
                                product.stock,
                              )
                            }
                            disabled={
                              loading ||
                              item.quantity >= product.stock
                            }
                            className="flex h-full w-9 items-center justify-center text-black transition-opacity hover:opacity-50 disabled:opacity-30"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus
                              className="h-3 w-3"
                              strokeWidth={1.2}
                            />
                          </button>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(product._id)
                          }
                          disabled={loading}
                          className="group flex items-center gap-1.5 font-jost text-[8px] uppercase tracking-[0.16em] text-black/35 transition-colors hover:text-black disabled:opacity-30"
                        >
                          <Trash2
                            className="h-3 w-3"
                            strokeWidth={1.2}
                          />

                          <span className="hidden sm:inline">
                            Supprimer
                          </span>
                        </button>

                      </div>
                    </div>
                  </article>
                );
              })}

            </div>
          </section>

          {/* ================================================== */}
          {/* SUMMARY */}
          {/* ================================================== */}

          <aside className="lg:sticky lg:top-8 lg:self-start">

            <div className="border border-black/10 bg-[#EEECE8] p-6 sm:p-7">

              <p className="font-jost text-[9px] uppercase tracking-[0.25em] text-black/40">
                Résumé
              </p>

              <h2 className="mt-3 font-jost text-xl font-light uppercase tracking-[0.1em] text-black">
                Votre commande
              </h2>

              <div className="my-7 h-px bg-black/10" />

              {/* ARTICLES */}

              <div className="flex items-center justify-between">
                <span className="font-jost text-[10px] text-black/45">
                  Articles
                </span>

                <span className="font-jost text-[10px] text-black">
                  {totalItems}
                </span>
              </div>

              {/* SOUS TOTAL */}

              <div className="mt-5 flex items-center justify-between">
                <span className="font-jost text-[10px] text-black/45">
                  Sous-total
                </span>

                <span className="font-jost text-xs text-black">
                  {totalPrice.toLocaleString("fr-FR")} DA
                </span>
              </div>

              {/* SHIPPING */}

              <div className="mt-5 flex items-center justify-between">
                <span className="font-jost text-[10px] text-black/45">
                  Livraison
                </span>

                <span className="font-jost text-[10px] text-black">
                  À confirmer
                </span>
              </div>

              <div className="my-7 h-px bg-black/10" />

              {/* TOTAL */}

              <div className="flex items-end justify-between">

                <span className="font-jost text-[10px] uppercase tracking-[0.18em] text-black">
                  Total
                </span>

                <span className="font-jost text-xl font-light text-black">
                  {totalPrice.toLocaleString("fr-FR")} DA
                </span>

              </div>

              {/* CHECKOUT */}

              <Link
                href="/checkout"
                className="group mt-7 flex min-h-12 w-full items-center justify-center gap-3 border border-black bg-black px-5 font-jost text-[9px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
              >
                Passer la commande

                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.2}
                />
              </Link>

              <p className="mt-4 text-center font-jost text-[8px] leading-4 text-black/35">
                Paiement à la livraison disponible.
              </p>

            </div>

            {/* ================= INFO ================= */}

            <div className="mt-6 border-t border-black/10 pt-5">

              <div className="flex items-center justify-between">
                <span className="font-jost text-[9px] uppercase tracking-[0.15em] text-black/35">
                  Livraison
                </span>

                <span className="font-jost text-[9px] text-black">
                  Disponible
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-jost text-[9px] uppercase tracking-[0.15em] text-black/35">
                  Retours
                </span>

                <Link
                  href="/contact"
                  className="font-jost text-[9px] text-black underline underline-offset-4 transition-opacity hover:opacity-50"
                >
                  En savoir plus
                </Link>
              </div>

            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}