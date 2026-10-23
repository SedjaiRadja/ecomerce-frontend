"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BrandStorySection() {
  return (
    <section className="w-full overflow-hidden bg-[#F8F6F2] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-24">
        {/* Editorial collage */}
        <div className="relative mx-auto w-full max-w-[460px] pb-12 pr-10 sm:pb-16 sm:pr-14">
          {/* Main image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E8E2D9]">
            <Image
              src="/images/editorial.jpg"
              alt="L'univers et l'esthétique de Allure"
              fill
              priority={false}
              sizes="(max-width: 768px) 85vw, 460px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
          </div>

          {/* Overlapping image */}
          <div className="absolute -bottom-1 right-0 w-[43%] border-[6px] border-[#F8F6F2] bg-[#E8E2D9] sm:border-[8px]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/editorial-detail.jpg"
                alt="Détails de la collection Allure"
                fill
                sizes="(max-width: 768px) 38vw, 190px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Editorial index */}
          <span className="absolute bottom-3 left-0 font-inter text-[9px] tracking-[0.25em] text-[#292722]/55">
            COLLECTION — 001
          </span>
        </div>

        {/* Brand story */}
        <div className="max-w-lg md:py-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#B49A78]" />
            <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#292722]/60">
              L&apos;esprit Allure
            </p>
          </div>

          <h2 className="mt-6 font-playfair text-3xl font-normal leading-[1.2] text-[#292722] sm:text-4xl lg:text-5xl">
            L&apos;élégance se trouve
            <br />
            dans l&apos;essentiel.
          </h2>

          <p className="mt-6 max-w-md font-inter text-sm leading-7 text-[#292722]/70">
            Chez Allure, chaque détail a son importance. Des lignes épurées, des
            pièces intemporelles et une vision du style qui privilégie
            l&apos;authenticité à l&apos;excès.
          </p>

          <p className="mt-4 max-w-md font-inter text-sm leading-7 text-[#292722]/70">
            Une allure qui vous ressemble, aujourd&apos;hui comme demain.
          </p>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-3 border-b border-[#B49A78] pb-3 font-inter text-[10px] uppercase tracking-[0.2em] text-[#292722]"
          >
            Découvrir notre univers
            <ArrowUpRight
              className="h-4 w-4 text-[#B49A78] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.3}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
