"use client";

import { forwardRef } from "react";
import { MOTION_CONFIG } from "@/lib/utils/motion";
import { AnimatePresence as MainAnimatePresence, motion } from "framer-motion";

export const AnimatePresence = MainAnimatePresence;

export const Motion = forwardRef(
  (
    { as = "div", className = "", configName = "DEFAULT", children, ...props },
    ref
  ) => {
    const MotionTag = motion[as];

    return (
      <MotionTag
        ref={ref}
        className={className}
        {...MOTION_CONFIG[configName]}
        {...props}
      >
        {children}
      </MotionTag>
    );
  }
);

Motion.displayName = "Motion";
