import Link from "next/link";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg border px-7 py-3 text-sm font-medium cursor-pointer transition-colors duration-200";

const variants = {
  primary:
    "border-transparent bg-teal-700 text-white hover:bg-teal-800 dark:hover:bg-teal-600",
  ghost:
    "border-gray-300/70 text-gray-600 hover:text-teal-700 hover:border-teal-700/50 dark:border-white/15 dark:text-gray-300 dark:hover:text-teal-400 dark:hover:border-teal-400/40",
};

type AsButton = { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
type AsAnchor = { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = { variant?: keyof typeof variants } & (AsButton | AsAnchor);

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    // Link for in-app routes; plain <a> for downloads, mailto and external URLs
    if (href.startsWith("/") && !rest.download) {
      return <Link href={href} className={classes} {...rest} />;
    }
    return <a href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...props} />;
}
