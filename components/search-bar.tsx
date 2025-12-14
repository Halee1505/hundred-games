"use client";

import { useEffect, useRef } from "react";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export function SearchBar({
  placeholder = "Search for games, genres...",
  className = "",
  inputClassName = "",
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "/") {
        return;
      }

      const input = inputRef.current;
      if (!input || document.activeElement === input) {
        return;
      }

      event.preventDefault();
      input.focus();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <form
      action="/search"
      method="get"
      className={`gap-4 not-even:flex w-full items-center text-white focus-within:ring-2 focus-within:ring-primary/50 transition-all ${className}`}
    >
      <label htmlFor="site-search" className="sr-only">
        Search games
      </label>
      <input
        ref={inputRef}
        id="site-search"
        name="q"
        type="search"
        placeholder={placeholder}
        autoComplete="off"
        className={`px-4  rounded-lg bg-surface-accent  flex-1 border-0 py-2 text-sm text-white placeholder:text-text-secondary/70 focus:outline-none focus:ring-0 ${inputClassName}`}
      />
      <button
        type="submit"
        className="mr-3 flex items-center justify-center rounded-lg border border-primary/60 px-2 py-1 text-primary transition-colors hover:bg-primary/10"
        aria-label="Search"
      >
        <span className="material-symbols-outlined px-3 text-text-secondary">
          search
        </span>
      </button>
    </form>
  );
}
