"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Motion, AnimatePresence } from "./motion/motion";

export const PageWrapper = ({ children, className = "" }) => {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <Motion
          key={pathname}
          configName="PAGE_WRAPPER"
          className={cn("container mb-12 mt-6", className)}
        >
          {children}
        </Motion>
      </AnimatePresence>
    </>
  );
};
