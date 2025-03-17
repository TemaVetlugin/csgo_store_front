"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Icon } from "./icon";
import { AvatarLabel } from "./avatar-label";
import { useTranslation } from "@/services/i18n/client";

export const Testimonials = ({ lng, className = "" }) => {
  const { t } = useTranslation(lng, "testimonials");

  const testimonials = t("items", { returnObjects: true });

  const [activeIndex, setActiveIndex] = useState(0);

  const maxShowSlides = testimonials.slice(4).length + 1;
  const slides = testimonials.slice(activeIndex);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      return prevIndex === maxShowSlides ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? maxShowSlides : prevIndex - 1
    );
  };

  const mobileSlides = testimonials;
  const mobileSlide = testimonials.find(
    (slide, index) => index === activeIndex
  );

  const nextSlideMobile = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === mobileSlides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlideMobile = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? mobileSlides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={className}>
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          <h2 className="text-subtitle">{t("title")}</h2>
          <div className="flex gap-3">
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
        </div>
        <div className="mt-6 flex flex-row flex-nowrap gap-7">
          {[...slides, { id: Math.random() }].map((el, index) => (
            <div
              key={index}
              className={cn(
                "grid min-w-[300px] rounded-xl bg-[#222227] px-6 py-4",
                index === slides.length && "invisible"
              )}
            >
              <Icon name="QuotesIcon" />
              <p className="text-mini mt-6 px-3 text-[#71717A]">
                <span>{el?.text}</span>
              </p>
              <AvatarLabel
                className="mt-6"
                user={{ name: el?.user?.name, email: el?.user?.email }}
                avatar={{
                  fallback: el?.user?.fallback,
                  src: el?.user?.src,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden">
        <h2 className="text-subtitle text-center">{t("title")}</h2>
        <div className="mt-6 flex flex-row flex-nowrap gap-7">
          <div
            key={mobileSlide?.id}
            className="min-w-[300px] rounded-xl bg-[#222227] px-6 py-4"
          >
            <Icon name="QuotesIcon" />
            <p className="text-mini mt-6 text-[#71717A]">{mobileSlide?.text}</p>
            <AvatarLabel
              className="mt-6"
              user={{
                name: mobileSlide?.user?.name,
                email: mobileSlide?.user?.email,
              }}
              avatar={{
                fallback: mobileSlide?.user?.fallback,
                src: mobileSlide?.user?.src,
              }}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            variant="icon-primary"
            size="icon-xl"
            onClick={prevSlideMobile}
          >
            <Icon name="ArrowLeftIcon" />
          </Button>
          <Button
            variant="icon-primary"
            size="icon-xl"
            onClick={nextSlideMobile}
          >
            <Icon name="ArrowRightIcon" />
          </Button>
        </div>
      </div>
    </div>
  );
};
