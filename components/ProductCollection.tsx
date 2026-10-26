"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";

type Genre = "femme" | "homme" | "enfant";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  image?: string;
  category: string;
  genre?: string;
  stock: number;
};

type ProductCardProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

type ProductCollectionProps = {
  genre?: Genre;
};

export default function ProductCollection({
  genre,
}: ProductCollectionProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>(
    genre ?? "Toutes",
  );
  const [availability, setAvailability] = useState("Toutes");
  const [priceRange, setPriceRange] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH PRODUCTS =================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL n'est pas configurée");
        }

        const response = await fetch(`${apiUrl}/api/products`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer les produits");
        }

        const data: { products?: Product[] } | Product[] =
          await response.json();

        const fetchedProducts = Array.isArray(data)
          ? data
          : data.products;

        setProducts(
          Array.isArray(fetchedProducts) ? fetchedProducts : [],
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits :",
          error,
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ================= FILTER + SORT =================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Genre : Femme / Homme / Enfant
    if (selectedGenre !== "Toutes") {
      result = result.filter(
        (product) => product.genre === selectedGenre,
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
          product.price >= 10000 && product.price <= 15000,
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
      result.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    }

    return result;
  }, [products, selectedGenre, availability, priceRange, sortBy]);

  // ================= RESET =================

  const resetFilters = () => {
    setSelectedGenre("Toutes");
    setAvailability("Toutes");
    setPriceRange("Tous");
    setSortBy("recent");
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <section className="w-full">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-black/40">
            Chargement des produits...
          </p>
        </div>
      </section>
    );
  }

  // ================= MAIN =================

  return (
    <section className="w-full">
      {/* HEADER */}

      <header>
        <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-black/40 sm:text-[11px]">
          La collection
        </p>

        <h1 className="mt-3 font-playfair text-3xl font-light uppercase tracking-[0.12em] text-black sm:text-4xl lg:text-5xl">
          Nos pièces
        </h1>

        <p className="mt-4 max-w-lg font-inter text-xs leading-5 text-black/50 sm:text-sm">
          Découvrez notre sélection de pièces pensées pour accompagner
          votre style avec élégance et simplicité.
        </p>
      </header>

      {/* CONTROLS */}

      <div className="mt-10 flex flex-col gap-5 border-y border-black/10 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {/* Genre */}

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            aria-label="Filtrer par genre"
            className="cursor-pointer border border-black/15 bg-transparent px-3 py-2 font-inter text-[10px] uppercase tracking-[0.12em] text-black outline-none transition-colors hover:border-black/40 lg:text-[15px] lg:tracking-[0.05em]"
          >
            <option value="Toutes">Tous les genres</option>
            <option value="femme">Femme</option>
            <option value="homme">Homme</option>
            <option value="enfant">Enfant</option>
          </select>

          {/* Availability */}

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            aria-label="Filtrer par disponibilité"
            className="cursor-pointer border border-black/15 bg-transparent px-3 py-2 font-inter text-[10px] uppercase tracking-[0.12em] text-black outline-none transition-colors hover:border-black/40 lg:text-[15px] lg:tracking-[0.05em]"
          >
            <option value="Toutes">Disponibilité</option>
            <option value="En stock">En stock</option>
            <option value="Rupture de stock">
              Rupture de stock
            </option>
          </select>

          {/* Price */}

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            aria-label="Filtrer par prix"
            className="cursor-pointer border border-black/15 bg-transparent px-3 py-2 font-inter text-[10px] uppercase tracking-[0.12em] text-black outline-none transition-colors hover:border-black/40 lg:text-[15px] lg:tracking-[0.05em]"
          >
            <option value="Tous">Prix</option>
            <option value="moins-10000">Moins de 10 000 DA</option>
            <option value="10000-15000">
              10 000 – 15 000 DA
            </option>
            <option value="plus-15000">Plus de 15 000 DA</option>
          </select>

          {/* Reset */}

          <button
            type="button"
            onClick={resetFilters}
            className="border-b border-black/40 px-1 py-2 font-inter text-[10px] uppercase tracking-[0.12em] text-black/60 transition-colors hover:border-black hover:text-black lg:text-[15px] lg:tracking-[0.05em]"
          >
            Réinitialiser
          </button>
        </div>

        {/* Sorting */}

        <div className="flex items-center gap-3">
          <span className="font-inter text-[10px] uppercase tracking-[0.12em] text-black/40 lg:text-[15px] lg:tracking-[0.05em]">
            Trier par
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Trier les produits"
            className="cursor-pointer border-none bg-transparent font-inter text-[10px] uppercase tracking-[0.12em] text-black outline-none lg:text-[15px] lg:tracking-[0.05em]"
          >
            <option value="recent">Nouveautés</option>
            <option value="price-asc">Prix : croissant</option>
            <option value="price-desc">Prix : décroissant</option>
            <option value="name-asc">Nom : A → Z</option>
          </select>
        </div>
      </div>

      {/* RESULTS COUNT */}

      <div className="mt-8 flex items-center justify-between">
        <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-black/40 lg:text-[13px]">
          {filteredProducts.length}{" "}
          {filteredProducts.length > 1 ? "produits" : "produit"}
        </p>
      </div>

      {/* PRODUCTS */}

      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
          {filteredProducts.map((product) => {
            const productForCard: ProductCardProduct = {
              _id: product._id,
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.images?.[0] ?? product.image ?? "",
              category: product.category,
              stock: product.stock,
            };

            return (
              <div
                key={product._id}
                className="w-full max-w-[260px]"
              >
                <ProductCard product={productForCard} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <p className="font-inter text-sm uppercase tracking-[0.15em] text-black">
              Aucun produit trouvé
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 border-b border-black pb-1 font-inter text-[9px] uppercase tracking-[0.2em]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
