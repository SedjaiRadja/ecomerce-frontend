"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la création du compte");
      }

      setSuccess("Votre compte a été créé avec succès.");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border-0 border-b border-[#292722]/20 bg-transparent px-0 py-3.5 font-inter text-sm text-[#292722] placeholder:text-[#292722]/30 outline-none transition-colors duration-300 focus:border-[#B49A78]";

  const labelClass =
    "mb-3 block font-inter text-[10px] uppercase tracking-[0.22em] text-[#292722]/60";

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
              Entrez dans
            </p>

            <h1 className="mt-7 font-playfair text-7xl font-light uppercase leading-none tracking-[0.1em] text-[#292722] xl:text-8xl">
              ALLURE
            </h1>

            <div className="mt-8 h-px w-20 bg-[#B49A78]" />

            <p className="mt-12 max-w-md font-inter text-lg font-light leading-9 text-[#292722]/65 xl:text-xl">
              Créez votre espace personnel et découvrez une expérience pensée
              autour de votre style.
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

          {/* Subtle decorative circles */}
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full border border-[#B49A78]/20" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-[#B49A78]/20" />
        </section>

        {/* RIGHT — REGISTER FORM */}
        <section className="flex min-h-screen flex-col justify-center bg-[#F8F6F2] px-7 py-10 sm:px-14 lg:px-16 xl:px-24">
          {/* Mobile logo */}
          <div className="mb-12 lg:hidden">
            <p className="font-playfair text-3xl font-light uppercase tracking-[0.15em] text-[#292722]">
              ALLURE
            </p>

            <div className="mt-4 h-px w-12 bg-[#B49A78]" />
          </div>

          <div className="mx-auto w-full max-w-md">
            {/* Header */}
            <div className="mb-10">
              <p className="mb-4 font-inter text-[10px] uppercase tracking-[0.35em] text-[#B49A78]">
                Nouvel espace
              </p>

              <h2 className="font-playfair text-4xl font-light uppercase leading-tight tracking-[0.04em] text-[#292722] sm:text-5xl">
                Créer un compte
              </h2>

              <p className="mt-4 max-w-sm font-inter text-sm leading-7 text-[#292722]/55">
                Rejoignez ALLURE et créez votre espace personnel.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Nom complet
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
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
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Mot de passe
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className={inputClass}
                />

                <p className="mt-2 font-inter text-[11px] text-[#292722]/40">
                  6 caractères minimum
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirmer le mot de passe
                </label>

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className={inputClass}
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="border border-red-900/15 bg-red-900/[0.04] px-4 py-3"
                >
                  <p className="font-inter text-sm leading-6 text-red-700">
                    {error}
                  </p>
                </div>
              )}

              {/* Success */}
              {success && (
                <div
                  role="status"
                  className="border border-[#52745B]/20 bg-[#52745B]/[0.06] px-4 py-3"
                >
                  <p className="font-inter text-sm leading-6 text-[#52745B]">
                    {success}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-3 flex w-full items-center justify-center gap-5 bg-[#292722] px-8 py-[18px] font-inter text-[10px] uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:bg-[#B49A78] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? "Création..." : "Créer mon compte"}</span>

                {!loading && (
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                    strokeWidth={1.4}
                  />
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-10 border-t border-[#292722]/10 pt-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-inter text-[10px] uppercase tracking-[0.12em] text-[#292722]/45">
                  Vous avez déjà un compte ?
                </p>

                <Link
                  href="/login"
                  className="w-fit font-inter text-[10px] uppercase tracking-[0.2em] text-[#292722] underline decoration-[#B49A78] underline-offset-8 transition-opacity hover:opacity-50"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
