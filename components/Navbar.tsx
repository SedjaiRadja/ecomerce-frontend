"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, User, ShoppingBag, Search } from "lucide-react";

const NAV_LINKS = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Kids", href: "/products?gender=unisex" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <nav className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Allure"
            width={100}
            height={100}
            className="h-16 w-16 object-contain"
          />
          <span className="font-jost text-2xl font-medium tracking-[0.2em]">
            ALLURE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="font-jost hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-body text-dark-900 transition-colors hover:text-dark-700"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 md:flex">
          {/* Search */}
          <Link
            href="/search"
            aria-label="Search"
            className="text-dark-900 transition-colors hover:text-dark-700"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="text-dark-900 transition-colors hover:text-dark-700"
          >
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          {/* Login */}
          <Link
            href="/login"
            aria-label="Login"
            className="text-dark-900 transition-colors hover:text-dark-700"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
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
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle navigation</span>

          <span className="mb-1 block h-0.5 w-6 bg-dark-900"></span>
          <span className="mb-1 block h-0.5 w-6 bg-dark-900"></span>
          <span className="block h-0.5 w-6 bg-dark-900"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`border-t border-light-300 md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="font-jost space-y-2 px-4 py-3">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-2 text-body text-dark-900 hover:text-dark-700"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Mobile Actions */}
          <li className="flex items-center gap-6 border-t border-light-300 pt-4">
            <Link
              href="/search"
              className="flex items-center gap-2 text-body"
              onClick={() => setOpen(false)}
            >
              <Search className="h-5 w-5" strokeWidth={1.5} />
              Search
            </Link>

            <Link
              href="/wishlist"
              className="flex items-center gap-2 text-body"
              onClick={() => setOpen(false)}
            >
              <Heart className="h-5 w-5" strokeWidth={1.5} />
              Wishlist
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 text-body"
              onClick={() => setOpen(false)}
            >
              <User className="h-5 w-5" strokeWidth={1.5} />
              Login
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 text-body"
              onClick={() => setOpen(false)}
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
