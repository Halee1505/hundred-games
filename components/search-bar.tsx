"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
};

export function SearchBar({
  placeholder = "Search for games, genres...",
  className = "",
  inputClassName = "",
  autoFocus = false,
  inputRef,
}: SearchBarProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const targetRef = inputRef ?? internalRef;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "/") {
        return;
      }

      const input = targetRef.current;
      if (!input || document.activeElement === input) {
        return;
      }

      event.preventDefault();
      input.focus();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [targetRef]);

  return (
    <form
      action="/search"
      method="get"
      className={`w-full flex items-center gap-4 text-white ${className}`}
    >
      <label htmlFor="site-search" className="sr-only">
        Search games
      </label>
      <input
        ref={targetRef}
        id="site-search"
        name="q"
        type="search"
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        className={`lg:min-w-100 flex-1 rounded-lg border-0 bg-surface-accent px-4 py-2 text-sm text-white placeholder:text-text-secondary/70 focus:border-transparent focus:outline-none focus:ring-0 ${inputClassName}`}
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
