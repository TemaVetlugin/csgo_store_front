import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background",
    "transform active:scale-90 transition-all duration-500",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "disabled:from-secondary-200 disabled:text-secondary-500 disabled:pointer-events-none disabled:border disabled:border-seondary-600 disabled:bg-secondary-300"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-gradient-to-bl from-primary via-primary-dark to-primary-dark text-primary",
          "bg-[position:_100%_100%] hover:bg-[position:_0%_0%] bg-[size:_200%]",
          "focus:!ring-primary/30"
        ),
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: cn(
          "text-destructive bg-white",
          "hover:bg-[#e24e4e4d] hover:text-white hover:bg-opacity-30 hover:shadow-md",
          "focus:ring-primary focus:bg-white focus:!text-destructive"
        ),
        secondary: cn(
          "bg-primary/10 text-secondary-foreground border border-primary/30",
          "hover:bg-primary hover:text-white hover:ring-primary",
          "focus:bg-primary/30 focus:ring-primary/30 focus:border-transparent focus:text-destructive"
        ),
        ghost: "border border-input bg-background",
        link: "text-primary underline-offset-4 hover:underline",
        "icon-primary": cn(
          "bg-secondary-200 shadow-md",
          "hover:bg-primary/30 hover:text-destructive",
          "focus:bg-primary focus:!ring-primary/30 focus:text-white"
        ),
        "icon-secondary": cn(
          "bg-primary",
          "hover:bg-primary/10 hover:text-destructive",
          "focus:bg-primary/10 focus:!ring-primary/30 focus:text-destructive"
        ),
        "icon-disabled":
          "bg-secondary-200 text-secondary-500 pointer-events-none",
      },
      size: {
        sm: "h-9 rounded-md px-4",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-4",
        xl: "h-12 rounded-md px-4",
        "icon-xs": "h-6 w-6",
        "icon-sm": "h-9 w-9",
        "icon-default": "h-10 w-10",
        "icon-lg": "h-11 w-11",
        "icon-xl": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
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
