import { type ReactNode } from "react";
import { cn } from "../../components/ui/utils";

export function DSSectionHeader({
  eyebrow,
  title,
  subtitle,
  right,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && <span className="text-xs tracking-widest uppercase text-primary block mb-2">{eyebrow}</span>}
        <h2 className="ds-heading-lg leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      {right ? <div className="text-sm text-muted-foreground">{right}</div> : null}
    </div>
  );
}
