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
          body: JSON.stringify({
            email,
            password,
          }),
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

      // Le backend crée déjà les cookies HttpOnly
      // accessToken + refreshToken

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
    <main className="min-h-screen bg-[#E8E5E0]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ================= LEFT ================= */}
        <div className="hidden min-h-screen flex-col justify-between bg-[#C8C5C0] px-12 py-14 lg:flex xl:px-20">
          {/* Decorative text */}
          <div>
            <p className="font-jost text-[11px] uppercase tracking-[0.35em] text-black/40">
              Elegance · Simplicity · Allure
            </p>
          </div>

          <div>
            <div>
              <p className="font-jost text-[11px] uppercase tracking-[0.35em] text-black/40">
                Bienvenue dans
              </p>

              <h1 className="mt-8 font-jost text-7xl font-light uppercase leading-none tracking-[0.08em] xl:text-8xl">
                ALLURE
              </h1>

              <div className="mt-8 h-px w-24 bg-black/30" />
            </div>

            <div className="mt-20 max-w-md">
              <p className="font-jost text-lg font-light leading-8 text-black/55 xl:text-xl">
                Votre espace personnel pour retrouver vos commandes, découvrir
                vos pièces favorites et profiter pleinement de l&apos;univers
                ALLURE.
              </p>

              <p className="mt-8 font-jost text-[11px] uppercase tracking-[0.25em] text-black/30">
                Votre style. Votre espace.
              </p>
            </div>
          </div>

          <div>
            <p className="font-jost text-[10px] uppercase tracking-[0.25em] text-black/30">
              © {new Date().getFullYear()} ALLURE
            </p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex min-h-screen flex-col justify-center bg-[#E8E5E0] px-7 py-14 sm:px-12 lg:px-16 xl:px-24">
          {/* Mobile logo */}
          <div className="mb-14 lg:hidden">
            <p className="font-jost text-3xl font-light uppercase tracking-[0.15em] text-black">
              ALLURE
            </p>
          </div>

          {/* Header */}
          <div className="mb-12">
            <p className="mb-5 font-jost text-[11px] uppercase tracking-[0.35em] text-black/40">
              Espace client
            </p>

            <h2 className="font-jost text-4xl font-light uppercase leading-tight tracking-[0.06em] text-black sm:text-5xl">
              Connexion
            </h2>

            <p className="mt-5 max-w-md font-jost text-base leading-7 text-black/50">
              Connectez-vous à votre compte pour accéder à votre espace
              personnel.
            </p>
          </div>

          {/* ================= FORM ================= */}
          <form className="space-y-9" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-4 block font-jost text-[11px] uppercase tracking-[0.25em] text-black/50"
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
                className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 font-jost text-base text-black placeholder:text-black/25 outline-none transition-all duration-300 focus:border-black"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <label
                  htmlFor="password"
                  className="font-jost text-[11px] uppercase tracking-[0.25em] text-black/50"
                >
                  Mot de passe
                </label>

                <Link
                  href="#"
                  className="font-jost text-[10px] uppercase tracking-[0.18em] text-black/40 transition-colors hover:text-black"
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
                className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 font-jost text-base text-black placeholder:text-black/25 outline-none transition-all duration-300 focus:border-black"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 cursor-pointer border-black/20 accent-black"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer font-jost text-[11px] uppercase tracking-[0.15em] text-black/45"
              >
                Se souvenir de moi
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-900/15 bg-red-900/5 px-4 py-3">
                <p className="font-jost text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full items-center justify-center gap-8 bg-black px-8 py-5 font-jost text-[11px] uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{loading ? "Connexion..." : "Se connecter"}</span>

              {!loading && (
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                  strokeWidth={1.2}
                />
              )}
            </button>

            {/* Register */}
            <div className="mt-12 border-t border-black/10 pt-9">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-black/40">
                  Vous n&apos;avez pas encore de compte ?
                </p>

                <Link
                  href="/register"
                  className="font-jost text-xs uppercase tracking-[0.2em] text-black underline underline-offset-8 transition-opacity hover:opacity-50"
                >
                  Créer un compte
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
