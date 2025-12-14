import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GameCard } from "@/components/game-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { searchGames } from "@/lib/games";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search Games — Hundred Games",
  description: "Find the perfect browser game by genre, mood, or keyword.",
};

const tags = ["Action", "Shooter", "Racing", "Puzzle", "Multiplayer", "Casual"];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  if (query && query.length > 80) {
    redirect(`/search?q=${encodeURIComponent(query.slice(0, 80))}`);
  }
  const results = searchGames(query);

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-white">
      <SiteHeader active="Search" />
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-4 py-6 lg:flex-row lg:px-10">
        <aside className="hidden w-64 flex-shrink-0 rounded-3xl border border-surface-accent bg-surface-dark/60 p-6 lg:flex">
          <div className="sticky top-28">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Refine Search</h2>
              <button className="text-xs font-semibold text-text-secondary hover:text-primary">
                Clear
              </button>
            </div>
            <div className="mt-6 space-y-4 text-sm text-text-secondary">
              {tags.map((tag) => (
                <label
                  key={tag}
                  className="flex cursor-pointer items-center gap-3 rounded-lg bg-background-dark/40 px-3 py-2"
                >
                  <input
                    type="checkbox"
                    className="size-4 rounded border-surface-accent text-primary focus:ring-0"
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
            <div className="mt-6 h-px bg-surface-accent/60" />
            <div className="mt-4 space-y-3 text-sm text-text-secondary">
              {[4.5, 4.0, 3.5].map((rating) => (
                <label
                  key={rating}
                  className="flex cursor-pointer items-center gap-3 rounded-lg bg-background-dark/40 px-3 py-2"
                >
                  <input
                    type="radio"
                    name="rating"
                    className="size-4 border-surface-accent text-primary focus:ring-0"
                  />
                  <span className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className="material-symbols-outlined text-base"
                        style={{
                          fontVariationSettings: `'FILL' ${
                            index < Math.floor(rating) ? 1 : 0
                          }`,
                        }}
                      >
                        star
                      </span>
                    ))}
                  </span>
                  <span className="text-xs text-text-secondary/70">
                    &amp; up
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex-1 space-y-6 rounded-3xl border border-surface-accent bg-surface-dark/70 p-5">
          <div className="rounded-2xl border border-surface-accent bg-background-dark/70 p-4">
            <form
              action="/search"
              method="get"
              className="flex items-center gap-3 rounded-xl bg-surface-accent px-4 py-2"
            >
              <button type="submit" aria-label="Submit search">
                <span className="material-symbols-outlined text-text-secondary">
                  search
                </span>
              </button>
              <input
                name="q"
                defaultValue={query}
                placeholder="Search games..."
                className="flex-1 border-0 bg-transparent text-white placeholder:text-text-secondary/60 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="hidden md:inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-background-dark shadow-[0_0_15px_rgba(13,242,89,0.3)]"
                aria-label="Submit search"
              >
                <span className="material-symbols-outlined text-base">
                  search
                </span>
                Search
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
              <span className="uppercase tracking-[0.4em] text-primary">
                Try:
              </span>
              {tags.map((tag) => (
                <a
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag.toLowerCase())}`}
                  className="rounded-full bg-surface-accent px-3 py-1 hover:text-primary"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text-secondary">
              {results.length} results for{" "}
              <span className="text-white">
                &ldquo;{query || "All games"}&rdquo;
              </span>
            </p>
            <div className="flex items-center gap-2 rounded-full border border-surface-accent px-4 py-2 text-xs uppercase tracking-[0.35em] text-text-secondary">
              <span className="material-symbols-outlined text-primary">
                bolt
              </span>
              live search
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
