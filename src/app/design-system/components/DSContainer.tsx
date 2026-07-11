import { type ReactNode } from "react";
import { cn } from "../../components/ui/utils";

type ContainerSize = "md" | "lg" | "xl";

const sizeMap: Record<ContainerSize, string> = {
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function DSContainer({
  children,
  size = "xl",
  className,
}: {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full", sizeMap[size], className)}>{children}</div>;
}
