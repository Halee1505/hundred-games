import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullscreenButton } from "@/components/fullscreen-button";
import { ScrollButton } from "@/components/scroll-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Game, getAllSlugs, getGameBySlug, getRelatedGames } from "@/lib/games";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const safetyNotice =
  "Games may include third-party embeds. If you notice an issue, reach out via the contact page.";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) {
    return {
      title: "Game not found — Hundred Games",
    };
  }

  const ogImage =
    game.thumbnailUrl ?? "https://example.com/assets/og/gamezone.jpg";
  return {
    title: `${game.title} — Play Free on Hundred Games`,
    description: game.summary,
    openGraph: {
      title: `${game.title} — Play Free on Hundred Games`,
      description: game.summary,
      images: [{ url: ogImage, alt: `${game.title} thumbnail` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} — Play on Hundred Games`,
      description: game.summary,
      images: [ogImage],
    },
  };
}

const factGrid = (game: Game) => [
  { label: "Studio", value: game.studio },
  { label: "Category", value: game.category },
  { label: "Play time", value: game.playTime },
  { label: "Platform", value: game.platform },
];

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) {
    notFound();
  }
  const related = getRelatedGames(game.slug, 8);
  const playerId = `player-${game.slug}`;

  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-white">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 py-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-secondary">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${game.categorySlug}`}
            className="hover:text-primary"
          >
            {game.category}
          </Link>
          <span>/</span>
          <span className="text-white">{game.title}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,_1fr)_360px]">
          <article className="rounded-3xl border border-surface-accent bg-surface-dark/70 p-6 shadow-2xl">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-surface-accent/60 pb-6">
              <div>
                <h1 className="text-3xl font-black leading-tight md:text-5xl">
                  {game.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                  <span className="rounded-full bg-surface-accent px-3 py-1 text-xs font-bold text-white">
                    {game.category}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-white">{game.rating.toFixed(1)}</span>
                    <span className="text-text-secondary">
                      ({game.ratingCount.toLocaleString()})
                    </span>
                  </span>
                  <span>•</span>
                  <span>{game.playTime}</span>
                  <span>•</span>
                  <span>{game.platform}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {game.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-surface-accent px-3 py-1 text-xs uppercase tracking-[0.3em] text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <section className="mt-6 space-y-4">
              <div
                id={playerId}
                className="player mt-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-surface-accent bg-black"
              >
                <iframe
                  title={game.title}
                  src={game.iframeUrl}
                  loading="lazy"
                  allow="fullscreen; gamepad; autoplay"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups"
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <div className="flex items-center gap-3">
                  <FullscreenButton targetId={playerId} />
                </div>
              </div>

              <p className="text-sm text-text-secondary">{safetyNotice}</p>
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-bold">About this game</h2>
              <div
                className="prose mt-3 text-sm text-text-secondary prose-invert prose-p:mt-0 prose-p:mb-3"
                dangerouslySetInnerHTML={{ __html: game.descriptionHtml }}
              />
            </section>

            <section className="mt-6">
              <h2 className="text-xl font-bold">Tags</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${tag.toLowerCase()}`}
                    className="rounded-full border border-surface-accent px-4 py-1 text-sm text-text-secondary hover:text-primary"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          </article>

          <aside className="space-y-6 rounded-3xl border border-surface-accent bg-surface-dark/70 p-6">
            <h2 className="text-lg font-bold">Game Info</h2>
            <div className="grid grid-cols-2 gap-3 text-sm text-text-secondary">
              {factGrid(game).map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-surface-accent/60 bg-background-dark/50 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">
                    {fact.label}
                  </p>
                  <p className="text-base font-semibold text-white">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-surface-accent/70 bg-background-dark/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-text-secondary/70">
                    Rating
                  </p>
                  <p className="text-3xl font-black text-primary">
                    {game.rating.toFixed(1)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {game.ratingCount.toLocaleString()} votes
                  </p>
                </div>
                <ScrollButton
                  className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-background-dark"
                  targetId={playerId}
                  ariaLabel={`Play ${game.title} now`}
                >
                  <span className="material-symbols-outlined text-base">
                    play_arrow
                  </span>
                  Play now
                </ScrollButton>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-text-secondary">
                How to play
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-text-secondary">
                <li>
                  Desktop: Use WASD / arrow keys and Space for context actions.
                </li>
                <li>
                  Touch devices: Tap + swipe to steer, jump, or dodge obstacles.
                </li>
                <li>
                  Controller friendly: plug-and-play with standard layouts.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-text-secondary">
                Safety
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{safetyNotice}</p>
            </div>

            <div className="rounded-2xl border border-surface-accent/60 bg-background-dark/50 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-text-secondary">
                Ad
              </p>
              <div className="mt-3 flex h-32 items-center justify-center rounded-xl border border-dashed border-surface-accent/60 bg-surface-dark text-text-secondary">
                Blog Advertisement
              </div>
              <p className="mt-2 text-xs text-text-secondary/80">
                Promote new guides, tournaments, or partner campaigns here.
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">More games like this</h2>
            <Link
              href={`/category/${game.categorySlug}`}
              className="text-sm font-semibold text-text-secondary hover:text-primary"
            >
              View {game.category}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                className="group block bg-surface-dark rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all shadow-lg"
                href={`/game/${item.slug}`}
              >
                <div
                  className="aspect-video w-full bg-cover bg-center"
                  data-alt="Futuristic cyber soldier aiming a weapon in a dark environment"
                  style={{
                    backgroundImage: `url('${item.thumbnailUrl}')`,
                  }}
                ></div>
                <div className="p-4">
                  <h4 className="text-white font-bold truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[#90cba4] text-xs mt-1">
                    {item.category} • {item.rating}{" "}
                    <span className="text-yellow-400">★</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
