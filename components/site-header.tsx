"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";

export function SiteHeader() {
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearch) {
      searchInputRef.current?.focus();
    }
  }, [isMobileSearch]);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-accent bg-background-dark/95 px-4 py-3 backdrop-blur-xl lg:px-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <div
          className={`items-center justify-between md:flex md:justify-start ${
            isMobileSearch ? "hidden md:flex" : "flex"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-3 text-white transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.jpg"
              alt="Hundred Games"
              width={40}
              height={40}
              className="size-9 rounded-lg object-cover"
              priority
            />
            <span className="text-xl font-bold tracking-tight">
              Hundred Games
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileSearch(true)}
            className="flex size-10 items-center justify-center rounded-full border border-surface-accent/80 text-text-secondary transition hover:border-primary hover:text-white md:hidden"
            aria-label="Open search"
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
        </div>

        <div
          className={`items-center gap-3 md:flex ${
            isMobileSearch ? "flex" : "hidden"
          }`}
        >
          <div className="w-full flex-1 md:max-w-2xl">
            <SearchBar
              inputRef={searchInputRef as React.RefObject<HTMLInputElement>}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSearch(false)}
            className="flex size-4 items-center justify-center transition hover:border-primary hover:text-white md:hidden"
            aria-label="Close search"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <button
            type="button"
            className="hidden lg:hidden rounded-full border border-surface-accent/80 p-2 text-text-secondary transition hover:border-primary hover:text-white md:flex"
            aria-label="Focus search"
            onClick={() => searchInputRef.current?.focus()}
          >
            <span className="material-symbols-outlined text-2xl">search</span>
          </button>
        </div>
      </div>
    </header>
  );
}
