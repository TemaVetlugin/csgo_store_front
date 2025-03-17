"use client";

import { Motion } from "./motion/motion";
import { Button } from "./ui/button";

import { MoveUp } from "lucide-react";

export const ScrollToTop = () => {
  return (
    <Motion
      configName="STORE_RETURN_TO_TOP_BUTTON"
      className="fixed bottom-5 right-5 z-50"
    >
      <Button
        className="h-auto rounded-full px-3 py-3"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        aria-label="Scroll to the top of the page"
      >
        <MoveUp />
      </Button>
    </Motion>
  );
};
