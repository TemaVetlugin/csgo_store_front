"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  ({ className, currencySymbol = "", ...props }, ref) => {
    const value = props.value || props.defaultValue;

    return (
      <SliderPrimitive.Slider
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center text-xs font-normal",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary-600">
          <SliderPrimitive.Range className="absolute h-full bg-[#E24E4E]" />
        </SliderPrimitive.Track>
        {value.map((value, i) => (
          <SliderPrimitive.SliderThumb
            key={i}
            className="block h-3.5 w-3.5 rounded-full border-2 border-[#E24E4E] bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <span
              className={cn(
                "absolute -left-[35%] top-4",
                i === 1 && "-left-[180%]"
              )}
            >
              {currencySymbol}
              {value}
            </span>
          </SliderPrimitive.SliderThumb>
        ))}
      </SliderPrimitive.Slider>
    );
  }
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
