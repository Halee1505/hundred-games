import Link from "next/link";

const linkGroups = [
  {
    title: "Discover",
    links: [
      { label: "Trending", href: "/category/trending" },
      { label: "New Releases", href: "/category/new" },
      { label: "Action Games", href: "/category/action" },
      { label: "Puzzle Games", href: "/category/puzzle" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "DMCA", href: "/dmca" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Community", href: "/search?q=community" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-surface-accent/60 bg-background-dark">
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-10 text-sm text-text-secondary lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <p className="text-white text-xl font-bold">Hundred Games</p>
          <p className="mt-3 text-sm text-text-secondary">
            Curated browser experiences that launch instantly on desktop,
            Chromebook, and mobile. No installs, no friction—just play.
          </p>
          <p className="mt-4 text-xs text-text-secondary">
            Developed and managed by <strong>Halee Studio</strong>.
          </p>
          <div className="mt-4 flex gap-3">
            {["public", "forum", "chat_bubble"].map((icon) => (
              <Link
                key={icon}
                href="/"
                className="flex size-10 items-center justify-center rounded-lg border border-surface-accent/60 text-white transition hover:border-primary hover:text-primary"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </Link>
            ))}
          </div>
        </div>
        {linkGroups.map((group) => (
          <div key={group.title}>
            <p className="text-white text-sm font-bold uppercase tracking-[0.3em]">
              {group.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-surface-accent/50 px-4 py-4 text-center text-xs text-text-secondary lg:px-10">
        © {year} Halee Studio • Hosted globally with love.
      </div>
    </footer>
  );
}
