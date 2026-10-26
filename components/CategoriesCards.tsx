import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "FEMMES",
    description: "Découvrez notre collection",
    image: "/categories/women.png",
    href: "/products?genre=femme",
  },
  {
    title: "HOMMES",
    description: "Découvrez notre collection",
    image: "/categories/men.png",
    href: "/products?genre=homme",
  },
  {
    title: "ENFANTS",
    description: "Découvrez notre collection",
    image: "/categories/kids.png",
    href: "/products?genre=enfant",
  },
];

export default function Categories() {
  return (
    <section className="w-full bg-white px-3 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-7 flex items-end justify-between sm:mb-10">
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-[#292722]/60 sm:text-[10px]">
              Découvrir
            </p>

            <h2 className="font-playfair text-xl font-light tracking-[0.12em] text-[#292722] sm:text-2xl">
              NOS CATÉGORIES
            </h2>
          </div>

          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#292722]/55 sm:block">
            03 COLLECTIONS
          </span>
        </div>

        {/* Catégories */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              aria-label={`Découvrir la collection ${category.title.toLowerCase()}`}
              className="group relative overflow-hidden border border-[#E8E2D9] bg-white transition-colors duration-300 hover:border-[#B49A78]"
            >
              {/* Image : dimensions et cadrage conservés */}
              <div className="relative h-44 overflow-hidden bg-[#F8F6F2] sm:h-[430px]">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={800}
                  height={1200}
                  sizes="(max-width: 640px) 33vw, (max-width: 1280px) 30vw, 400px"
                  className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Informations */}
              <div className="relative flex min-h-[105px] flex-col justify-between border-t border-[#E8E2D9] bg-white p-3 sm:min-h-[135px] sm:p-5">
                <div>
                  <h3 className="text-[9px] font-medium tracking-[0.12em] text-[#292722] sm:text-sm sm:tracking-[0.25em]">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-[8px] leading-3 text-[#292722]/60 sm:mt-2 sm:text-[10px] sm:leading-4">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[7px] uppercase tracking-[0.16em] text-[#292722]/75 transition-colors duration-300 group-hover:text-[#B49A78] sm:text-[9px] sm:tracking-[0.2em]">
                    Découvrir
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xs text-[#B49A78] transition-transform duration-300 group-hover:translate-x-1 sm:text-sm"
                  >
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
