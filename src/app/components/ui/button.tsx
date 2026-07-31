import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full text-[14px] font-medium leading-5 [font-family:Inter,-apple-system,system-ui,\"Segoe_UI\",Roboto,sans-serif] [font-feature-settings:normal] [font-variation-settings:normal] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-black text-white border border-black hover:bg-black/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-foreground bg-transparent text-foreground hover:bg-foreground/5",
        secondary:
          "border border-foreground bg-background text-foreground hover:bg-foreground/5",
        ghost:
          "bg-transparent text-foreground hover:opacity-70",
        icon: "border border-foreground bg-transparent text-foreground hover:bg-foreground/5",
        iconButton: "border border-foreground bg-transparent text-foreground hover:bg-foreground/5",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-2.5 has-[>svg]:px-5",
        sm: "gap-1.5 px-4 has-[>svg]:px-3",
        lg: "px-8 has-[>svg]:px-7",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
