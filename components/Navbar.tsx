"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, User, ShoppingBag, Menu, X } from "lucide-react";
import type { CartUpdatedDetail } from "@/components/CartProvider";

const NAV_LINKS = [
  { label: "Homme", href: "/products?genre=homme" },
  { label: "Femme", href: "/products?genre=femme" },
  { label: "Enfants", href: "/products?genre=enfant" },
  { label: "Collections", href: "/collections" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const refreshCartCount = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not configured.");
        return;
      }

      const response = await fetch(`${apiUrl}/api/cart/count`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Failed to fetch cart count:", response.status);
        return;
      }

      const data: { count: number } = await response.json();

      if (typeof data.count === "number" && Number.isFinite(data.count)) {
        setCartCount(Math.max(0, data.count));
      }
    } catch (error) {
      console.error("Cart count error:", error);
    }
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    setSearchOpen(false);
    setOpen(false);
    router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<CartUpdatedDetail>;
      const count = customEvent.detail?.count;

      if (typeof count === "number" && Number.isFinite(count)) {
        setCartCount(Math.max(0, count));
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate);

    const timeoutId = window.setTimeout(() => {
      void refreshCartCount();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, [refreshCartCount]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setOpen(false);
      setSearchOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    if (!open && !searchOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, searchOpen]);

  const iconButtonClass =
    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#292722] transition-colors duration-200 hover:bg-[#E8E2D9]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B49A78]";

  const searchInputClass =
    "min-w-0 flex-1 bg-transparent font-inter text-sm text-[#292722] outline-none placeholder:text-[#292722]/55";

  const getNavLinkClass = (href: string) => {
    const baseHref = href.split("?")[0];

    const isActive =
      pathname === baseHref ||
      (baseHref === "/products" && pathname.startsWith("/products"));

    return [
      "group relative whitespace-nowrap py-2 font-inter text-[13px] font-medium transition-colors duration-200",
      isActive
        ? "text-[#292722] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[#B49A78]"
        : "text-[#292722]/70 hover:text-[#292722]",
    ].join(" ");
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#E8E2D9] bg-[#F8F6F2] text-[#292722]"
      >
        {/* Desktop Navbar */}
        <nav
          aria-label="Navigation principale"
          className="hidden h-20 items-center gap-5 px-6 md:flex lg:gap-7 lg:px-10 xl:px-14"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Allure - Accueil"
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
          <ul className="ml-2 flex shrink-0 items-center gap-4 font-inter lg:ml-4 lg:gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={
                    pathname === link.href.split("?")[0] ||
                    (link.href.startsWith("/products") &&
                      pathname.startsWith("/products"))
                      ? "page"
                      : undefined
                  }
                  className={getNavLinkClass(link.href)}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#B49A78] transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side: Search + Actions */}
          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-1">
            {/* Search expands to the LEFT */}
            <div className="relative z-10 h-10 w-10 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Ouvrir la recherche"
                aria-expanded={searchOpen}
                className={`absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-[#292722] transition-opacity hover:opacity-60 ${
                  searchOpen ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <Search className="h-5 w-5" strokeWidth={1.6} />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    key="desktop-search"
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    onSubmit={handleSearch}
                    role="search"
                    className="absolute right-0 top-0 flex h-10 items-center gap-2 overflow-hidden rounded-full border border-[#E8E2D9] bg-white px-3 focus-within:border-[#B49A78]/70"
                  >
                    <Search
                      className="h-[18px] w-[18px] shrink-0 text-[#292722]/60"
                      strokeWidth={1.6}
                    />

                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Rechercher un produit"
                      aria-label="Rechercher un produit"
                      autoFocus
                      className={searchInputClass}
                    />

                    {searchQuery.trim() && (
                      <button
                        type="submit"
                        className="shrink-0 font-inter text-xs tracking-wider text-[#292722] transition-opacity hover:opacity-60"
                      >
                        OK
                      </button>
                    )}

                    {searchQuery.trim() && (
                      <button
                        type="button"
                        onClick={closeSearch}
                        aria-label="Effacer le texte"
                        className="shrink-0 text-[#777168] hover:text-[#292722]"
                      >
                        <X size={15} strokeWidth={1.6} />
                      </button>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Liste de souhaits"
              className={iconButtonClass}
            >
              <Heart className="h-[19px] w-[19px]" strokeWidth={1.5} />
            </Link>

            {/* Login */}
            <Link
              href="/login"
              aria-label="Connexion"
              className={iconButtonClass}
            >
              <User className="h-[19px] w-[19px]" strokeWidth={1.5} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Panier, ${cartCount} articles`}
              className={iconButtonClass}
            >
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#292722] px-1 font-inter text-[9px] font-medium leading-none text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile Navbar */}
        <nav
          aria-label="Navigation mobile"
          className="flex h-16 items-center justify-between px-5 md:hidden"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Allure - Accueil"
            className="shrink-0 transition-opacity hover:opacity-75"
            onClick={() => {
              setOpen(false);
              setSearchOpen(false);
            }}
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

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Cart: visible only when menu is closed */}
            {!open && (
              <Link
                href="/cart"
                aria-label={`Panier, ${cartCount} articles`}
                className={iconButtonClass}
              >
                <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.5} />

                {cartCount > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#292722] px-1 font-inter text-[9px] font-medium leading-none text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Hamburger / Close Menu */}
            <button
              type="button"
              className={iconButtonClass}
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => {
                setOpen((value) => !value);
                setSearchOpen(false);
              }}
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full z-50 overflow-hidden border-t border-[#E8E2D9] bg-[#F8F6F2] shadow-lg md:hidden"
            >
              <div className="px-5 py-5">
                {/* Search */}
                {searchOpen && (
                  <form
                    onSubmit={handleSearch}
                    role="search"
                    className="mb-4 flex h-11 items-center gap-3 rounded-full border border-[#E8E2D9] bg-white px-4 focus-within:border-[#B49A78]/60"
                  >
                    <Search
                      className="h-[18px] w-[18px] shrink-0 text-[#292722]/60"
                      strokeWidth={1.6}
                    />

                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Rechercher un produit"
                      aria-label="Rechercher un produit"
                      autoFocus
                      className={searchInputClass}
                    />

                    {searchQuery.trim() && (
                      <>
                        <button
                          type="submit"
                          className="shrink-0 font-inter text-xs tracking-wider text-[#292722] hover:text-[#B49A78]"
                        >
                          OK
                        </button>

                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          aria-label="Effacer le texte"
                          className="shrink-0 text-[#777168] hover:text-[#292722]"
                        >
                          <X size={15} strokeWidth={1.6} />
                        </button>
                      </>
                    )}

                    {/* Close Search Only */}
                  </form>
                )}

                {/* Search Toggle: visible when search is closed */}
                {!searchOpen && (
                  <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="mb-3 flex h-11 w-full items-center gap-3 rounded-full border border-[#E8E2D9] bg-white px-4 text-sm text-[#292722]/60 transition-colors hover:border-[#B49A78]/60"
                  >
                    <Search size={18} strokeWidth={1.6} />
                    Rechercher un produit
                  </button>
                )}

                {/* Main Links */}
                <ul className="font-inter">
                  {NAV_LINKS.map((link) => {
                    const baseHref = link.href.split("?")[0];

                    const isActive =
                      pathname === baseHref ||
                      (baseHref === "/products" &&
                        pathname.startsWith("/products"));

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={[
                            "flex items-center justify-between border-b border-[#E8E2D9] py-4 text-[14px] font-medium transition-colors",
                            isActive
                              ? "text-[#292722]"
                              : "text-[#292722]/75 hover:text-[#B49A78]",
                          ].join(" ")}
                          onClick={() => {
                            setOpen(false);
                            setSearchOpen(false);
                          }}
                        >
                          {link.label}

                          {isActive && (
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-[#B49A78]"
                              aria-hidden="true"
                            />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Secondary Actions */}
                <div className="flex flex-wrap gap-x-6 gap-y-4 pt-5">
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 font-inter text-xs text-[#292722]/80 transition-colors hover:text-[#B49A78]"
                    onClick={() => {
                      setOpen(false);
                      setSearchOpen(false);
                    }}
                  >
                    <Heart size={17} strokeWidth={1.5} />
                    Favoris
                  </Link>

                  <Link
                    href="/login"
                    className="flex items-center gap-2 font-inter text-xs text-[#292722]/80 transition-colors hover:text-[#B49A78]"
                    onClick={() => {
                      setOpen(false);
                      setSearchOpen(false);
                    }}
                  >
                    <User size={17} strokeWidth={1.5} />
                    Connexion
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
