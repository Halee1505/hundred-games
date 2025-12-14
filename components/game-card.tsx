/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Game } from "@/lib/games";

type Props = {
  game: Game;
  variant?: "primary" | "compact";
};

export function GameCard({ game, variant = "primary" }: Props) {
  const baseClasses =
    "group flex flex-col overflow-hidden rounded-2xl border border-surface-accent bg-surface-dark/60 backdrop-blur transition-all hover:border-primary/50 hover:shadow-[0_0_25px_rgba(13,242,89,0.15)]";
  const padding = variant === "compact" ? "p-3" : "p-4";

  return (
    <article className={baseClasses}>
      <Link
        href={`/game/${game.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 to-transparent" />
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
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-bold text-primary backdrop-blur">
          <span className="material-symbols-outlined text-base">star</span>
          {game.rating.toFixed(1)}
        </div>
      </Link>
      <div className={`flex flex-1 flex-col gap-1 ${padding}`}>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="truncate">{game.category}</span>
          <span className="rounded-full bg-surface-accent px-2 py-0.5 text-[11px] text-white/70">
            {game.playTime}
          </span>
        </div>
        <h3 className="text-base font-semibold text-white">
          <Link href={`/game/${game.slug}`} className="hover:text-primary">
            {game.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
