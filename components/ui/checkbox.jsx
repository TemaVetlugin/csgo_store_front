"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Check } from "lucide-react";

const checkboxVariants = cva(
  cn(
    "peer shrink-0 rounded-sm border border-secondary-300 ring-offset-[#141418]",
    "data-[state=checked]:bg-[#E24E4E] data-[state=checked]:text-white",
    "data-[state=unchecked]:border-secondary-300",
    "disabled:cursor-not-allowed disabled:!border-secondary-200 disabled:!bg-secondary-400 disabled:!text-secondary-300",
    "focus:border-[#E24E4E] focus:outline-none focus:ring-2 focus:ring-[#E24E4E] focus:ring-offset-2"
  ),
  {
    variants: {
      variant: {
        default: cn(),
        error: cn(
          "!border-[#DC2626]",
          "focus:outline-none focus:ring-2 focus:ring-[#E24E4E] focus:ring-offset-2"
        ),
      },
      size: {
        md: "h-3.5 w-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Checkbox = React.forwardRef(
  ({ className, variant, error, size, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        checkboxVariants({
          variant: error ? "error" : variant,
          size,
          className,
        })
      )}
      aria-label="Checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-2.5 w-2.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
