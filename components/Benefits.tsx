import { BadgeCheck, RotateCcw, Gift, Truck } from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Styles soigneusement sélectionnés",
    description: "Des pièces choisies avec attention",
  },
  {
    icon: RotateCcw,
    title: "Retours faciles",
    description: "Sous 14 jours",
  },
  {
    icon: Gift,
    title: "Avantages membres",
    description: "Des offres exclusives pour vous",
  },
  {
    icon: Truck,
    title: "Livraison offerte",
    description: "Pour toute commande éligible",
  },
];

export default function Benefits() {
  return (
    <section className="w-full border-y border-black/10 bg-[#C8C5C0]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="
                flex
                items-center
                gap-3
                border-black/10
                px-4
                py-7
                md:border-r
                md:px-6
                md:py-9
                last:border-r-0
              "
            >
              {/* Icon */}
              <Icon
                className="h-8 w-8 shrink-0 text-black sm:h-9 sm:w-9"
                strokeWidth={1.2}
              />

              {/* Text */}
              <div>
                <h3 className="font-jost text-[12px] font-medium text-black sm:text-sm">
                  {benefit.title}
                </h3>

                <p className="mt-1 font-jost text-[10px] leading-4 text-black/60 sm:text-[11px]">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
