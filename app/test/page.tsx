/* eslint-disable @next/next/no-img-element */

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { games } from "@/lib/games";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-dark text-white">
      <SiteHeader active="Games" />
      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col gap-6 px-4 py-6 lg:px-10">
        <header className="mb-4">
          <h1 className="text-3xl font-black">Embed Test Harness</h1>
          <p className="text-sm text-text-secondary">
            Preview every game with thumbnail + iframe to validate URLs and embeds.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {games.map((game) => (
            <article
              key={game.slug}
              className="rounded-3xl border border-surface-accent bg-surface-dark/80 p-6 shadow-lg"
            >
              <div className="flex flex-wrap gap-4">
                <div className="w-full max-w-[320px] flex-shrink-0">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-surface-accent/60">
                    {game.thumbnailUrl ? (
                      <img
                        src={game.thumbnailUrl}
                        alt={`${game.title} thumbnail`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-background-dark text-text-secondary">
                        No thumbnail
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-text-secondary break-all">{game.thumbnailUrl ?? "No thumbnail URL"}</p>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.3em] text-text-secondary/80">
                    <span className="text-primary">{game.category}</span>
                    <span>•</span>
                    <span>{game.host}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{game.title}</h2>
                  <p className="text-sm text-text-secondary break-all">
                    <strong>Source:</strong> {game.url}
                  </p>
                  <p className="text-sm text-text-secondary break-all">
                    <strong>Iframe:</strong> {game.iframeUrl}
                  </p>
                  <div className="rounded-2xl border border-surface-accent bg-background-dark p-3">
                    <div className="aspect-video overflow-hidden rounded-xl border border-surface-accent">
                      <iframe
                        title={`${game.title} embed`}
                        src={game.iframeUrl}
                        loading="lazy"
                        allow="fullscreen; gamepad; autoplay"
                        referrerPolicy="strict-origin-when-cross-origin"
                        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-popups"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

