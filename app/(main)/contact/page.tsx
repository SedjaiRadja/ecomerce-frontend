"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Mail, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect this handler to your contact API when it is ready.
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F6F2] text-[#292722]">
      {/* HERO */}
      <section className="relative border-b border-[#E8E2D9] px-5 pb-14 pt-16 sm:px-10 sm:pb-20 sm:pt-24 lg:px-16 lg:pt-28">
        <div className="absolute right-[8%] top-16 hidden h-32 w-32 rounded-full border border-[#B49A78]/30 lg:block" />
        <div className="absolute right-[11%] top-[4.7rem] hidden h-20 w-20 rounded-full border border-[#B49A78]/20 lg:block" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-px w-8 bg-[#B49A78]" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#777168]">
              The Allure Experience
            </span>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <h1 className="font-playfair text-[clamp(3.8rem,10vw,9rem)] leading-[0.88] tracking-[-0.065em]">
                Let&apos;s make
                <br />
                it <span className="italic text-[#B49A78]">personal.</span>
              </h1>

              <div className="mt-9 flex items-start gap-4 sm:ml-[30%] sm:mt-12">
                <ArrowDownRight
                  size={25}
                  strokeWidth={1}
                  className="mt-1 shrink-0 text-[#B49A78]"
                />
                <p className="max-w-sm text-sm leading-7 text-[#777168]">
                  A question, a thought, or simply a little help choosing.
                  We&apos;re here to make your Allure experience exceptional.
                </p>
              </div>
            </div>

            <div className="hidden pb-2 lg:block">
              <p className="border-l border-[#B49A78] pl-5 font-playfair text-2xl italic leading-relaxed text-[#777168]">
                Good things begin
                <br />
                with a conversation.
              </p>
              <p className="mt-6 pl-5 text-[9px] uppercase tracking-[0.3em] text-[#999187]">
                Consider this your invitation.
              </p>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-[#E8E2D9] pt-5 text-[9px] uppercase tracking-[0.25em] text-[#999187] sm:mt-20">
            <span>01 — Get in touch</span>
            <span>Oran, Algeria</span>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          {/* LEFT: CONTACT DETAILS */}
          <aside className="flex flex-col">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#B49A78]">
                We&apos;re listening
              </span>

              <h2 className="mt-5 font-playfair text-4xl leading-tight tracking-tight sm:text-5xl">
                Here for
                <br />
                <span className="italic">every detail.</span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-[#777168]">
                Personal service is part of the experience. Reach out and
                let&apos;s find the right answer together.
              </p>
            </div>

            <div className="mt-12 border-t border-[#E8E2D9]">
              <a
                href="mailto:contact@allure.com"
                className="group flex items-center justify-between gap-4 border-b border-[#E8E2D9] py-6"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E2D9] transition-colors duration-300 group-hover:border-[#B49A78]">
                    <Mail size={17} strokeWidth={1.3} />
                  </span>
                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#999187]">
                      Write to us
                    </p>
                    <p className="text-sm">contact@allure.com</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.3}
                  className="shrink-0 text-[#B49A78] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="tel:+213559246708"
                className="group flex items-center justify-between gap-4 border-b border-[#E8E2D9] py-6"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8E2D9] transition-colors duration-300 group-hover:border-[#B49A78]">
                    <Phone size={17} strokeWidth={1.3} />
                  </span>
                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#999187]">
                      Call us
                    </p>
                    <p className="text-sm">+213 559 24 67 08</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.3}
                  className="shrink-0 text-[#B49A78] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#"
                aria-label="Allure Instagram"
                className="group flex items-center justify-between gap-4 border-b border-[#E8E2D9] py-6"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#999187]">
                      Follow our world
                    </p>
                    <p className="text-sm">@allure</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={17}
                  strokeWidth={1.3}
                  className="shrink-0 text-[#B49A78] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="mt-10 flex items-start gap-4">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#52745B]" />
              <div>
                <p className="text-xs font-medium">We&apos;re available</p>
                <p className="mt-2 text-xs leading-6 text-[#777168]">
                  Saturday — Thursday
                  <br />
                  09:00 — 18:00
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT: CONTACT FORM */}
          <div className="relative bg-white p-6 sm:p-10 lg:p-12">
            <div className="absolute right-6 top-6 text-[9px] uppercase tracking-[0.25em] text-[#B49A78] sm:right-10 sm:top-10">
              Contact / 001
            </div>

            <div className="mb-10 mt-8 sm:mb-12 sm:mt-6">
              <h2 className="font-playfair text-3xl tracking-tight sm:text-4xl">
                Tell us what&apos;s on your mind.
              </h2>
              <p className="mt-3 text-xs leading-6 text-[#777168]">
                Fill in the details below. We&apos;ll take it from here.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="group">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-[#777168]"
                  >
                    Your name <span className="text-[#B49A78]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="How should we call you?"
                    className="w-full border-0 border-b border-[#E8E2D9] bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#B6B0A7] focus:border-[#B49A78]"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-[#777168]"
                  >
                    Email address <span className="text-[#B49A78]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border-0 border-b border-[#E8E2D9] bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-[#B6B0A7] focus:border-[#B49A78]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-[#777168]"
                >
                  What can we help with?{" "}
                  <span className="text-[#B49A78]">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full appearance-none border-0 border-b border-[#E8E2D9] bg-transparent px-0 py-3 text-sm text-[#777168] outline-none transition-colors focus:border-[#B49A78]"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="commande">Order & payment</option>
                  <option value="livraison">Delivery</option>
                  <option value="retour">Returns & exchanges</option>
                  <option value="produit">Product information</option>
                  <option value="autre">Something else</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-[#777168]"
                >
                  Your message <span className="text-[#B49A78]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us a little more..."
                  className="w-full resize-y border-0 border-b border-[#E8E2D9] bg-transparent px-0 py-3 text-sm leading-7 outline-none transition-colors placeholder:text-[#B6B0A7] focus:border-[#B49A78]"
                />
              </div>

              <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-[10px] leading-5 text-[#999187]">
                  Your details stay private and are used only to respond to your
                  request.
                </p>
                <button
                  type="submit"
                  className="group inline-flex min-h-10 shrink-0 items-center justify-center gap-5 bg-[#292722] px-5 py-2.5 text-[9px] uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#B49A78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B49A78]"
                >
                  Send your message
                  <Send
                    size={12}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {submitted && (
                <p
                  role="status"
                  className="border border-[#52745B]/20 bg-[#52745B]/5 px-4 py-3 text-xs leading-6 text-[#52745B]"
                >
                  Thank you for reaching out. The form is ready, but message
                  delivery still needs to be connected to the Allure backend.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* SERVICE STRIP */}
      <section className="border-y border-[#E8E2D9] bg-[#F1EDE6] px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3 sm:gap-8">
          <div className="sm:border-r sm:border-[#DCD4C8] sm:pr-8">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B49A78]">
              01 / Delivery
            </span>
            <h3 className="mt-4 font-playfair text-2xl">Across Algeria.</h3>
            <p className="mt-3 max-w-xs text-xs leading-6 text-[#777168]">
              Your next favourite piece, delivered to your doorstep.
            </p>
          </div>

          <div className="sm:border-r sm:border-[#DCD4C8] sm:pr-8">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B49A78]">
              02 / Returns
            </span>
            <h3 className="mt-4 font-playfair text-2xl">Feel confident.</h3>
            <p className="mt-3 max-w-xs text-xs leading-6 text-[#777168]">
              Need a different size or have a concern? We&apos;re here to help.
            </p>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B49A78]">
              03 / Assistance
            </span>
            <h3 className="mt-4 font-playfair text-2xl">A human touch.</h3>
            <p className="mt-3 max-w-xs text-xs leading-6 text-[#777168]">
              Thoughtful support, because the little details matter.
            </p>
          </div>
        </div>
      </section>

      {/* SIGNATURE */}
      <footer className="px-5 py-16 text-center sm:py-20">
        <p className="text-[9px] uppercase tracking-[0.35em] text-[#999187]">
          Until we speak
        </p>
        <p className="mt-5 font-playfair text-4xl tracking-tight sm:text-6xl">
          With love, <span className="italic text-[#B49A78]">Allure.</span>
        </p>
        <div className="mx-auto mt-7 h-px w-12 bg-[#B49A78]" />
        <p className="mt-5 text-[9px] uppercase tracking-[0.25em] text-[#999187]">
          Made for the way you feel.
        </p>
      </footer>
    </main>
  );
}
