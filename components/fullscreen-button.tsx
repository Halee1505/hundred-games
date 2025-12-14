"use client";

type Props = {
  targetId: string;
};

export function FullscreenButton({ targetId }: Props) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }

    target.requestFullscreen?.();
  };

  return (
    <button className="btn" type="button" onClick={handleClick} aria-label="Toggle fullscreen">
      ⛶ Fullscreen
    </button>
  );
}

