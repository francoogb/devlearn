// Button de shadcn/ui adaptado a los tokens Electric Slate del proyecto.
// Variants mapeadas a tu Material 3:
//   - default     → bg-primary (lavender)       texto on-primary
//   - secondary   → bg-secondary (verde esmeralda) texto on-secondary
//   - tertiary    → bg-tertiary (violet)         texto on-tertiary
//   - destructive → bg-error (coral)             texto on-error
//   - outline     → transparente con borde outline-variant
//   - ghost       → transparente, hover a surface-container-high
//   - link        → sin fondo, subrayado al hover
//
// `asChild` (prop de Radix Slot): si lo activás, el Button renderiza el
// hijo directo con sus estilos. Útil para que un <Link> actúe como botón
// sin anidar <a><button>...</button></a>.

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-mono font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-on-primary shadow-md hover:bg-primary-container hover:text-on-primary-container active:scale-[0.98]",
        secondary:
          "bg-secondary text-on-secondary shadow-md hover:bg-secondary-container active:scale-[0.98]",
        tertiary:
          "bg-tertiary text-on-tertiary shadow-md hover:bg-tertiary-container hover:text-on-tertiary-container active:scale-[0.98]",
        destructive:
          "bg-error text-on-error shadow-md hover:bg-error/90 active:scale-[0.98]",
        outline:
          "border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-high hover:text-on-surface",
        ghost:
          "bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
        link: "bg-transparent text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
