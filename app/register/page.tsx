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
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
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
        error instanceof Error
          ? error.message
          : "Une erreur est survenue"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#E8E5E0]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT ================= */}
        <div className="hidden flex-col justify-between bg-[#C8C5C0] px-12 py-14 lg:flex xl:px-20">

          {/* Decorative text */}
          <div>
            <p className="font-jost text-[11px] uppercase tracking-[0.35em] text-black/40">
              L&apos;univers
            </p>

            <h1 className="mt-8 font-jost text-7xl font-light uppercase leading-none tracking-[0.08em] xl:text-8xl">
              ALLURE
            </h1>

            <div className="mt-8 h-px w-24 bg-black/30" />
          </div>

          <div className="max-w-md">
            <p className="font-jost text-lg font-light leading-8 text-black/55 xl:text-xl">
              Créez votre espace personnel et découvrez une expérience
              pensée autour de votre style.
            </p>

            <p className="mt-8 font-jost text-[11px] uppercase tracking-[0.25em] text-black/30">
              Élégance · Simplicité · Allure
            </p>
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex min-h-screen flex-col justify-center bg-[#E8E5E0] px-7 py-14 sm:px-12 lg:px-16 xl:px-24">

          {/* Mobile logo */}
          <div className="mb-14 lg:hidden">
            <p className="font-jost text-3xl font-light uppercase tracking-[0.15em]">
              ALLURE
            </p>
          </div>

          {/* Header */}
          <div className="mb-12">
            <p className="mb-5 font-jost text-[11px] uppercase tracking-[0.35em] text-black/40">
              Nouvel espace
            </p>

            <h2 className="font-jost text-4xl font-light uppercase leading-tight tracking-[0.06em] sm:text-5xl">
              Créer un compte
            </h2>

            <p className="mt-5 max-w-md font-jost text-base leading-7 text-black/50">
              Rejoignez ALLURE et créez votre espace personnel.
            </p>
          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleRegister}
            className="space-y-8"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-4 block font-jost text-[11px] uppercase tracking-[0.25em] text-black/50"
              >
                Nom complet
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                required
                className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 font-jost text-base text-black placeholder:text-black/25 outline-none transition-all duration-300 focus:border-black"
              />
            </div>

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
                required
                className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 font-jost text-base text-black placeholder:text-black/25 outline-none transition-all duration-300 focus:border-black"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-4 block font-jost text-[11px] uppercase tracking-[0.25em] text-black/50"
              >
                Mot de passe
              </label>

              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 font-jost text-base text-black placeholder:text-black/25 outline-none transition-all duration-300 focus:border-black"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-4 block font-jost text-[11px] uppercase tracking-[0.25em] text-black/50"
              >
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border-0 border-b border-black/20 bg-transparent px-0 py-4 font-jost text-base text-black placeholder:text-black/25 outline-none transition-all duration-300 focus:border-black"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-300 bg-red-50 px-4 py-3">
                <p className="font-jost text-xs text-red-600">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="border border-green-300 bg-green-50 px-4 py-3">
                <p className="font-jost text-xs text-green-700">
                  {success}
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full items-center justify-center gap-8 bg-black px-8 py-5 font-jost text-[11px] uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>
                {loading ? "Création..." : "Créer mon compte"}
              </span>

              {!loading && (
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                  strokeWidth={1.2}
                />
              )}
            </button>
          </form>

          {/* Login */}
          <div className="mt-12 border-t border-black/10 pt-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="font-jost text-[11px] uppercase tracking-[0.15em] text-black/40">
                Vous avez déjà un compte ?
              </p>

              <Link
                href="/login"
                className="font-jost text-xs uppercase tracking-[0.2em] text-black underline underline-offset-8 transition-opacity hover:opacity-50"
              >
                Se connecter
              </Link>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}