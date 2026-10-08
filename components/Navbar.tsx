"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import type { CartUpdatedDetail } from "@/components/CartProvider";

const NAV_LINKS = [
  { label: "Homme", href: "/products?gender=men" },
  { label: "Femme", href: "/products?gender=women" },
  { label: "Enfants", href: "/products?gender=unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const isHomePage = pathname === "/";

  const refreshCartCount = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/count`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        },
      );

      if (!response.ok) {
        console.error("Failed to fetch cart count:", response.status);
        return;
      }

      const data: { count: number } = await response.json();

      setCartCount(data.count);
    } catch (error) {
      console.error("Cart count error:", error);
    }
  }, []);

  useEffect(() => {
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<CartUpdatedDetail>;

      setCartCount(customEvent.detail.count);
    };

    window.addEventListener("cart-updated", handleCartUpdate);

    queueMicrotask(() => {
      refreshCartCount();
    });

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, [refreshCartCount]);

  const textColor = isHomePage ? "text-[#292722]" : "text-black";

  const mutedTextColor = isHomePage
    ? "text-[#292722]/70 hover:text-[#292722]"
    : "text-black/70 hover:text-black";

  return (
    <header
      className={`relative z-50 border-b ${
        isHomePage
          ? "border-[#E8E2D9] bg-[#F8F6F2]"
          : "border-black/10 bg-[#C8C5C0]"
      }`}
    >
      {/* Desktop Navbar */}
      <nav className="hidden h-20 items-center gap-6 px-6 md:flex lg:px-10 xl:px-14">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 transition-opacity hover:opacity-75"
        >
          <Image
            src="/logo.png"
            alt="Allure"
            width={140}
            height={50}
            priority
            className="h-auto w-[82px] object-contain lg:w-[90px]"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="ml-4 flex shrink-0 items-center gap-5 font-inter lg:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`whitespace-nowrap text-[13px] font-medium transition-colors ${mutedTextColor}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search */}
        <Link
          href="/search"
          aria-label="Rechercher"
          className={`mx-auto flex h-11 min-w-[220px] max-w-[340px] flex-1 items-center gap-3 rounded-full border px-4 transition-all hover:shadow-sm ${
            isHomePage
              ? "border-[#E8E2D9] bg-white hover:border-[#B49A78]/50"
              : "border-black/10 bg-white/70 hover:bg-white"
          }`}
        >
          <Search
            className="h-[18px] w-[18px] shrink-0 text-[#292722]/60"
            strokeWidth={1.6}
          />

          <span className="font-inter text-sm text-[#292722]/55">
            Rechercher un produit
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Liste de souhaits"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isHomePage
                ? "hover:bg-white"
                : "hover:bg-white/50"
            } ${textColor}`}
          >
            <Heart className="h-[19px] w-[19px]" strokeWidth={1.5} />
          </Link>

          {/* Login */}
          <Link
            href="/login"
            aria-label="Connexion"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isHomePage
                ? "hover:bg-white"
                : "hover:bg-white/50"
            } ${textColor}`}
          >
            <User className="h-[19px] w-[19px]" strokeWidth={1.5} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Panier, ${cartCount} articles`}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isHomePage
                ? "hover:bg-white"
                : "hover:bg-white/50"
            } ${textColor}`}
          >
            <ShoppingBag
              className="h-[19px] w-[19px]"
              strokeWidth={1.5}
            />

            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#292722] px-1 font-inter text-[9px] font-medium leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="flex h-20 items-center justify-between px-5 md:hidden">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Allure"
            width={140}
            height={50}
            priority
            className="h-auto w-[78px] object-contain"
          />
        </Link>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-1">
          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Panier, ${cartCount} articles`}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
              isHomePage
                ? "text-[#292722]"
                : "text-black"
            }`}
          >
            <ShoppingBag
              className="h-[19px] w-[19px]"
              strokeWidth={1.5}
            />

            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#292722] px-1 font-inter text-[9px] font-medium leading-none text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Menu */}
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              isHomePage
                ? "text-[#292722]"
                : "text-black"
            }`}
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className={`absolute left-0 right-0 top-full z-50 overflow-hidden border-t shadow-lg md:hidden ${
              isHomePage
                ? "border-[#E8E2D9] bg-[#F8F6F2]"
                : "border-black/10 bg-[#C8C5C0]"
            }`}
          >
            <div className="px-5 py-5">
              {/* Main Links */}
              <ul className="font-inter">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block border-b py-4 text-[15px] font-medium transition-colors ${
                        isHomePage
                          ? "border-[#E8E2D9] text-[#292722] hover:text-[#292722]/60"
                          : "border-black/10 text-black hover:text-black/60"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Secondary Actions */}
              <div className="flex flex-wrap gap-x-7 gap-y-4 pt-5">
                <Link
                  href="/search"
                  className={`flex items-center gap-2 font-inter text-sm ${
                    isHomePage
                      ? "text-[#292722]"
                      : "text-black"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Search
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.5}
                  />
                  Rechercher
                </Link>

                <Link
                  href="/wishlist"
                  className={`flex items-center gap-2 font-inter text-sm ${
                    isHomePage
                      ? "text-[#292722]"
                      : "text-black"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Heart
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.5}
                  />
                  Favoris
                </Link>

                <Link
                  href="/login"
                  className={`flex items-center gap-2 font-inter text-sm ${
                    isHomePage
                      ? "text-[#292722]"
                      : "text-black"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <User
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.5}
                  />
                  Connexion
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}