import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#E8E5E0]">
      {/* Our Story */}
      <section className="bg-[#D9D6D1]">
        <div className="mx-auto grid max-w-screen-xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
          {/* Content */}
          <div className="font-light text-black/60">
            <p className="mb-4 font-jost text-[10px] uppercase tracking-[0.32em] text-black/40 sm:text-[11px]">
              À propos d&apos;Allure
            </p>

            <h2 className="mb-8 max-w-xl font-jost text-4xl font-light uppercase leading-[1.15] tracking-[0.07em] text-black sm:text-5xl lg:text-[54px]">
              L&apos;élégance
              <br />
              dans chaque détail.
            </h2>

            <div className="max-w-xl space-y-6">
              <p className="font-jost text-sm leading-7 text-black/60 lg:text-[15px] lg:leading-8">
                Allure est née d&apos;une vision simple : proposer une mode
                élégante, contemporaine et facile à porter au quotidien.
              </p>

              <p className="font-jost text-sm leading-7 text-black/60 lg:text-[15px] lg:leading-8">
                Chaque pièce est sélectionnée avec attention pour son style, sa
                qualité et sa capacité à traverser les tendances. Nous croyons
                que le véritable style se trouve dans la simplicité, les détails
                et la confiance que l&apos;on ressent lorsque l&apos;on porte
                une pièce qui nous ressemble.
              </p>

              <p className="font-jost text-sm leading-7 text-black/60 lg:text-[15px] lg:leading-8">
                Plus qu&apos;une collection, Allure représente un univers pensé
                autour d&apos;une esthétique intemporelle et raffinée.
              </p>
            </div>

            {/* Values */}
            <div className="mt-10 border-t border-black/15 pt-6">
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-6 lg:gap-10">
                {/* Qualité */}
                <div>
                  <p className="mb-2 font-jost text-[11px] uppercase tracking-[0.18em] text-black sm:text-[12px] lg:text-[13px]">
                    Qualité
                  </p>

                  <p className="font-jost text-[11px] leading-6 text-black/45 sm:text-[12px] lg:text-[13px]">
                    Des pièces choisies avec soin.
                  </p>
                </div>

                {/* Simplicité */}
                <div>
                  <p className="mb-2 font-jost text-[11px] uppercase tracking-[0.18em] text-black sm:text-[12px] lg:text-[13px]">
                    Simplicité
                  </p>

                  <p className="font-jost text-[11px] leading-6 text-black/45 sm:text-[12px] lg:text-[13px]">
                    Une esthétique moderne et épurée.
                  </p>
                </div>

                {/* Intemporalité */}
                <div>
                  <p className="mb-2 font-jost text-[11px] uppercase tracking-[0.18em] text-black sm:text-[12px] lg:text-[13px]">
                    Intemporalité
                  </p>

                  <p className="font-jost text-[11px] leading-6 text-black/45 sm:text-[12px] lg:text-[13px]">
                    Un style pensé pour durer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-2">
            <div className="overflow-hidden">
              <img
                src="/images/about-1.jpg"
                alt="Collection Allure"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="mt-10 overflow-hidden sm:mt-16">
              <img
                src="/images/about-2.jpg"
                alt="Univers Allure"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-t border-black/10 bg-[#C8C5C0]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="font-jost text-[9px] uppercase tracking-[0.3em] text-black/40 sm:text-[10px]">
            Notre philosophie
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-jost text-2xl font-light uppercase tracking-[0.1em] text-black sm:text-3xl lg:text-4xl">
            Des pièces qui restent,
            <br />
            au-delà des tendances.
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-jost text-xs leading-6 text-black/55 sm:text-sm sm:leading-7">
            Allure privilégie une esthétique intemporelle, des silhouettes
            élégantes et des pièces faciles à intégrer à votre quotidien.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#E8E5E0]">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row lg:px-8">
          <div>
            <p className="font-jost text-[9px] uppercase tracking-[0.3em] text-black/40 sm:text-[10px]">
              Découvrez Allure
            </p>

            <h2 className="mt-2 font-jost text-xl font-light uppercase tracking-[0.1em] text-black sm:text-2xl">
              Votre prochaine pièce vous attend.
            </h2>
          </div>

          <Link
            href="/products"
            className="group flex items-center gap-2 border-b border-black pb-2 font-jost text-[9px] uppercase tracking-[0.2em] text-black"
          >
            Voir la collection
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.2}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
