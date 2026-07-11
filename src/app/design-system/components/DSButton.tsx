import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../components/ui/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80 border border-border",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-2.5",
        lg: "px-5 py-3",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

type DSButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

export function DSButton({
  className,
  variant,
  size,
  fullWidth,
  children,
  ...props
}: DSButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      style={{ borderRadius: "var(--radius)" }}
      {...props}
    >
      {children}
    </button>
  );
}
