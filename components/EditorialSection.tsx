"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EditorialSection() {
  return (
    <section className="w-full bg-[#111111] px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
        {/* =========================
            TEXT
        ========================== */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-lg"
        >
          {/* Label */}
          <p className="font-jost text-[9px] uppercase tracking-[0.35em] text-white/50 sm:text-[10px]">
            Notre vision
          </p>

          {/* Title */}
          <h2 className="mt-3 font-jost text-2xl font-light uppercase leading-tight tracking-[0.08em] text-white sm:text-3xl lg:text-4xl">
            L&apos;élégance
            <br />
            en toute simplicité.
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-md font-jost text-xs leading-5 text-white/60 sm:text-sm sm:leading-6">
            Chez Allure, nous croyons que le style réside dans les détails. Des
            pièces intemporelles, des lignes modernes et une élégance pensée
            pour accompagner chaque moment.
          </p>

          {/* Link */}
          <Link
            href="/about"
            className="group mt-7 inline-flex items-center gap-2 border-b border-white pb-2 font-jost text-[9px] uppercase tracking-[0.2em] text-white transition-opacity duration-300 hover:opacity-60 sm:text-[10px]"
          >
            Notre histoire
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </motion.div>

        {/* =========================
            IMAGE AREA
        ========================== */}
<motion.div
  initial={{ opacity: 0, y: 35, scale: 0.96 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{
    duration: 1,
    delay: 0.1,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative mx-auto flex w-[78%] items-center justify-center sm:w-[70%] md:w-full md:max-w-[400px] lg:max-w-[420px]"
>
  {/* ALLURE */}
  <span
  className="
    absolute
    -left-12
    top-1/2
    z-10
    -translate-y-1/2
    font-jost
    text-[clamp(1.8rem,4vw,3rem)]
    font-light
    uppercase
    tracking-[0.35em]
    text-white/25
    [writing-mode:vertical-rl]
  "
>
  ALLURE
</span>

  {/* Image */}
  <div className="group relative aspect-[4/5] w-full overflow-hidden">
    <Image
      src="/editorial.jpg"
      alt="Collection Allure"
      fill
      sizes="(max-width: 768px) 70vw, 420px"
      className="
        object-cover
        transition-transform
        duration-1000
        ease-out
        group-hover:scale-[1.03]
      "
    />

    <div className="pointer-events-none absolute inset-0 bg-black/5 transition-opacity duration-700 group-hover:bg-black/0" />
  </div>
</motion.div>
      </div>
    </section>
  );
}
