import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../components/ui/utils";

export function DSCard({
  children,
  className,
  interactive = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "border border-border bg-background",
        interactive ? "transition-all hover:-translate-y-0.5 hover:border-foreground/20" : "",
        className
      )}
      style={{ borderRadius: "var(--radius)" }}
    >
      {children}
    </div>
  );
}
