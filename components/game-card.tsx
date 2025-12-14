/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Game } from "@/lib/games";

type Props = {
  game: Game;
  variant?: "primary" | "compact";
};

export function GameCard({ game, variant = "primary" }: Props) {
  const ratio = variant === "compact" ? "aspect-[3/2]" : "aspect-[4/3]";
  return (
    <article
      className={`group relative overflow-hidden rounded-xl border border-surface-accent/60 bg-surface-dark/40 ${ratio}`}
    >
      <Link href={`/game/${game.slug}`} className="absolute inset-0">
        {game.thumbnailUrl ? (
          <img
            src={game.thumbnailUrl}
            alt={`${game.title} thumbnail`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-surface-accent to-background-dark" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.25em] text-white">
          {game.category}
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-primary">
          {game.rating.toFixed(1)}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full px-3 pb-3 transition duration-300 group-hover:translate-y-0">
          <div className="rounded-lg bg-black/80 px-3 py-2 text-white shadow-lg">
            <p className="text-sm font-semibold line-clamp-2">{game.title}</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
              Play now
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
