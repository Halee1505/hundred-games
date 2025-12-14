import type { Metadata } from "next";
import Link from "next/link";
import CategoryGameGrid from "@/components/category-game-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  Game,
  getAllCategories,
  getCategoryFromSlug,
  getGamesByCategory,
  games,
} from "@/lib/games";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const heroHighlights = [
  "Strategy",
  "Tower Defense",
  "Turn-Based",
  "Co-op",
  "Card Battler",
];
const filterOptions = [
  { label: "Strategy", value: "strategy" },
  { label: "Tower Defense", value: "tower" },
  { label: "Turn-Based", value: "turn" },
  { label: "Card Battler", value: "card" },
];
const ratingOptions = [4.5, 4.0, 3.5];
const quickStats = [
  { label: "Average rating", value: "4.6" },
  { label: "Active players", value: "65K" },
  { label: "Live matches", value: "1.2K" },
  { label: "Tournaments", value: "42" },
];

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = getCategoryFromSlug(slug) ?? "Games";
  const title = `${categoryName} — Hundred Games`;
  const description = `Play curated ${categoryName.toLowerCase()} browser games with instant launch and zero downloads.`;
  return {
    title,
    description,
  };
}

const fallbackRelated = games.slice(0, 12);

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const selectedFilters = query.filters
    ? Array.isArray(query.filters)
      ? query.filters
      : [query.filters]
    : [];
  const selectedRating = query.rating ? Number(query.rating) : undefined;
  const categoryName = getCategoryFromSlug(slug) ?? "Featured";
  const categoryGames = getGamesByCategory(slug);
  const collection: Game[] = categoryGames.length
    ? categoryGames
    : fallbackRelated;
  const heroGame = collection[0];
  const filteredCollection = collection.filter((game) => {
    const haystack = `${game.title} ${game.category} ${game.tags.join(" ")} ${
      game.summary
    }`.toLowerCase();
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((filter) =>
        haystack.includes(filter.toLowerCase())
      );
    const matchesRating = !selectedRating || game.rating >= selectedRating;
    return matchesFilters && matchesRating;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 py-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/category/all" className="hover:text-primary">
            Games
          </Link>
          <span>/</span>
          <span className="text-white">{categoryName}</span>
        </div>

        <section
          className="mb-10 overflow-hidden rounded-3xl border border-surface-accent bg-cover bg-center shadow-2xl"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(16,35,22,1), rgba(16,35,22,0.5)), url(${
              heroGame?.thumbnailUrl ??
              "https://images.unsplash.com/photo-1527449992864-109c5f15b5f3"
            })`,
          }}
        >
          <div className="flex min-h-[360px] flex-col justify-between gap-6 p-6 sm:p-10">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-text-secondary/80">
              <span className="text-primary">Category</span>
              <span>•</span>
              <span>{categoryName}</span>
            </div>
            <div>
              <h1 className="text-4xl font-black leading-tight drop-shadow-lg sm:text-5xl">
                {categoryName} Arena
              </h1>
              <p className="mt-3 max-w-2xl text-base text-gray-200">
                Explore tactical experiences, casual hits, and
                community-favorite titles. All servers run in the cloud for
                lightning-fast play.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {heroHighlights.map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full bg-black/30 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-text-secondary"
                  >
                    {filter}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <Link
                  href={`/game/${heroGame?.slug ?? ""}`}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-background-dark"
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                  Play top pick
                </Link>
                <Link
                  href={`/search?q=${categoryName.toLowerCase()}`}
                  className="flex items-center gap-2 rounded-xl border  border-secondary/60 px-6 py-3 text-sm font-semibold text-text-secondary"
                >
                  <span className="material-symbols-outlined">tune</span>
                  <span className="hidden md:inline">Advanced filters</span>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 md:flex flex-wrap gap-4">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-surface-accent/80 bg-background-dark/70 px-4 py-3 text-center"
                >
                  <p className="text-2xl font-black text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-surface-accent bg-surface-dark/60 p-5 lg:sticky lg:top-28 self-start">
            <form action="" method="get" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                <Link
                  href={`/category/${slug}`}
                  className="text-xs font-bold text-primary"
                >
                  Reset
                </Link>
              </div>

              <details className="filter-panel">
                <summary>
                  Categories
                  <span className="material-symbols-outlined filter-chevron">
                    expand_more
                  </span>
                </summary>
                <div className="collapse-content space-y-3 text-sm text-text-secondary">
                  {filterOptions.map((filter) => (
                    <label
                      key={filter.value}
                      className="flex cursor-pointer items-center gap-3 rounded-lg bg-background-dark/40 px-3 py-2"
                    >
                      <input
                        type="checkbox"
                        name="filters"
                        value={filter.value}
                        defaultChecked={selectedFilters.includes(filter.value)}
                        className="size-4 rounded border-surface-accent bg-transparent text-primary focus:ring-0"
                      />
                      <span>{filter.label}</span>
                    </label>
                  ))}
                </div>
              </details>

              <details className="filter-panel">
                <summary>
                  Ratings
                  <span className="material-symbols-outlined filter-chevron">
                    expand_more
                  </span>
                </summary>
                <div className="collapse-content space-y-2 text-sm text-text-secondary">
                  {ratingOptions.map((score) => (
                    <label
                      key={score}
                      className="flex cursor-pointer items-center gap-3 rounded-lg bg-background-dark/40 px-3 py-2"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={score}
                        defaultChecked={selectedRating === score}
                        className="size-4 border-surface-accent text-primary focus:ring-0"
                      />
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const diff = score - index;
                          let icon = "star";
                          let color = "text-text-secondary/60";
                          if (diff >= 1) {
                            icon = "grade";
                            color = "text-yellow-400";
                          } else if (diff >= 0.5) {
                            icon = "star_half";
                            color = "text-yellow-300";
                          }
                          return (
                            <span
                              key={index}
                              className={`material-symbols-outlined text-base ${color}`}
                            >
                              {icon}
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-xs text-text-secondary/80">
                        &amp; up
                      </span>
                    </label>
                  ))}
                </div>
              </details>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background-dark"
                >
                  Apply filters
                </button>
                <Link
                  href={`/category/${slug}`}
                  className="rounded-full border border-surface-accent px-4 py-2 text-sm font-semibold text-text-secondary hover:text-white"
                >
                  Clear
                </Link>
              </div>
            </form>
          </aside>
          <CategoryGameGrid games={filteredCollection} pageSize={24} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
