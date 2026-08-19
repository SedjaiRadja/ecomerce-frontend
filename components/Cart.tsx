"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartData = {
  _id: string;
  user: string;
  items: CartItem[];
};

export default function Cart() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingProduct, setUpdatingProduct] = useState<string | null>(
    null,
  );
  const [removingProduct, setRemovingProduct] = useState<string | null>(
    null,
  );
  const [clearing, setClearing] = useState(false);

  // ================= FETCH CART =================

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (response.status === 404) {
        setCart(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Impossible de récupérer le panier");
      }

      const data = await response.json();

      setCart(data);
    } catch (error) {
      console.error("Erreur panier :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Schedule fetchCart asynchronously to avoid synchronous setState inside effect
    const timer = setTimeout(() => {
      fetchCart();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // ================= UPDATE QUANTITY =================

  const updateQuantity = async (
    productId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) return;

    try {
      setUpdatingProduct(productId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            quantity,
          }),
        },
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();

      setCart(data.cart);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    } finally {
      setUpdatingProduct(null);
    }
  };

  // ================= REMOVE PRODUCT =================

  const removeProduct = async (productId: string) => {
    try {
      setRemovingProduct(productId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      await fetchCart();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setRemovingProduct(null);
    }
  };

  // ================= CLEAR CART =================

  const clearCart = async () => {
    try {
      setClearing(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/clear`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();

      setCart(data.cart);
    } catch (error) {
      console.error("Erreur lors du vidage du panier :", error);
    } finally {
      setClearing(false);
    }
  };

  // ================= TOTAL =================

  const subtotal = useMemo(() => {
    if (!cart) return 0;

    return cart.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    );
  }, [cart]);

  const shipping = subtotal > 0 ? 500 : 0;

  const total = subtotal + shipping;

  // ================= LOADING =================

  if (loading) {
    return (
      <section className="min-h-[70vh] px-5 py-16 sm:px-8 lg:px-16">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="font-jost text-[10px] uppercase tracking-[0.25em] text-black/40">
            Chargement du panier...
          </p>
        </div>
      </section>
    );
  }

  // ================= EMPTY CART =================

  if (!cart || cart.items.length === 0) {
    return (
      <section className="min-h-[70vh] px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto flex min-h-[500px] max-w-5xl items-center justify-center">
          <div className="text-center">
            <ShoppingBag
              className="mx-auto h-10 w-10 text-black/30"
              strokeWidth={1}
            />

            <p className="mt-6 font-jost text-[10px] uppercase tracking-[0.3em] text-black/40">
              Votre panier
            </p>

            <h1 className="mt-3 font-jost text-3xl font-light uppercase tracking-[0.12em] text-black sm:text-4xl">
              Votre panier est vide
            </h1>

            <p className="mx-auto mt-4 max-w-md font-jost text-xs leading-5 text-black/50 sm:text-sm">
              Découvrez notre sélection et trouvez les pièces
              qui correspondent à votre style.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-3 bg-black px-6 py-3 font-jost text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-black/80"
            >
              Découvrir la collection

              <ArrowRight
                className="h-3.5 w-3.5"
                strokeWidth={1.3}
              />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ================= CART =================

  return (
    <section className="min-h-screen px-5 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <header className="flex items-end justify-between border-b border-black/10 pb-6">
          <div>
            <p className="font-jost text-[10px] uppercase tracking-[0.3em] text-black/40 sm:text-[11px]">
              Votre sélection
            </p>

            <h1 className="mt-3 font-jost text-3xl font-light uppercase tracking-[0.12em] text-black sm:text-4xl lg:text-5xl">
              Mon panier
            </h1>
          </div>

          <button
            type="button"
            onClick={clearCart}
            disabled={clearing}
            className="hidden border-b border-black/30 pb-1 font-jost text-[9px] uppercase tracking-[0.18em] text-black/50 transition-colors hover:border-black hover:text-black sm:block disabled:cursor-not-allowed disabled:opacity-40"
          >
            {clearing ? "Suppression..." : "Vider le panier"}
          </button>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          {/* PRODUCTS */}

          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/40">
                {cart.items.length}{" "}
                {cart.items.length > 1
                  ? "articles"
                  : "article"}
              </p>

              <button
                type="button"
                onClick={clearCart}
                disabled={clearing}
                className="font-jost text-[9px] uppercase tracking-[0.18em] text-black/40 hover:text-black sm:hidden disabled:opacity-40"
              >
                Vider
              </button>
            </div>

            <div className="divide-y divide-black/10 border-y border-black/10">
              {cart.items.map((item) => {
                const product = item.product;
                const isUpdating =
                  updatingProduct === product._id;
                const isRemoving =
                  removingProduct === product._id;

                return (
                  <div
                    key={product._id}
                    className="flex gap-4 py-5 sm:gap-6"
                  >
                    {/* IMAGE */}

                    <Link
                      href={`/products/${product._id}`}
                      className="relative h-32 w-24 shrink-0 overflow-hidden bg-[#C8C5C0] sm:h-40 sm:w-32"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 128px"
                      />
                    </Link>

                    {/* INFO */}

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-jost text-[8px] uppercase tracking-[0.2em] text-black/40">
                            {product.category}
                          </p>

                          <Link
                            href={`/products/${product._id}`}
                          >
                            <h2 className="mt-1 font-jost text-sm font-medium tracking-wide text-black sm:text-base">
                              {product.name}
                            </h2>
                          </Link>
                        </div>

                        <p className="whitespace-nowrap font-jost text-xs text-black sm:text-sm">
                          {(
                            product.price *
                            item.quantity
                          ).toLocaleString("fr-FR")}{" "}
                          DA
                        </p>
                      </div>

                      <p className="mt-2 hidden max-w-md font-jost text-[10px] leading-4 text-black/40 sm:block">
                        {product.description}
                      </p>

                      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                        {/* QUANTITY */}

                        <div className="flex items-center border border-black/15">
                          <button
                            type="button"
                            disabled={
                              isUpdating ||
                              item.quantity <= 1
                            }
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                item.quantity - 1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Minus
                              className="h-3 w-3"
                              strokeWidth={1.3}
                            />
                          </button>

                          <span className="flex h-8 min-w-8 items-center justify-center border-x border-black/15 font-jost text-[10px]">
                            {isUpdating
                              ? "..."
                              : item.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={
                              isUpdating ||
                              item.quantity >=
                                product.stock
                            }
                            onClick={() =>
                              updateQuantity(
                                product._id,
                                item.quantity + 1,
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Plus
                              className="h-3 w-3"
                              strokeWidth={1.3}
                            />
                          </button>
                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          disabled={isRemoving}
                          onClick={() =>
                            removeProduct(product._id)
                          }
                          className="flex items-center gap-1.5 font-jost text-[8px] uppercase tracking-[0.15em] text-black/40 transition-colors hover:text-black disabled:opacity-40"
                        >
                          <Trash2
                            className="h-3 w-3"
                            strokeWidth={1.2}
                          />

                          {isRemoving
                            ? "Suppression..."
                            : "Supprimer"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUMMARY */}

          <aside className="h-fit border border-black/10 bg-[#F5F3F0] p-5 sm:p-6 lg:sticky lg:top-24">
            <p className="font-jost text-[9px] uppercase tracking-[0.25em] text-black/40">
              Résumé
            </p>

            <h2 className="mt-3 font-jost text-xl font-light uppercase tracking-[0.1em]">
              Total de la commande
            </h2>

            <div className="mt-7 space-y-4 border-b border-black/10 pb-6">
              <div className="flex items-center justify-between">
                <span className="font-jost text-[10px] uppercase tracking-[0.12em] text-black/50">
                  Sous-total
                </span>

                <span className="font-jost text-xs">
                  {subtotal.toLocaleString("fr-FR")} DA
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-jost text-[10px] uppercase tracking-[0.12em] text-black/50">
                  Livraison
                </span>

                <span className="font-jost text-xs">
                  {shipping.toLocaleString("fr-FR")} DA
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-6">
              <span className="font-jost text-[10px] uppercase tracking-[0.15em] text-black">
                Total
              </span>

              <span className="font-jost text-base">
                {total.toLocaleString("fr-FR")} DA
              </span>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 bg-black px-5 py-3.5 font-jost text-[9px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-black/80"
            >
              Passer la commande

              <ArrowRight
                className="h-3.5 w-3.5"
                strokeWidth={1.3}
              />
            </button>

            <p className="mt-4 text-center font-jost text-[8px] leading-4 text-black/40">
              Les frais de livraison sont calculés selon
              votre adresse lors de la commande.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
