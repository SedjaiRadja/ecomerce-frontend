import ProductCollection from "@/components/ProductCollection";

type ProductsPageProps = {
  searchParams: Promise<{ genre?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { genre } = await searchParams;

  const validGenres = ["femme", "homme", "enfant"] as const;

  const selectedGenre = validGenres.includes(
    genre as (typeof validGenres)[number],
  )
    ? (genre as (typeof validGenres)[number])
    : undefined;

  return (
    <ProductCollection key={selectedGenre ?? "all"} genre={selectedGenre} />
  );
}
