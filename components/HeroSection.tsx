"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="
    relative
    h-[calc(100dvh-56px)]
    w-full
    overflow-hidden
    bg-[#C8C5C0]
  "
    >
      {/* Store name - background */}
      <h1
        className="
          absolute inset-0 z-0
          flex items-center justify-center
          font-jost font-bold
          tracking-[-0.08em]
          leading-none
          text-black
          whitespace-nowrap
          text-[34vw] md:text-[20vw]
        "
      >
        ALLURE
      </h1>

      {/* Models - foreground */}
      <motion.div
        initial={{
          x: 180,
          scale: 1.08,
          opacity: 0,
        }}
        animate={{
          x: 0,
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 z-10"
      >
        <Image
          src="/hero.png"
          alt="Allure fashion collection"
          fill
          priority
          className="object-contain object-right"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20">
        {/* Top Label */}
        <div className="absolute left-6 top-6 sm:left-10 sm:top-10 lg:left-16 lg:top-14">
          <div>
            <p className="font-jost text-sm uppercase tracking-[0.3em] sm:text-base">
              Nouvelle Collection
            </p>

            <span className="mt-2 block h-px w-20 bg-black" />
          </div>
        </div>

        {/* Short Statement */}
        <div className="absolute bottom-28 left-6 sm:bottom-32 sm:left-10 lg:bottom-32 lg:left-16">
          <p className="max-w-xs font-jost text-xl font-medium leading-tight sm:text-2xl lg:text-3xl">
            L’élégance au quotidien.
          </p>
        </div>

        {/* CTA */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 lg:bottom-10 lg:left-16">
          <Link
            href="/#collection"
            className="inline-block bg-black px-8 py-4 font-jost text-sm uppercase tracking-[0.2em] text-white transition hover:bg-black/80"
          >
            Découvrir la collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
