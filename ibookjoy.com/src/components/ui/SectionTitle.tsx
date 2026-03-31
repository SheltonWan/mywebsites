import clsx from "clsx";
import { ReactNode } from "react";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  children?: ReactNode;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
  children,
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        align === "left" && "text-left"
      )}
    >
      {badge && (
        <span
          className={clsx(
            "inline-block px-4 py-1.5 text-xs font-semibold rounded-full mb-4 tracking-wide uppercase",
            light
              ? "bg-white/10 text-white/80"
              : "bg-brand-50 text-brand-500"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={clsx(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
          light ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-4 text-lg max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-white/60" : "text-gray-500"
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
