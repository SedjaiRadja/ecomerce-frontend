"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import EcommerceProductCard from "./ProductCard";
import type { ProductCardProduct } from "./ProductCard";

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

type ProductCollectionProps = {
  genre?: Genre;
};

const genreOptions = [
  { label: "Tout", value: "Toutes" },
  { label: "Femme", value: "femme" },
  { label: "Homme", value: "homme" },
  { label: "Enfant", value: "enfant" },
];

export default function ProductCollection({ genre }: ProductCollectionProps) {
  const router = useRouter();
  const [manualGenre, setManualGenre] = useState<string | null>(null);
  const selectedGenre = manualGenre ?? genre ?? "Toutes";

  const [availability, setAvailability] = useState("Toutes");
  const [priceRange, setPriceRange] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");

  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL n'est pas configurée");
        }

        const response = await fetch(`${apiUrl}/api/products`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Impossible de récupérer les produits");
        }

        const data: { products?: Product[] } | Product[] =
          await response.json();

        const fetchedProducts = Array.isArray(data) ? data : data.products;

        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
        setFetchError(false);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Erreur lors de la récupération des produits :", error);
        setProducts([]);
        setFetchError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedGenre !== "Toutes") {
      result = result.filter(
        (product) =>
          product.genre?.toLowerCase() === selectedGenre.toLowerCase(),
      );
    }

    if (availability === "En stock") {
      result = result.filter((product) => product.stock > 0);
    }

    if (availability === "Rupture de stock") {
      result = result.filter((product) => product.stock <= 0);
    }

    if (priceRange === "moins-10000") {
      result = result.filter((product) => product.price < 10000);
    }

    if (priceRange === "10000-15000") {
      result = result.filter(
        (product) => product.price >= 10000 && product.price <= 15000,
      );
    }

    if (priceRange === "plus-15000") {
      result = result.filter((product) => product.price > 15000);
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query),
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    }

    return result;
  }, [products, selectedGenre, availability, priceRange, sortBy, search]);

  const resetFilters = () => {
    setManualGenre(null);
    setAvailability("Toutes");
    setPriceRange("Tous");
    setSortBy("recent");
    router.replace("/products");
  };

  const activeFiltersCount = [
    selectedGenre !== "Toutes",
    availability !== "Toutes",
    priceRange !== "Tous",
    search.trim() !== "",
  ].filter(Boolean).length;

  if (loading) {
    return (
      <section className="min-h-[400px] bg-[#F8F6F2] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C8174]">
            Chargement des produits...
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="border border-[#E8E2D9] bg-white">
                <div className="aspect-[3/4] animate-pulse bg-[#E8E2D9]" />
                <div className="space-y-3 p-3">
                  <div className="h-3 w-2/3 animate-pulse bg-[#E8E2D9]" />
                  <div className="h-3 w-1/3 animate-pulse bg-[#E8E2D9]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F6F2] px-5 py-12 text-[#292722] sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <header className="mb-10 border-b border-[#E8E2D9] pb-8 sm:mb-14 sm:pb-10">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#8C8174]">
            ALLURE — L&apos;art de s&apos;habiller
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-6xl">
                La collection
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#777168]">
                Des pièces choisies avec soin, pensées pour traverser les
                saisons avec élégance.
              </p>
            </div>

            <p className="text-xs text-[#777168]">
              {filteredProducts.length}{" "}
              {filteredProducts.length > 1 ? "pièces" : "pièce"}
            </p>
          </div>
        </header>

        {/* Navigation par genre */}
        <nav
          aria-label="Catégories de produits"
          className="mb-8 flex flex-wrap gap-3 border-b border-[#E8E2D9] pb-5"
        >
          {genreOptions.map((item) => {
            const isActive = selectedGenre === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setManualGenre(item.value)}
                aria-pressed={isActive}
                className={`border px-5 py-2.5 text-xs tracking-wide transition-colors ${
                  isActive
                    ? "border-[#292722] bg-[#292722] text-white"
                    : "border-[#E8E2D9] bg-transparent text-[#555047] hover:border-[#292722]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Recherche, filtres et tri */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <input
              type="search"
              value={search}
              readOnly
              placeholder="Rechercher une pièce..."
              aria-label="Rechercher un produit"
              className="w-full border-b border-[#CFC7BC] bg-transparent py-3 pr-9 text-sm outline-none"
            />

            {search && (
              <button
                type="button"
                onClick={() => router.replace("/products")}
                aria-label="Effacer la recherche"
                className="absolute right-0 top-3 text-[#777168] hover:text-[#292722]"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFilters((previous) => !previous)}
              aria-expanded={showFilters}
              className="inline-flex items-center gap-2 border border-[#E8E2D9] px-4 py-3 text-xs hover:border-[#292722]"
            >
              <SlidersHorizontal size={15} />
              Filtres
              {activeFiltersCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#292722] px-1 text-[10px] text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <label className="inline-flex items-center gap-2 text-xs text-[#777168]">
              <ArrowDownUp size={15} />
              <span className="sr-only">Trier les produits</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="max-w-[155px] bg-transparent py-3 text-xs text-[#292722] outline-none"
              >
                <option value="recent">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name-asc">Nom A–Z</option>
              </select>
            </label>
          </div>
        </div>

        {/* Filtres */}
        {showFilters && (
          <div className="mb-8 grid grid-cols-1 gap-5 border border-[#E8E2D9] bg-white/60 p-5 sm:grid-cols-3 sm:p-6">
            <div>
              <label
                htmlFor="availability"
                className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#777168]"
              >
                Disponibilité
              </label>

              <select
                id="availability"
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="w-full border-b border-[#E8E2D9] bg-transparent py-3 text-sm outline-none"
              >
                <option value="Toutes">Toutes</option>
                <option value="En stock">En stock</option>
                <option value="Rupture de stock">Rupture de stock</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="priceRange"
                className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#777168]"
              >
                Budget
              </label>

              <select
                id="priceRange"
                value={priceRange}
                onChange={(event) => setPriceRange(event.target.value)}
                className="w-full border-b border-[#E8E2D9] bg-transparent py-3 text-sm outline-none"
              >
                <option value="Tous">Tous les prix</option>
                <option value="moins-10000">Moins de 10 000 DA</option>
                <option value="10000-15000">10 000 – 15 000 DA</option>
                <option value="plus-15000">Plus de 15 000 DA</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 py-3 text-xs text-[#777168] hover:text-[#292722]"
              >
                <RotateCcw size={14} />
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}

        {/* Produits */}
        {fetchError ? (
          <div className="border border-[#E8E2D9] px-5 py-16 text-center">
            <h2 className="font-serif text-2xl">
              La collection est momentanément indisponible
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#777168]">
              Impossible de charger les produits. Vérifie la connexion au
              serveur et réessaie.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 bg-[#292722] px-6 py-3 text-xs text-white hover:bg-[#444039]"
            >
              Réessayer
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
            {filteredProducts.map((product, index) => {
              const productForCard: ProductCardProduct = {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.images?.[0] ?? product.image ?? "",
                category: product.category,
                genre: product.genre,
                stock: product.stock,
              };

              return (
                <div key={product._id} className="flex min-w-0">
                  <EcommerceProductCard
                    product={productForCard}
                    isNew={sortBy === "recent" && index < 2}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="border border-[#E8E2D9] px-5 py-16 text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#9A8D7D]">
              Aucun résultat
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl">
              Aucune pièce ne correspond à votre recherche
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#777168]">
              Essaie de modifier tes filtres ou de rechercher une autre pièce.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 bg-[#292722] px-6 py-3 text-xs text-white hover:bg-[#444039]"
            >
              Réinitialiser
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        <div className="mt-16 border-t border-[#E8E2D9] pt-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9A8D7D]">
            ALLURE — Le style, en toute simplicité.
          </p>
        </div>
      </div>
    </section>
  );
}
