import * as React from "react";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

const inputVariants = cva(
  cn(
    "flex w-full rounded-md bg-secondary-200 border border-secondary-300 text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "disabled:cursor-not-allowed"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-secondary-200 border border-secondary-300 text-white",
          "placeholder:text-[#71717A]",
          "focus:outline-none focus:ring-2 focus:ring-[#E24E4E] focus:ring-offset-2",
          "disabled:bg-secondary disabled:border-secondary-200 disabled:text-[#A1A1AA]"
        ),
        error: cn(
          "border-[#DC2626]",
          "focus:outline-none focus:ring-2 focus:ring-[#E24E4E] focus:ring-offset-2"
        ),
      },
      size: {
        sm: "px-3 py-2 rounde-md text-mini",
        md: "px-3 py-2 rounde-md text-mini",
        lg: "px-3 py-2 rounde-md text-mini",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Textarea = React.forwardRef(
  ({ className, variant, size, error, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1")}>
        <textarea
          className={cn(
            inputVariants({
              variant: error ? "error" : variant,
              size,
              className,
            })
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className="text-tiny flex items-center gap-1 text-destructive">
            <Icon name="AlertTriangleIcon" />
            {error}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
