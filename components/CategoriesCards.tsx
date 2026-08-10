import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "WOMEN",
    description: "Discover our collection",
    image: "/categories/women.png",
    href: "/products?gender=women",
  },
  {
    title: "MEN",
    description: "Discover our collection",
    image: "/categories/men.png",
    href: "/products?gender=men",
  },
  {
    title: "KIDS",
    description: "Discover our collection",
    image: "/categories/kids.png",
    href: "/products?gender=unisex",
  },
];

export default function Categories() {
  return (
    <section className="w-full bg-[#0a0a0a] px-3 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-7 flex items-end justify-between sm:mb-10">
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/40 sm:text-[10px]">
              Explore
            </p>

            <h2 className="font-jost text-xl font-light tracking-[0.12em] text-white sm:text-2xl">
              SHOP BY CATEGORY
            </h2>
          </div>

          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/40 sm:block">
            03 Collections
          </span>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden border border-white/10 bg-[#101010]"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden sm:h-[430px]">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={800}
                  height={1200}
                  className="
                  absolute
                  bottom-0
                  left-1/2
                  h-full
                  w-auto
                  max-w-none
                  -translate-x-1/2
                  object-contain
                  object-bottom
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
                />
              </div>

              {/* Content */}
              <div className="relative flex min-h-[105px] flex-col justify-between border-t border-white/10 p-3 sm:min-h-[135px] sm:p-5">
                <div>
                  <h3 className="text-[10px] font-medium tracking-[0.18em] text-white sm:text-sm sm:tracking-[0.25em]">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-[8px] leading-3 text-white/40 sm:mt-2 sm:text-[10px] sm:leading-4">
                    {category.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[7px] uppercase tracking-[0.2em] text-white/70 sm:text-[9px]">
                    Shop now
                  </span>

                  <span className="text-xs text-white/50 transition-transform duration-300 group-hover:translate-x-1 sm:text-sm">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
