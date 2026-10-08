"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative h-[calc(100dvh-56px)] w-full overflow-hidden bg-[#F8F6F2]">
      <h1 className="absolute inset-0 z-0 flex items-center justify-center whitespace-nowrap font-playfair text-[42vw] font-bold leading-none tracking-[-0.08em] text-[#292722] md:text-[24vw]">
        ALLURE
      </h1>

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

      <div className="absolute inset-0 z-20">
        <div className="absolute left-6 top-6 sm:left-10 sm:top-10 lg:left-16 lg:top-14">
          <div>
            <p className="font-inter text-sm uppercase tracking-[0.3em] text-[#292722]/75 sm:text-base">
              Nouvelle Collection
            </p>

            <span className="mt-2 block h-px w-20 bg-[#B49A78]" />
          </div>
        </div>

        <div className="absolute bottom-28 left-6 sm:bottom-32 sm:left-10 lg:bottom-32 lg:left-16">
          <p className="max-w-xs font-playfair text-xl font-medium leading-tight text-[#292722]/75 sm:text-2xl lg:text-3xl">
            L’élégance au quotidien.
          </p>
        </div>

        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 lg:bottom-10 lg:left-16">
          <Link
            href="/collections"
            className="group relative inline-flex items-center pl-6 pr-2 py-4 font-inter text-sm tracking-[0.04em] text-[#292722]"
          >
            {/* Outer circle */}
            <span className="absolute inset-0 rounded-full border border-[#292722]/70 transition-transform duration-300 ease-linear group-hover:scale-0" />

            {/* Text */}
            <span className="relative z-10 whitespace-nowrap transition-transform duration-300 ease-out group-hover:-translate-x-1">
              Découvrir la collection
            </span>

            {/* Arrow circle */}
            <span className="absolute left-full top-1/2 flex h-8 w-8 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-[#292722] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21 12"
                className="h-3.5 w-3.5 fill-white"
              >
                <path d="M17.104 5.072l-4.138-4.014L14.056 0l6 5.82-6 5.82-1.09-1.057 4.138-4.014H0V5.072h17.104z" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
