"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data.message || "Erreur de connexion",
        );
      }

      window.location.href = "/";
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT — BRAND PANEL */}
        <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#E8E2D9] px-12 py-14 lg:flex xl:px-20">
          <div>
            <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#292722]/45">
              Elegance · Simplicity · Allure
            </p>
          </div>

          <div className="relative z-10">
            <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-[#292722]/45">
              Bienvenue dans
            </p>

            <h1 className="mt-7 font-playfair text-7xl font-light uppercase leading-none tracking-[0.1em] text-[#292722] xl:text-8xl">
              ALLURE
            </h1>

            <div className="mt-8 h-px w-20 bg-[#B49A78]" />

            <p className="mt-12 max-w-md font-inter text-lg font-light leading-9 text-[#292722]/65 xl:text-xl">
              Votre espace personnel pour retrouver vos commandes,
              découvrir vos pièces favorites et profiter pleinement
              de l&apos;univers ALLURE.
            </p>

            <p className="mt-8 font-inter text-[10px] uppercase tracking-[0.25em] text-[#292722]/40">
              Votre style. Votre espace.
            </p>
          </div>

          <div>
            <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-[#292722]/35">
              © {new Date().getFullYear()} ALLURE
            </p>
          </div>

          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full border border-[#B49A78]/20" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-[#B49A78]/20" />
        </section>

        {/* RIGHT — LOGIN */}
        <section className="flex min-h-screen flex-col justify-center bg-[#F8F6F2] px-7 py-12 sm:px-14 lg:px-16 xl:px-24">

          {/* Mobile logo */}
          <div className="mb-16 lg:hidden">
            <p className="font-playfair text-3xl font-light uppercase tracking-[0.15em] text-[#292722]">
              ALLURE
            </p>
            <div className="mt-4 h-px w-12 bg-[#B49A78]" />
          </div>

          <div className="mx-auto w-full max-w-md">

            {/* Header */}
            <div className="mb-12">
              <p className="mb-5 font-inter text-[10px] uppercase tracking-[0.35em] text-[#B49A78]">
                Espace client
              </p>

              <h2 className="font-playfair text-4xl font-light uppercase leading-tight tracking-[0.06em] text-[#292722] sm:text-5xl">
                Connexion
              </h2>

              <p className="mt-5 max-w-sm font-inter text-sm leading-7 text-[#292722]/55">
                Connectez-vous à votre compte pour accéder à votre espace personnel.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-9" onSubmit={handleLogin}>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block font-inter text-[10px] uppercase tracking-[0.22em] text-[#292722]/60"
                >
                  Adresse e-mail
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  autoComplete="email"
                  required
                  className="w-full border-0 border-b border-[#292722]/20 bg-transparent px-0 py-4 font-inter text-sm text-[#292722] placeholder:text-[#292722]/30 outline-none transition-colors duration-300 focus:border-[#B49A78]"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="font-inter text-[10px] uppercase tracking-[0.22em] text-[#292722]/60"
                  >
                    Mot de passe
                  </label>

                  <Link
                    href="#"
                    className="font-inter text-[10px] tracking-wide text-[#292722]/45 transition-colors hover:text-[#B49A78]"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full border-0 border-b border-[#292722]/20 bg-transparent px-0 py-4 font-inter text-sm text-[#292722] placeholder:text-[#292722]/30 outline-none transition-colors duration-300 focus:border-[#B49A78]"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="border border-red-900/15 bg-red-900/[0.04] px-4 py-3">
                  <p className="font-inter text-sm text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-3 flex w-full items-center justify-center gap-5 bg-[#292722] px-8 py-[18px] font-inter text-[10px] uppercase tracking-[0.28em] text-white transition-all duration-300 hover:bg-[#B49A78] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? "Connexion..." : "Se connecter"}</span>

                {!loading && (
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    strokeWidth={1.4}
                  />
                )}
              </button>

              {/* Register */}
              <div className="mt-12 border-t border-[#292722]/10 pt-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-inter text-[10px] uppercase tracking-[0.12em] text-[#292722]/45">
                    Vous n&apos;avez pas encore de compte ?
                  </p>

                  <Link
                    href="/register"
                    className="w-fit font-inter text-[10px] uppercase tracking-[0.2em] text-[#292722] underline decoration-[#B49A78] underline-offset-8 transition-opacity hover:opacity-50"
                  >
                    Créer un compte
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
