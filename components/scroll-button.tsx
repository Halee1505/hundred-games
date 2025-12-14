"use client";

import type { ReactNode } from "react";

type Props = {
  targetId: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export function ScrollButton({
  targetId,
  className,
  ariaLabel,
  children,
}: Props) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
