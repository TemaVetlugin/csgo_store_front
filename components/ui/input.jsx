import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Icon } from "../icon";

const inputVariants = cva(
  cn(
    "flex h-10 w-full rounded-md bg-secondary-200 border border-secondary-300 text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
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
          "disabled:bg-secondary disabled:text-[#A1A1AA]"
        ),
        error: cn(
          "border-[#DC2626]",
          "focus:outline-none focus:ring-2 focus:ring-[#E24E4E] focus:ring-offset-2"
        ),
      },
      size: {
        sm: "h-9 px-3 py-2 rounde-md text-mini",
        md: "h-10 px-3 py-2 rounde-md text-mini",
        lg: "h-11 px-3 py-2 rounde-md text-mini",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Input = React.forwardRef(
  (
    {
      className,
      inputClassName,
      type,
      variant,
      size,
      error,
      errorClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <input
          type={type}
          className={cn(
            inputVariants({
              variant: error ? "error" : variant,
              size,
              className: inputClassName,
            })
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div
            className={cn(
              "!text-tiny flex items-center gap-1 text-destructive",
              errorClassName
            )}
          >
            <Icon name="AlertTriangleIcon" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
