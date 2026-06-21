import { cn } from "@/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
  children,
  href = "#",
  variant = "primary",
  className,
  ...rest
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure/60";

  const variants = {
    primary:
      "bg-ink text-bg hover:bg-white hover:shadow-glow",
    ghost:
      "glass text-ink hover:border-azure/40 hover:shadow-glow",
  } as const;

  return (
    <a href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  );
}
