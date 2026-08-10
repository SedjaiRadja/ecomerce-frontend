"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, User, ShoppingBag } from "lucide-react";

const NAV_LINKS = [
  { label: "Homme", href: "/products?gender=men" },
  { label: "Femme", href: "/products?gender=women" },
  { label: "Enfants", href: "/products?gender=unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 bg-[#C8C5C0]">
      <nav className="flex h-20 items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Allure"
            width={140}
            height={50}
            priority
            className="h-auto w-[80px] object-contain md:w-[90px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 font-jost md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-body text-black transition-colors hover:text-black/60"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          {/* Recherche */}
          <Link
            href="/search"
            aria-label="Recherche"
            className="text-dark-900 transition-colors hover:text-dark-700"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          {/* Liste de souhaits */}
          <Link
            href="/wishlist"
            aria-label="Liste de souhaits"
            className="text-dark-900 transition-colors hover:text-dark-700"
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          {/* Connexion */}
          <Link
            href="/login"
            aria-label="Connexion"
            className="text-dark-900 transition-colors hover:text-dark-700"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          {/* Panier */}
          <Link
            href="/cart"
            aria-label="Panier"
            className="relative text-dark-900 transition-colors hover:text-dark-700"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-dark-900 text-[10px] text-white">
              2
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="relative z-50 inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>

          {/* Hamburger */}
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-6 bg-black" />
            <span className="block h-0.5 w-6 bg-black" />
            <span className="block h-0.5 w-6 bg-black" />
          </span>
        </button>
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
            className="
              absolute
              left-0
              right-0
              top-full
              z-50
              overflow-hidden
              border-t
              border-black/10
              bg-[#C8C5C0]
              shadow-lg
              md:hidden
            "
          >
            <ul className="space-y-1 px-6 py-5 font-jost">
              {/* Main Links */}
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="
                      block
                      border-b
                      border-black/10
                      py-3
                      text-base
                      text-black
                      transition-colors
                      hover:text-black/60
                    "
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}

              {/* Mobile Actions */}
              <li className="flex flex-wrap gap-x-8 gap-y-5 pt-5">
                {/* Search */}
                <Link
                  href="/search"
                  className="flex items-center gap-2 text-sm text-black"
                  onClick={() => setOpen(false)}
                >
                  <Search className="h-5 w-5" strokeWidth={1.5} />
                  Search
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 text-sm text-black"
                  onClick={() => setOpen(false)}
                >
                  <Heart className="h-5 w-5" strokeWidth={1.5} />
                  Wishlist
                </Link>

                {/* Login */}
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-sm text-black"
                  onClick={() => setOpen(false)}
                >
                  <User className="h-5 w-5" strokeWidth={1.5} />
                  Login
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-sm text-black"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                  Cart
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
