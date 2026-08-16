"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

const products: Product[] = [
  {
    id: "robe-elegante",
    name: "Robe Élégante",
    description: "Une silhouette intemporelle pensée pour le quotidien.",
    price: 12900,
    image: "/products/product-1.png",
    category: "Femme",
    stock: 8,
  },
  {
    id: "veste-structuree",
    name: "Veste Structurée",
    description: "Une coupe raffinée aux lignes contemporaines.",
    price: 15900,
    image: "/products/product-2.png",
    category: "Femme",
    stock: 5,
  },
  {
    id: "chemise-classique",
    name: "Chemise Classique",
    description: "Une pièce essentielle au style minimal et élégant.",
    price: 8900,
    image: "/products/product-3.png",
    category: "Homme",
    stock: 12,
  },
  {
    id: "pantalon-tailleur",
    name: "Pantalon Tailleur",
    description: "Une coupe fluide pour une allure sophistiquée.",
    price: 10900,
    image: "/products/product-4.png",
    category: "Homme",
    stock: 7,
  },
];

export default function ProductCollection() {
  const [category, setCategory] = useState("Toutes");
  const [availability, setAvailability] = useState("Toutes");
  const [priceRange, setPriceRange] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (category !== "Toutes") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    // Availability
    if (availability === "En stock") {
      result = result.filter((product) => product.stock > 0);
    }

    if (availability === "Rupture de stock") {
      result = result.filter((product) => product.stock === 0);
    }

    // Price
    if (priceRange === "moins-10000") {
      result = result.filter((product) => product.price < 10000);
    }

    if (priceRange === "10000-15000") {
      result = result.filter(
        (product) =>
          product.price >= 10000 && product.price <= 15000
      );
    }

    if (priceRange === "plus-15000") {
      result = result.filter((product) => product.price > 15000);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "name-asc") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name, "fr")
      );
    }

    return result;
  }, [category, availability, priceRange, sortBy]);

  const resetFilters = () => {
    setCategory("Toutes");
    setAvailability("Toutes");
    setPriceRange("Tous");
    setSortBy("recent");
  };

  return (
    <section className="min-h-screen bg-[#F5F3F0] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <header>
          <p className="font-jost text-[10px] uppercase tracking-[0.3em] text-black/40 sm:text-[11px]">
            La collection
          </p>

          <h1 className="mt-3 font-jost text-3xl font-light uppercase tracking-[0.12em] text-black sm:text-4xl lg:text-5xl">
            Nos pièces
          </h1>

          <p className="mt-4 max-w-lg font-jost text-xs leading-5 text-black/50 sm:text-sm">
            Découvrez notre sélection de pièces pensées pour
            accompagner votre style avec élégance et simplicité.
          </p>
        </header>

        {/* ================= CONTROLS ================= */}
        <div className="mt-10 flex flex-col gap-5 border-y border-black/10 py-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Filters */}
          <div className="flex flex-wrap gap-3">

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="cursor-pointer border border-black/15 bg-transparent px-3 py-2 font-jost text-[10px] uppercase tracking-[0.12em] text-black outline-none transition-colors hover:border-black/40 lg:text-[15px] lg:tracking-[0.05em]"
            >
              <option value="Toutes">
                Toutes les catégories
              </option>

              <option value="Femme">
                Femme
              </option>

              <option value="Homme">
                Homme
              </option>
            </select>

            {/* Availability */}
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="cursor-pointer border border-black/15 bg-transparent px-3 py-2 font-jost text-[10px] uppercase tracking-[0.12em] text-black outline-none transition-colors hover:border-black/40 lg:text-[15px] lg:tracking-[0.05em]"
            >
              <option value="Toutes">
                Disponibilité
              </option>

              <option value="En stock">
                En stock
              </option>

              <option value="Rupture de stock">
                Rupture de stock
              </option>
            </select>

            {/* Price */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="cursor-pointer border border-black/15 bg-transparent px-3 py-2 font-jost text-[10px] uppercase tracking-[0.12em] text-black outline-none transition-colors hover:border-black/40 lg:text-[15px] lg:tracking-[0.05em]"
            >
              <option value="Tous">
                Prix
              </option>

              <option value="moins-10000">
                Moins de 10 000 DA
              </option>

              <option value="10000-15000">
                10 000 – 15 000 DA
              </option>

              <option value="plus-15000">
                Plus de 15 000 DA
              </option>
            </select>

            {/* Reset */}
            <button
              type="button"
              onClick={resetFilters}
              className="border-b border-black/40 px-1 py-2 font-jost text-[10px] uppercase tracking-[0.12em] text-black/60 transition-colors hover:border-black hover:text-black lg:text-[15px] lg:tracking-[0.05em]"
            >
              Réinitialiser
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-3">
            <span className="font-jost text-[10px] uppercase tracking-[0.12em] text-black/40 lg:text-[15px] lg:tracking-[0.05em]">
              Trier par
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer border-none bg-transparent font-jost text-[10px] uppercase tracking-[0.12em] text-black outline-none lg:text-[15px] lg:tracking-[0.05em]"
            >
              <option value="recent">
                Nouveautés
              </option>

              <option value="price-asc">
                Prix : croissant
              </option>

              <option value="price-desc">
                Prix : décroissant
              </option>

              <option value="name-asc">
                Nom : A → Z
              </option>
            </select>
          </div>
        </div>

        {/* ================= RESULTS COUNT ================= */}
        <div className="mt-8 flex items-center justify-between">
          <p className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/40 lg:text-[13px]">
            {filteredProducts.length}{" "}
            {filteredProducts.length > 1
              ? "produits"
              : "produit"}
          </p>
        </div>

        {/* ================= PRODUCTS ================= */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-full max-w-[260px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <p className="font-jost text-sm uppercase tracking-[0.15em] text-black">
                Aucun produit trouvé
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 border-b border-black pb-1 font-jost text-[9px] uppercase tracking-[0.2em]"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}