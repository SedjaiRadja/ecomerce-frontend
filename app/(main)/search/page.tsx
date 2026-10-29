"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = query.trim();
    if (!value) return;

    router.push(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher un produit..."
      />

      <button type="submit">Rechercher</button>
    </form>
  );
}
