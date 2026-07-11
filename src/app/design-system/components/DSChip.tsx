import { type ReactNode } from "react";
import { cn } from "../../components/ui/utils";

export function DSChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-secondary/25 text-sm text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
