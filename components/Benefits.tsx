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
    <section className="w-full border-y border-beige bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className="flex items-center gap-3 border-beige px-4 py-7 md:border-r md:px-6 md:py-9 last:border-r-0"
            >
              <Icon
                className="h-8 w-8 shrink-0 text-charcoal sm:h-9 sm:w-9"
                strokeWidth={1.2}
              />

              <div>
                <h3 className="font-inter text-[12px] font-medium text-charcoal sm:text-sm">
                  {benefit.title}
                </h3>

                <p className="mt-1 font-inter text-[10px] leading-4 text-charcoal/65 sm:text-[11px]">
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
