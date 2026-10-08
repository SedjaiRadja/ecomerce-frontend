"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
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

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?limit=4`);

        if (!response.ok) {
          throw new Error("Impossible de récupérer les produits");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (error) {
        console.error("Best sellers error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-[#F8F6F2] px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between sm:mb-12">
          <div>
            <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#292722]/55 sm:text-xs">
              Sélection Allure
            </p>

            <h2 className="mt-3 font-playfair text-2xl font-light uppercase tracking-[0.08em] text-[#292722] sm:text-3xl lg:text-4xl">
              Les plus aimés
            </h2>
          </div>

          <Link
            href="/products"
            className="group hidden items-center gap-2 border-b border-[#E8E2D9] pb-1 font-inter text-[10px] uppercase tracking-[0.2em] text-[#292722] sm:inline-flex"
          >
            Voir tout
            <ArrowUpRight
              className="h-3.5 w-3.5 text-[#B49A78] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-[3/4] animate-pulse bg-[#E8E2D9]"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} theme="home" />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center justify-center">
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-[#292722]/40">
              Aucun produit disponible
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 border-b border-[#E8E2D9] pb-1 font-inter text-[10px] uppercase tracking-[0.2em] text-[#292722]"
          >
            Voir toute la collection
            <ArrowUpRight
              className="h-3.5 w-3.5 text-[#B49A78] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
