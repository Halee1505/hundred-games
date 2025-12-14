import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";

const navLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Games", href: "/category/all", icon: "stadia_controller" },
  { label: "New Releases", href: "/category/new", icon: "new_releases" },
  { label: "Community", href: "/search?q=community", icon: "forum" },
  { label: "Search", href: "/search", icon: "search" },
];

export function SiteHeader({ active }: { active?: string }) {
  const matches = navLinks.map((link) => {
    const isActive = active && active.startsWith(link.href);
    return { ...link, isActive };
  });

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-surface-accent bg-background-dark/95 px-4 py-3 backdrop-blur-xl lg:px-10">
      <div className="flex items-center gap-4 lg:gap-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.jpg"
            alt="Hundred Games"
            width={40}
            height={40}
            className="size-9 rounded-lg object-cover"
            priority
          />
          <span className="hidden text-xl font-bold tracking-tight sm:block">
            Hundred Games
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {matches.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                link.isActive
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-white hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        <div className="hidden w-full max-w-md md:flex">
          <SearchBar />
        </div>
        {/* <button className="relative flex size-10 items-center justify-center rounded-full bg-surface-accent text-white hover:bg-surface-accent/80">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
        </button> */}
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-surface-accent bg-background-dark/95 px-4 py-3 backdrop-blur md:hidden">
        {matches.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center text-xs ${
              link.isActive ? "text-primary" : "text-text-secondary"
            }`}
          >
            <span className="material-symbols-outlined text-base">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
