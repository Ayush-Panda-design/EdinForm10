import Link from "next/link";
import { cn } from "~/lib/utils";

interface LogoProps {
  className?: string;
  href?: string | null;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "light";
}

/**
 * EdinForm wordmark + monogram.
 * Inspired by Edinburgh's Georgian stone facades — a square stone block
 * cut by a single thin "form" line. Swiss minimal. Pure typography.
 */
export function Logo({
  className,
  href = "/",
  showWordmark = true,
  size = "md",
  tone = "ink",
}: LogoProps) {
  const dims = size === "sm" ? 22 : size === "lg" ? 34 : 26;
  const text =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

  const inner = (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 select-none",
        tone === "light" ? "text-stone-50" : "text-ink",
        className,
      )}
    >
      <svg
        width={dims}
        height={dims}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="1.5"
          width="29"
          height="29"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <line
          x1="7"
          y1="12.5"
          x2="25"
          y2="12.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <line
          x1="7"
          y1="19.5"
          x2="18"
          y2="19.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="22.5" cy="19.5" r="1.4" fill="#a8541a" />
      </svg>
      {showWordmark && (
        <span
          className={cn(
            "font-serif font-medium tracking-tight leading-none",
            text,
          )}
        >
          EdinForm
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="EdinForm — home">
      {inner}
    </Link>
  );
}
