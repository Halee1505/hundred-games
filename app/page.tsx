import Link from "next/link";
import { GameCard } from "@/components/game-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { games, getAllCategories } from "@/lib/games";

const featuredGame = games[0];
const trendingGames = games.slice(0, 8);
const freshDrops = games.slice(8, 16);

const discoverLinks = [
  { label: "Home", icon: "home", href: "/", active: true },
  { label: "Trending", icon: "trending_up", href: "/category/trending" },
  { label: "New Games", icon: "new_releases", href: "/category/new" },
];

const heroStats = [
  { label: "Live players", value: "84K" },
  { label: "Genres", value: "25+" },
  { label: "Top rating", value: "4.9" },
];

const adBackground =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDU9fo4vQ9gt-vC4KOSIWlJL5B2KW4Ct5m6uho5n2tqgm6Vn2XoTpMGKfyH3nOGJww11eUBqwCKWOoRtsGa3xwI1Fqr4l7B0xkLsMQw-0j5K35Zmnc_A2QNZlsa5c9ynJo6pUN2jG1a5J3TBWEiuofNv4kMdbmeyWXQG6itweGMPJk3aUy7I_wry_vhFY7aAaMTzV1hf2TU7R5b5NJXsBubjCCPm2e-IFF1Xp2xfciaeL8PpZDC40jcWTlXWfweVGcUZ4GE2Tq-QQ";

const categoryLinks = getAllCategories();

const categoryIcons: Record<string, { icon: string; color: string }> = {
  action: { icon: "sports_esports", color: "text-primary" },
  racing: { icon: "flag", color: "text-orange-400" },
  puzzle: { icon: "extension", color: "text-blue-400" },
  arcade: { icon: "stadia_controller", color: "text-pink-400" },
  sports: { icon: "sports_score", color: "text-orange-400" },
  strategy: { icon: "castle", color: "text-purple-400" },
  adventure: { icon: "explore", color: "text-yellow-400" },
  casual: { icon: "weekend", color: "text-emerald-400" },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark text-white">
      <SiteHeader />

      <div className="w-full bg-[#0d1b11] border-b border-[#1a3322] py-4">
        <div className="mx-auto flex h-[90px] w-full max-w-[970px] flex-col items-center justify-center rounded-xl border border-[#22492f] bg-surface-dark/70 px-6 text-text-secondary shadow-inner">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-text-secondary/60">
            Sponsored
          </span>
          <div className="text-3xl font-black text-primary/40">AD SPACE</div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 gap-0">
        <aside className="hidden w-64 flex-col border-r border-surface-accent bg-background-dark px-4 py-6 lg:flex lg:sticky lg:top-28 lg:self-start">
          <div className="flex flex-col gap-1">
            <h3 className="px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
              Discover
            </h3>
            {discoverLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  link.active
                    ? "bg-primary text-background-dark"
                    : "text-text-secondary hover:bg-surface-accent hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 h-px bg-surface-accent" />
          <div className="mt-4 flex flex-col gap-1">
            <h3 className="px-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
              Categories
            </h3>
            {categoryLinks.map((category) => {
              const { icon, color } = categoryIcons[category.slug] ?? {
                icon: "stadia_controller",
                color: "text-primary",
              };
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface-accent hover:text-white"
                >
                  <span
                    className={`material-symbols-outlined text-base ${color}`}
                  >
                    {icon}
                  </span>
                  {category.name} Games
                </Link>
              );
            })}
          </div>
          <div className="mt-auto border-t border-surface-accent/50 pt-6 text-xs text-text-secondary">
            <p>Play responsibly. Need help? Visit our contact page.</p>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-10">
          <section
            className="mb-10 rounded-3xl border border-surface-accent bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(120deg, rgba(16,35,22,0.9), rgba(16,35,22,0.3)), url(${adBackground})`,
            }}
          >
            <div className="flex min-h-[420px] flex-col justify-between gap-6 p-6 sm:p-10">
              <div className="flex flex-wrap gap-3 text-sm font-semibold text-primary">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                  Featured Game
                </span>
                <span className="rounded-full bg-surface-accent/80 px-3 py-1 text-text-secondary">
                  {featuredGame.category}
                </span>
                <span className="rounded-full bg-surface-accent/80 px-3 py-1 text-text-secondary">
                  {featuredGame.playTime}
                </span>
              </div>
              <div className="max-w-3xl">
                <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                  {featuredGame.title}{" "}
                  <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
                    Elite Edition
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-base text-gray-200 sm:text-lg">
                  {featuredGame.summary}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/game/${featuredGame.slug}`}
                  className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-base font-bold text-background-dark shadow-[0_0_30px_rgba(13,242,89,0.35)] transition-transform hover:scale-105"
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                  Play Now
                </Link>
                <Link
                  href={`/category/${featuredGame.categorySlug}`}
                  className="flex items-center gap-2 rounded-xl border border-surface-accent/80 bg-surface-accent/60 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-primary/60"
                >
                  <span className="material-symbols-outlined">info</span>
                  More Info
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-surface-accent/80 bg-black/30 px-4 py-3 text-center"
                  >
                    <p className="text-2xl font-black text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold">
                <span className="material-symbols-outlined text-primary">
                  local_fire_department
                </span>
                Trending Now
              </h2>
              <Link
                href="/category/trending"
                className="text-sm font-semibold text-text-secondary hover:text-primary"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-4">
              {trendingGames.map((game) => (
                <GameCard key={game.slug} game={game} />
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-3xl border border-surface-accent/80 bg-surface-dark/60 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-primary">
                  New Season
                </p>
                <h2 className="text-2xl font-black">Fresh Drops</h2>
                <p className="text-sm text-text-secondary">
                  Hand-picked titles launching this week.
                </p>
              </div>
              <Link
                href="/category/new"
                className="inline-block rounded-full border border-primary/60 px-5 py-2 text-sm font-semibold text-primary w-max hover:bg-primary hover:text-background-dark transition-colors"
              >
                Browse all
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {freshDrops.map((game) => (
                <GameCard key={game.slug} game={game} variant="compact" />
              ))}
            </div>
          </section>

          <section className="mb-12 rounded-3xl border border-surface-accent/80 bg-surface-dark/70 p-6">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="text-2xl font-bold text-white">
                Featured Categories
              </h2>
              <div className="h-px flex-1 bg-surface-accent/60" />
              <Link href="/category/all" className="text-sm text-primary">
                Explore all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
              {categoryLinks.slice(0, 6).map((category) => {
                const { icon, color } = categoryIcons[category.slug] ?? {
                  icon: "stadia_controller",
                  color: "text-primary",
                };
                return (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-transparent bg-background-dark/60 px-4 py-5 text-center transition hover:border-primary/40 hover:bg-surface-accent"
                  >
                    <span
                      className={`material-symbols-outlined text-3xl transition-transform group-hover:scale-110 ${color}`}
                    >
                      {icon}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mb-12 rounded-3xl border border-surface-accent bg-surface-dark/70 p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold leading-tight text-white">
                  Play the Best Free Online Games on Hundred Games
                </h2>
                <p className="mt-4 text-sm text-text-secondary">
                  Welcome to Hundred Games, the ultimate destination for premium
                  browser titles. We update our library daily with action hits,
                  competitive racers, brain-teasing puzzles, immersive RPGs, and
                  more. Every release is optimized for instant play on desktop,
                  tablet, and mobile—no downloads or launchers needed.
                </p>
              </div>
              <div className="space-y-4 rounded-2xl border border-surface-accent/80 bg-background-dark/60 p-5 text-sm text-text-secondary">
                <p className="font-semibold text-white">
                  Why players choose Hundred Games:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Curated collections spanning <strong>Action</strong>,{" "}
                    <strong>Puzzle</strong>, and <strong>Sports</strong>.
                  </li>
                  <li>
                    Cloud-hosted experiences for lightning-fast load times and
                    zero setup.
                  </li>
                  <li>
                    Fresh drops weekly plus trusted classics for every mood.
                  </li>
                </ul>
                <p>
                  Jump into any title above or browse the full catalog to
                  discover new favorites. Hundred Games keeps you playing longer
                  with curated genres, instant access, and premium-quality
                  embeds.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
