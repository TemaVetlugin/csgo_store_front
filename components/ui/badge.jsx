"use client";
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "../icon";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-1 text-xs font-normal cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        contraband: "text-meat-brown border-meat-brown/30 bg-meat-brown/10",

        covert: "text-carmine-pink border-carmine-pink/30 bg-carmine-pink/10",
        extraordinary:
          "text-carmine-pink border-carmine-pink/30 bg-carmine-pink/10",

        classified: "text-steel-pink border-steel-pink/30 bg-steel-pink/10",
        exotic: "text-steel-pink border-steel-pink/30 bg-steel-pink/10",

        restricted:
          "text-lavender-indigo border-lavender-indigo/30 bg-lavender-indigo/10",
        remarkable:
          "text-lavender-indigo border-lavender-indigo/30 bg-lavender-indigo/10",

        "mil-spec grade":
          "text-ultramarine-blue border-ultramarine-blue/30 bg-ultramarine-blue/10",
        "high grade":
          "text-ultramarine-blue border-ultramarine-blue/30 bg-ultramarine-blue/10",

        industrial:
          "text-carolina-blue border-carolina-blue/30 bg-carolina-blue/10",
        "industrial grade":
          "text-carolina-blue border-carolina-blue/30 bg-carolina-blue/10",

        "consumer grade":
          "text-light-steel-blue border-light-steel-blue/30 bg-light-steel-blue/10",
        "base grade":
          "text-light-steel-blue border-light-steel-blue/30 bg-light-steel-blue/10",

        // Agent Quality
        distinguished:
          "text-ultramarine-blue border-ultramarine-blue/30 bg-ultramarine-blue/10",
        exceptional:
          "text-lavender-indigo border-lavender-indigo/30 bg-lavender-indigo/10",
        superior: "text-steel-pink border-steel-pink/30 bg-steel-pink/10",
        master: "text-carmine-pink border-carmine-pink/30 bg-carmine-pink/10",

        default:
          "border-transparent bg-secondary text-primary-foreground hover:bg-primary/80",

        // transaction statuses
        accepted: "text-green border-green/30 bg-green/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  children,
  onClick = () => null,
  hasActive = false,
  active = false,
  ...props
}) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      onClick={onClick}
      {...props}
    >
      {children}
      {active && <Icon className="ml-1" name="CrossIcon" />}
    </div>
  );
}

export { Badge, badgeVariants };
