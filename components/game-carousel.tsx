"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { GameCard } from "@/components/game-card";
import type { Game } from "@/lib/games";

type Props = {
  games: Game[];
  className?: string;
  variant?: "primary" | "compact" | "mini" | "square";
};

export function GameCarousel({ games, className, variant = "square" }: Props) {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={2.2}
        navigation
        breakpoints={{
          480: { slidesPerView: 2.8, spaceBetween: 14 },
          640: { slidesPerView: 3.2, spaceBetween: 18 },
          768: { slidesPerView: 4.2, spaceBetween: 20 },
          1024: { slidesPerView: 5.2, spaceBetween: 20 },
          1440: { slidesPerView: 6.2, spaceBetween: 22 },
        }}
        className="w-full"
      >
        {games.map((game) => (
          <SwiperSlide
            key={game.slug}
            className="!h-auto !w-auto"
            style={{ width: "clamp(140px, 18vw, 220px)" }}
          >
            <GameCard game={game} variant={variant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
