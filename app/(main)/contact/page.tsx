"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="bg-[#D9D6D1] text-black">
      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-20 sm:px-10 lg:px-16 lg:pb-28 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-6 font-jost text-[10px] uppercase tracking-[0.3em] text-black/40 sm:text-[11px]">
              Contact
            </p>

            <h1 className="max-w-4xl font-jost text-5xl font-light uppercase leading-[0.95] tracking-[0.05em] sm:text-6xl lg:text-8xl">
              Parlons
              <br />
              ensemble.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-sm font-jost text-sm leading-7 text-black/55 lg:text-[15px]">
              Une question, une commande ou simplement envie d&apos;en savoir
              plus sur notre univers ? Écrivez-nous, nous serons ravis de vous
              répondre.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT + FORM */}
      <section className="border-y border-black/10">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-12">
          {/* INFORMATION */}
          <aside className="border-b border-black/10 px-6 py-12 sm:px-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-16 lg:py-16">
            <p className="mb-10 font-jost text-[10px] uppercase tracking-[0.25em] text-black/40">
              Informations
            </p>

            <div className="space-y-10">
              {/* EMAIL */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Mail className="h-4 w-4 text-black/50" strokeWidth={1.2} />

                  <span className="font-jost text-[10px] uppercase tracking-[0.2em] text-black/40">
                    E-mail
                  </span>
                </div>

                <a
                  href="mailto:contact@allure.com"
                  className="font-jost text-sm transition-opacity duration-300 hover:opacity-50 sm:text-base"
                >
                  contact@allure.com
                </a>
              </div>

              {/* PHONE */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Phone className="h-4 w-4 text-black/50" strokeWidth={1.2} />

                  <span className="font-jost text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Téléphone
                  </span>
                </div>

                <a
                  href="tel:+213559246708"
                  className="font-jost text-sm transition-opacity duration-300 hover:opacity-50 sm:text-base"
                >
                  +2135 59 24 67 08
                </a>
              </div>

              {/* INSTAGRAM */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <FaInstagram className="h-4 w-4 text-black/50" />

                  <span className="font-jost text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Instagram
                  </span>
                </div>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 font-jost text-sm transition-opacity duration-300 hover:opacity-50 sm:text-base"
                >
                  @allure
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.2} />
                </a>
              </div>
            </div>

            {/* DISPONIBILITÉ */}
            <div className="mt-16 border-t border-black/10 pt-8">
              <p className="mb-3 font-jost text-[10px] uppercase tracking-[0.2em] text-black/40">
                Disponibilité
              </p>

              <p className="font-jost text-sm leading-6 text-black/55">
                Samedi — Jeudi
                <br />
                09:00 — 18:00
              </p>
            </div>
          </aside>

          {/* FORMULAIRE */}
          <div className="px-6 py-12 sm:px-10 lg:col-span-8 lg:px-20 lg:py-16">
            <div className="mb-12">
              <p className="mb-3 font-jost text-[10px] uppercase tracking-[0.25em] text-black/40">
                Envoyez-nous un message
              </p>

              <h2 className="font-jost text-2xl font-light uppercase tracking-[0.06em] sm:text-3xl">
                Comment pouvons-nous vous aider ?
              </h2>
            </div>

            <form className="space-y-9">
              {/* NOM + EMAIL */}
              <div className="grid gap-9 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-3 block font-jost text-[10px] uppercase tracking-[0.2em] text-black/50"
                  >
                    Nom
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Votre nom"
                    required
                    className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 font-jost text-sm placeholder:text-black/30 focus:border-black focus:outline-none focus:ring-0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block font-jost text-[10px] uppercase tracking-[0.2em] text-black/50"
                  >
                    E-mail
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Votre adresse e-mail"
                    required
                    className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 font-jost text-sm placeholder:text-black/30 focus:border-black focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* SUJET */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-3 block font-jost text-[10px] uppercase tracking-[0.2em] text-black/50"
                >
                  Sujet
                </label>

                <select
                  id="subject"
                  name="subject"
                  defaultValue=""
                  className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 font-jost text-sm text-black focus:border-black focus:outline-none focus:ring-0"
                >
                  <option value="" disabled>
                    Sélectionnez un sujet
                  </option>

                  <option value="commande">
                    Question concernant une commande
                  </option>

                  <option value="livraison">Livraison</option>

                  <option value="retour">Retour ou échange</option>

                  <option value="produit">
                    Question concernant un produit
                  </option>

                  <option value="autre">Autre demande</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block font-jost text-[10px] uppercase tracking-[0.2em] text-black/50"
                >
                  Votre message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Écrivez votre message..."
                  required
                  className="w-full resize-none border-0 border-b border-black/20 bg-transparent px-0 py-3 font-jost text-sm leading-6 placeholder:text-black/30 focus:border-black focus:outline-none focus:ring-0"
                />
              </div>

              {/* BOUTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-8 bg-black px-8 py-4 font-jost text-[10px] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-black/80"
                >
                  Envoyer le message
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1.2}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* INFORMATIONS SUPPLÉMENTAIRES */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="grid gap-10 border-t border-black/10 pt-10 sm:grid-cols-3">
          {/* LIVRAISON */}
          <div>
            <p className="mb-4 font-jost text-[10px] uppercase tracking-[0.25em] text-black/40">
              Livraison
            </p>

            <h3 className="mb-3 font-jost text-lg font-light uppercase tracking-[0.08em]">
              Partout en Algérie
            </h3>

            <p className="max-w-xs font-jost text-sm leading-6 text-black/50">
              Nous préparons chaque commande avec soin et assurons la livraison
              partout en Algérie.
            </p>
          </div>

          {/* RETOURS */}
          <div>
            <p className="mb-4 font-jost text-[10px] uppercase tracking-[0.25em] text-black/40">
              Retours & échanges
            </p>

            <h3 className="mb-3 font-jost text-lg font-light uppercase tracking-[0.08em]">
              Simple & transparent
            </h3>

            <p className="max-w-xs font-jost text-sm leading-6 text-black/50">
              Une pièce ne vous convient pas ? Contactez-nous pour connaître les
              conditions de retour ou d&apos;échange.
            </p>
          </div>

          {/* ASSISTANCE */}
          <div>
            <p className="mb-4 font-jost text-[10px] uppercase tracking-[0.25em] text-black/40">
              Assistance
            </p>

            <h3 className="mb-3 font-jost text-lg font-light uppercase tracking-[0.08em]">
              Nous sommes là
            </h3>

            <p className="max-w-xs font-jost text-sm leading-6 text-black/50">
              Notre équipe est disponible pour répondre à vos questions avant et
              après votre commande.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
