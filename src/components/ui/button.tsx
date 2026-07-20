import { clsx } from "clsx";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline-inverse";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "btn-gold-shine text-ink",
  secondary:
    "border border-ink bg-transparent text-ink hover:bg-ink hover:text-bg",
  ghost: "text-ink hover:text-accent",
  // For use on dark/ink-colored backgrounds (e.g. the closing CTA banner),
  // where "secondary"'s ink-on-light styling would be invisible. Uses --bg
  // (white) directly as the light contrast color for a dark surface.
  "outline-inverse":
    "border border-bg/40 bg-transparent text-bg hover:border-bg hover:bg-bg/10",
};

const sizes: Record<Size, string> = {
  md: "text-xs tracking-[0.12em] px-6 py-3",
  lg: "text-xs tracking-[0.14em] px-8 py-4",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, onClick } = props;
    return (
      <Link href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
