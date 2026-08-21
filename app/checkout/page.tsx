"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ShippingForm = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  wilaya: string;
  phone: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const {
    items,
    totalItems,
    totalPrice,
    loading: cartLoading,
  } = useCart();

  const [form, setForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    wilaya: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * =========================
   * HANDLE CHANGE
   * =========================
   */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
   * =========================
   * CREATE ORDER
   * =========================
   */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError(null);

    if (items.length === 0) {
      setError("Votre panier est vide.");
      return;
    }

    const {
      firstName,
      lastName,
      street,
      city,
      wilaya,
      phone,
    } = form;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !street.trim() ||
      !city.trim() ||
      !wilaya.trim() ||
      !phone.trim()
    ) {
      setError(
        "Veuillez compléter toutes les informations de livraison.",
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          shippingAddress: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            street: street.trim(),
            city: city.trim(),
            wilaya: wilaya.trim(),
            phone: phone.trim(),
          },
        }),
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || "Impossible de créer votre commande.",
        );
      }

      const data = await response.json();

      console.log("ORDER CREATED:", data.order);

      router.push(
        `/order-success?id=${data.order._id}`,
      );
    } catch (err) {
      console.error("Create order error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================
   * EMPTY CART
   * =========================
   */

  if (!cartLoading && items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F3F0] px-5 py-8">
        <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center">
          <div className="text-center">
            <p className="font-jost text-[9px] uppercase tracking-[0.3em] text-black/40">
              Votre sélection
            </p>

            <h1 className="mt-4 font-jost text-3xl font-light uppercase tracking-[0.1em] text-black sm:text-4xl">
              Votre panier est vide
            </h1>

            <p className="mx-auto mt-5 max-w-sm font-jost text-xs leading-6 text-black/50">
              Ajoutez au moins un article à votre panier
              avant de passer votre commande.
            </p>

            <Link
              href="/products"
              className="group mt-8 inline-flex items-center gap-3 border border-black bg-black px-7 py-3.5 font-jost text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
            >
              Découvrir la collection

              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.2}
              />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3F0] px-4 py-7 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <header className="border-b border-black/10 pb-8">
          <Link
            href="/cart"
            className="group mb-8 inline-flex items-center gap-2 font-jost text-[9px] uppercase tracking-[0.2em] text-black/50 transition-colors hover:text-black"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.2}
            />

            Retour au panier
          </Link>

          <div>
            <p className="font-jost text-[9px] uppercase tracking-[0.3em] text-black/40">
              Allure
            </p>

            <h1 className="mt-3 font-jost text-3xl font-light uppercase tracking-[0.1em] text-black sm:text-4xl lg:text-5xl">
              Finaliser votre commande
            </h1>

            <p className="mt-4 max-w-xl font-jost text-xs leading-6 text-black/50">
              Quelques informations suffisent pour préparer
              votre commande et organiser sa livraison.
            </p>
          </div>
        </header>

        {/* ================= CONTENT ================= */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-16"
        >

          {/* ================= LEFT ================= */}

          <section>

            {/* DELIVERY */}

            <div>
              <div className="border-b border-black/10 pb-4">
                <p className="font-jost text-[9px] uppercase tracking-[0.25em] text-black/40">
                  Étape 01
                </p>

                <h2 className="mt-2 font-jost text-xl font-light uppercase tracking-[0.08em] text-black">
                  Informations de livraison
                </h2>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* FIRST NAME */}

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block font-jost text-[9px] uppercase tracking-[0.18em] text-black/50"
                  >
                    Prénom
                  </label>

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    autoComplete="given-name"
                    required
                    className="h-12 w-full border border-black/15 bg-transparent px-4 font-jost text-xs text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </div>

                {/* LAST NAME */}

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block font-jost text-[9px] uppercase tracking-[0.18em] text-black/50"
                  >
                    Nom
                  </label>

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    autoComplete="family-name"
                    required
                    className="h-12 w-full border border-black/15 bg-transparent px-4 font-jost text-xs text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </div>

                {/* STREET */}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="street"
                    className="mb-2 block font-jost text-[9px] uppercase tracking-[0.18em] text-black/50"
                  >
                    Adresse
                  </label>

                  <input
                    id="street"
                    name="street"
                    type="text"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Votre adresse"
                    autoComplete="street-address"
                    required
                    className="h-12 w-full border border-black/15 bg-transparent px-4 font-jost text-xs text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </div>

                {/* CITY */}

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block font-jost text-[9px] uppercase tracking-[0.18em] text-black/50"
                  >
                    Ville
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Oran"
                    autoComplete="address-level2"
                    required
                    className="h-12 w-full border border-black/15 bg-transparent px-4 font-jost text-xs text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </div>

                {/* WILAYA */}

                <div>
                  <label
                    htmlFor="wilaya"
                    className="mb-2 block font-jost text-[9px] uppercase tracking-[0.18em] text-black/50"
                  >
                    Wilaya
                  </label>

                  <input
                    id="wilaya"
                    name="wilaya"
                    type="text"
                    value={form.wilaya}
                    onChange={handleChange}
                    placeholder="Oran"
                    autoComplete="address-level1"
                    required
                    className="h-12 w-full border border-black/15 bg-transparent px-4 font-jost text-xs text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </div>

                {/* PHONE */}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-jost text-[9px] uppercase tracking-[0.18em] text-black/50"
                  >
                    Téléphone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="05 XX XX XX XX"
                    autoComplete="tel"
                    required
                    className="h-12 w-full border border-black/15 bg-transparent px-4 font-jost text-xs text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </div>

              </div>
            </div>

            {/* PAYMENT */}

            <div className="mt-12">
              <div className="border-b border-black/10 pb-4">
                <p className="font-jost text-[9px] uppercase tracking-[0.25em] text-black/40">
                  Étape 02
                </p>

                <h2 className="mt-2 font-jost text-xl font-light uppercase tracking-[0.08em] text-black">
                  Mode de paiement
                </h2>
              </div>

              <div className="mt-6 border border-black bg-[#EEECE8] p-5 sm:p-6">
                <div className="flex items-start gap-4">

                  <div className="flex h-5 w-5 shrink-0 items-center justify-center border border-black bg-black">
                    <Check
                      className="h-3 w-3 text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="font-jost text-xs uppercase tracking-[0.08em] text-black">
                      Paiement à la livraison
                    </p>

                    <p className="mt-2 font-jost text-[10px] leading-5 text-black/50">
                      Réglez votre commande directement à la
                      réception.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-6 border border-black/10 bg-black px-4 py-4">
                <p className="font-jost text-[9px] uppercase leading-5 tracking-[0.12em] text-white">
                  {error}
                </p>
              </div>
            )}

            {/* MOBILE BUTTON */}

            <button
              type="submit"
              disabled={loading || cartLoading}
              className="group mt-8 flex min-h-13 w-full items-center justify-center gap-3 border border-black bg-black px-6 font-jost text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50 lg:hidden"
            >
              {loading ? (
                <>
                  <Loader2
                    className="h-3.5 w-3.5 animate-spin"
                    strokeWidth={1.2}
                  />

                  Création de la commande...
                </>
              ) : (
                <>
                  Confirmer la commande

                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.2}
                  />
                </>
              )}
            </button>

          </section>

          {/* ================= SUMMARY ================= */}

          <aside className="lg:sticky lg:top-8 lg:self-start">

            <div className="border border-black/10 bg-[#EEECE8] p-5 sm:p-6">

              <p className="font-jost text-[9px] uppercase tracking-[0.25em] text-black/40">
                Votre sélection
              </p>

              <h2 className="mt-3 font-jost text-xl font-light uppercase tracking-[0.08em] text-black">
                Résumé
              </h2>

              <div className="my-6 h-px bg-black/10" />

              {/* PRODUCTS */}

              <div className="space-y-5">
                {items.map((item) => {
                  if (typeof item.product === "string") {
                    return null;
                  }

                  const product = item.product;

                  return (
                    <div
                      key={item._id ?? product._id}
                      className="flex gap-4"
                    >
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#C8C5C0]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center bg-black px-1 font-jost text-[7px] text-white">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <p className="font-jost text-xs text-black">
                          {product.name}
                        </p>

                        <p className="mt-1 font-jost text-[9px] uppercase tracking-[0.12em] text-black/40">
                          {product.price.toLocaleString("fr-FR")} DA
                        </p>
                      </div>

                      <p className="self-center whitespace-nowrap font-jost text-[10px] text-black">
                        {(
                          product.price * item.quantity
                        ).toLocaleString("fr-FR")}{" "}
                        DA
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="my-6 h-px bg-black/10" />

              {/* ITEMS */}

              <div className="flex items-center justify-between">
                <span className="font-jost text-[10px] text-black/50">
                  Articles
                </span>

                <span className="font-jost text-[10px] text-black">
                  {totalItems}
                </span>
              </div>

              {/* SUBTOTAL */}

              <div className="mt-4 flex items-center justify-between">
                <span className="font-jost text-[10px] text-black/50">
                  Sous-total
                </span>

                <span className="font-jost text-xs text-black">
                  {totalPrice.toLocaleString("fr-FR")} DA
                </span>
              </div>

              {/* SHIPPING */}

              <div className="mt-4 flex items-center justify-between">
                <span className="font-jost text-[10px] text-black/50">
                  Livraison
                </span>

                <span className="font-jost text-[10px] text-black">
                  À confirmer
                </span>
              </div>

              <div className="my-6 h-px bg-black/10" />

              {/* TOTAL */}

              <div className="flex items-end justify-between">
                <span className="font-jost text-[10px] uppercase tracking-[0.15em] text-black">
                  Total
                </span>

                <span className="font-jost text-xl font-light text-black">
                  {totalPrice.toLocaleString("fr-FR")} DA
                </span>
              </div>

              {/* DESKTOP BUTTON */}

              <button
                type="submit"
                disabled={loading || cartLoading}
                className="group mt-7 hidden min-h-13 w-full items-center justify-center gap-3 border border-black bg-black px-5 font-jost text-[9px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-transparent hover:text-black disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
              >
                {loading ? (
                  <>
                    <Loader2
                      className="h-3.5 w-3.5 animate-spin"
                      strokeWidth={1.2}
                    />

                    Création...
                  </>
                ) : (
                  <>
                    Confirmer la commande

                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.2}
                    />
                  </>
                )}
              </button>

              <p className="mt-4 text-center font-jost text-[8px] leading-4 text-black/40">
                Paiement à la livraison · Commande sécurisée
              </p>
            </div>

            {/* INFO */}

            <div className="mt-6 border-t border-black/10 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-jost text-[9px] uppercase tracking-[0.15em] text-black/40">
                  Livraison
                </span>

                <span className="font-jost text-[9px] text-black">
                  Disponible
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-jost text-[9px] uppercase tracking-[0.15em] text-black/40">
                  Paiement
                </span>

                <span className="font-jost text-[9px] text-black">
                  À la livraison
                </span>
              </div>
            </div>

          </aside>

        </form>
      </div>
    </main>
  );
}