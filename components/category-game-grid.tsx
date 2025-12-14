"use client";

import { useState } from "react";
import { GameCard } from "@/components/game-card";
import type { Game } from "@/lib/games";

type Props = {
  games: Game[];
  pageSize?: number;
};

export default function CategoryGameGrid({ games, pageSize = 12 }: Props) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const visibleGames = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + pageSize, games.length));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">
          Showing <span className="text-white">{visibleGames.length}</span> of{" "}
          <span className="text-white">{games.length}</span> games
        </p>
        <div className="flex items-center gap-2 rounded-full border border-surface-accent px-4 py-2 text-sm text-text-secondary">
          <span className="material-symbols-outlined text-base text-primary">
            trophy
          </span>
          Curated for you
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 xl:grid-cols-6">
        {visibleGames.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={handleLoadMore}
            className="rounded-full border border-surface-accent px-6 py-2 text-sm font-semibold text-white transition hover:border-primary hover:text-primary"
          >
            Load more games
          </button>
        </div>
      )}
    </div>
  );
}
