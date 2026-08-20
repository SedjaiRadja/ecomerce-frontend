"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "./ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer les produits");
        }

        const data = await response.json();

        // Supporte une réponse directe [] ou { products: [] }
        const fetchedProducts = Array.isArray(data)
          ? data
          : data.products || [];

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Products fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-[#F3F1ED] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}

        <div className="mb-10 flex items-end justify-between sm:mb-12">
          <div>
            <p className="font-jost text-[10px] uppercase tracking-[0.35em] text-black/50 sm:text-xs">
              Nouvelle sélection
            </p>

            <h2 className="mt-3 font-jost text-2xl font-light uppercase tracking-[0.12em] text-black sm:text-3xl lg:text-4xl">
              Nouveautés
            </h2>
          </div>

          <Link
            href="/products"
            className="group hidden items-center gap-2 border-b border-black pb-1 font-jost text-[10px] uppercase tracking-[0.2em] text-black sm:flex"
          >
            Voir toute la collection
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </div>

        {/* ================= PRODUCTS ================= */}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/40">
              Chargement des nouveautés...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="font-jost text-[9px] uppercase tracking-[0.2em] text-black/40">
              Aucun produit disponible
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-4 sm:gap-x-5 lg:gap-x-7">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} isNew />
            ))}
          </div>
        )}

        {/* ================= MOBILE CTA ================= */}

        <div className="mt-12 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="flex items-center gap-2 border-b border-black pb-1.5 font-jost text-[10px] uppercase tracking-[0.2em] text-black"
          >
            Voir toute la collection
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
