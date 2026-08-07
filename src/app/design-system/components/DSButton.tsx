import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../components/ui/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold leading-5 transition-colors disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-black text-white border border-black hover:bg-black/90",
        secondary: "bg-white text-black border border-black hover:bg-black/5",
        tertiary: "bg-transparent text-black border border-transparent hover:opacity-70",
        ghost: "bg-transparent text-black border border-transparent hover:opacity-70",
        icon: "bg-white text-black border border-black hover:bg-black/5",
        iconButton: "bg-white text-black border border-black hover:bg-black/5",
      },
      size: {
        sm: "px-5",
        md: "px-8",
        lg: "px-10",
        icon: "size-11 p-0",
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
      {...props}
    >
      {children}
    </button>
  );
}
