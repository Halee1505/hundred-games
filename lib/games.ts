import gamesJson from "@/script/production.json";

export type RawGame = {
  url: string;
  iframe_src: string;
  thumbnail_url?: string | null;
  title?: string | null;
  description?: string | null;
};

export type Game = {
  slug: string;
  url: string;
  iframeUrl: string;
  thumbnailUrl?: string;
  title: string;
  host: string;
  category: string;
  categorySlug: string;
  rating: number;
  ratingCount: number;
  playTime: string;
  platform: string;
  studio: string;
  tags: string[];
  summary: string;
  descriptionHtml: string;
};

const slugify = (url: string) => {
  try {
    const parsed = new URL(url);
    const raw = `${parsed.hostname}${parsed.pathname}`.replace(/\/+/g, "-");
    return raw
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  } catch {
    return url
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
};

const absoluteUrl = (
  value: string | null | undefined,
  base: string
): string | undefined => {
  if (!value) {
    return undefined;
  }
  try {
    return new URL(value, base).href;
  } catch {
    return undefined;
  }
};

const humanTitle = (game: RawGame) => {
  if (game.title && game.title.trim()) {
    return game.title.trim();
  }
  try {
    const parsed = new URL(game.url);
    const path = parsed.pathname
      .replace(/\/$/, "")
      .split("/")
      .filter(Boolean)
      .pop();
    return (path || parsed.hostname.replace(/^www\./, "")).replace(
      /[-_]/g,
      " "
    );
  } catch {
    return game.url;
  }
};

const hostFromUrl = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const categoryPool = [
  "Action",
  "Adventure",
  "Racing",
  "Puzzle",
  "Sports",
  "Strategy",
  "Arcade",
  "Casual",
];

const playTimes = [
  "~2 min",
  "~3 min",
  "~5 min",
  "Quick session",
  "Endless mode",
];
const platforms = [
  "Browser",
  "Mobile & Desktop",
  "Desktop",
  "Touch-friendly",
  "Controller-ready",
];
const studios = [
  "Neon Forge",
  "Pixel Arcade",
  "Hyper Labs",
  "Nova Works",
  "Quantum Play",
  "RetroByte",
];
const baseTags = [
  "Retro",
  "Runner",
  "Survival",
  "Multiplayer",
  "Relax",
  "Brainy",
  "Sports",
  "Arcade",
];

const slugHash = (input: string) =>
  input
    .split("")
    .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0);

const pickFrom = (slug: string, list: string[], offset = 0) => {
  const hash = slugHash(`${slug}-${offset}`);
  return list[hash % list.length];
};

const deriveTags = (slug: string): string[] => {
  const fromSlug = slug
    .split("-")
    .filter((token) => token.length > 3)
    .map((token) => token.replace(/^\w/, (ch) => ch.toUpperCase()));
  const tags = Array.from(
    new Set([...fromSlug.slice(0, 3), pickFrom(slug, baseTags, 1)])
  );
  return tags.slice(0, 4);
};

const summarize = (gameTitle: string, host: string, category: string) =>
  `${gameTitle} delivers a ${category.toLowerCase()} experience from ${host}. Launch instantly with zero downloads.`;

export const games: Game[] = (gamesJson as RawGame[])
  .filter((game) => Boolean(game.iframe_src))
  .map((game) => {
    const iframeUrl = absoluteUrl(game.iframe_src, game.url) || game.iframe_src;
    const slug = slugify(game.url);
    const title = humanTitle(game);
    const host = hostFromUrl(game.url);
    const category = pickFrom(slug, categoryPool);
    const tags = deriveTags(slug);
    const rating = 4 + (slugHash(slug) % 10) / 10;
    const ratingCount = 800 + (slugHash(`${slug}-count`) % 4200);
    const playTime = pickFrom(slug, playTimes, 2);
    const platform = pickFrom(slug, platforms, 3);
    const studio = pickFrom(slug, studios, 4);
    const descriptionHtml =
      game.description?.trim() ||
      `<p><strong>${title}</strong> is a browser mini-game hosted on ${host}. Launch instantly without downloads and enjoy smooth performance on desktop or mobile.</p><p class="tips">Use fullscreen mode for a richer view and replay sessions to chase a new high score.</p>`;

    return {
      slug,
      url: game.url,
      iframeUrl,
      thumbnailUrl: absoluteUrl(game.thumbnail_url ?? undefined, game.url),
      title,
      host,
      category,
      categorySlug: category.toLowerCase().replace(/\s+/g, "-"),
      rating: parseFloat(rating.toFixed(1)),
      ratingCount,
      playTime,
      platform,
      studio,
      tags,
      summary: summarize(title, host, category),
      descriptionHtml,
    };
  });

export const getGameBySlug = (slug: string): Game | undefined =>
  games.find((game) => game.slug === slug);

export const getRelatedGames = (slug: string, count = 6): Game[] => {
  const current = getGameBySlug(slug);
  if (!current) {
    return games.filter((game) => game.slug !== slug).slice(0, count);
  }
  const sameCategory = games.filter(
    (game) => game.slug !== slug && game.category === current.category
  );
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }
  const fallback = games.filter(
    (game) => game.slug !== slug && game.category !== current.category
  );
  return [...sameCategory, ...fallback].slice(0, count);
};

export const getAllSlugs = (): string[] => games.map((game) => game.slug);

export const getCategoryFromSlug = (slug: string): string | undefined =>
  categoryPool.find(
    (category) => category.toLowerCase().replace(/\s+/g, "-") === slug
  );

export const getGamesByCategory = (slug: string): Game[] =>
  slug === "all" ? games : games.filter((game) => game.categorySlug === slug);

export const getAllCategories = () =>
  Array.from(new Set(games.map((game) => game.categorySlug))).map((slug) => ({
    name: getCategoryFromSlug(slug) ?? slug,
    slug,
  }));

export const searchGames = (query: string): Game[] => {
  const q = query.trim().toLowerCase();
  if (!q) {
    return games.slice(0, 24);
  }
  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(q) ||
      game.host.toLowerCase().includes(q) ||
      game.tags.some((tag) => tag.toLowerCase().includes(q))
  );
};
