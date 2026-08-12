import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#E8E5E0] via-[#C8C5C0] to-[#A9A59F] text-black">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Main Footer */}
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Allure"
                width={120}
                height={40}
                className="h-auto w-[100px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs font-jost text-sm leading-6 text-black/60">
              L&apos;élégance au quotidien, pensée pour celles et ceux qui
              apprécient les lignes simples et intemporelles.
            </p>

            {/* <div className="mt-7 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Instagram"
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full border border-black/20
                  transition-all duration-300
                  hover:bg-black hover:text-white
                "
              >
                <Instagram
                  className="h-4 w-4"
                  strokeWidth={1.2}
                />
              </Link>

              <Link
                href="#"
                aria-label="Facebook"
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full border border-black/20
                  transition-all duration-300
                  hover:bg-black hover:text-white
                "
              >
                <Facebook
                  className="h-4 w-4"
                  strokeWidth={1.2}
                />
              </Link>
            </div> */}
          </div>

          {/* Boutique */}
          <div>
            <h3 className="font-jost text-[10px] uppercase tracking-[0.25em] text-black/50">
              Boutique
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/products?gender=women"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Femme
              </Link>

              <Link
                href="/products?gender=men"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Homme
              </Link>

              <Link
                href="/products?gender=unisex"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Enfants
              </Link>

              <Link
                href="/products"
                className="group flex w-fit items-center gap-1 font-jost text-sm transition-opacity hover:opacity-50"
              >
                Nouveautés
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.2}
                />
              </Link>
            </div>
          </div>

          {/* Allure */}
          <div>
            <h3 className="font-jost text-[10px] uppercase tracking-[0.25em] text-black/50">
              Allure
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Notre histoire
              </Link>

              <Link
                href="/products"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Collection
              </Link>

              <Link
                href="/contact"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Informations */}
          <div>
            <h3 className="font-jost text-[10px] uppercase tracking-[0.25em] text-black/50">
              Informations
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/contact"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Livraison
              </Link>

              <Link
                href="/contact"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Retours
              </Link>

              <Link
                href="/contact"
                className="w-fit font-jost text-sm transition-opacity hover:opacity-50"
              >
                Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-black/15 pt-6 sm:mt-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-jost text-[9px] uppercase tracking-[0.15em] text-black/50 sm:text-[10px]">
              © 2026 Allure. Tous droits réservés.
            </p>

            <p className="font-jost text-[9px] uppercase tracking-[0.15em] text-black/50 sm:text-[10px]">
              L&apos;élégance au quotidien.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
