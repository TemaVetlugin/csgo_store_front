"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Icon } from "./icon";

import { cn } from "@/lib/utils";
import { AnimatePresence, Motion } from "./motion/motion";

const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export const Carousel = ({
  slides = [],
  className = "",
  arrowsButtom = false,
  chunks = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides.find((slide, index) => index === activeIndex);
  const _chunks = chunkIntoN(slides, chunks);
  const _slides = chunks ? _chunks : slides;

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === _slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? _slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={cn(
        "m-auto flex max-w-[380px] items-center justify-center",
        arrowsButtom && "block w-full",
        className
      )}
    >
      {!arrowsButtom ? (
        <>
          <Button
            variant="icon-primary"
            size="icon-default"
            onClick={prevSlide}
            aria-label="Show previous carousel item"
          >
            <Icon name="ArrowLeftIcon" />
          </Button>
          <AnimatePresence mode="wait">
            <Motion
              key={activeIndex}
              configName="CAROUSEL_SLIDE_CARD"
              className="z-10 mx-2 my-2 flex h-full max-w-[calc(100%-96px)] flex-1 items-center justify-center gap-4"
            >
              {chunks ? _chunks[activeIndex] : activeSlide}
            </Motion>
          </AnimatePresence>
          <Button
            variant="icon-primary"
            size="icon-default"
            onClick={nextSlide}
            aria-label="Show next carousel item"
          >
            <Icon name="ArrowRightIcon" />
          </Button>
        </>
      ) : (
        <>
          <div className="m-0 my-2 flex w-full items-center justify-center gap-4">
            {chunks ? _chunks[activeIndex] : activeSlide}
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button
              variant="icon-primary"
              size="icon-xl"
              onClick={prevSlide}
              aria-label="Show previous carousel item"
            >
              <Icon name="ArrowLeftIcon" />
            </Button>
            <Button
              variant="icon-primary"
              size="icon-xl"
              onClick={nextSlide}
              aria-label="Show next carousel item"
            >
              <Icon name="ArrowRightIcon" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
