"use client";

import { useTranslation } from "@/services/i18n/client";
import { cn } from "@/lib/utils";

import { AdvantageCard } from "@/components/cards/advantage-card";
import { Carousel } from "@/components/carousel";

export const Advantages = ({ lng, className = "" }) => {
  const { t } = useTranslation(lng, "advantages");

  const advantages = t("items", { returnObjects: true });

  return (
    <div className={cn(className)}>
      <h2 className="text-subtitle text-center">{t("title")}</h2>
      <div className="mt-6 hidden grid-cols-4 gap-7 md:grid">
        {advantages?.map((advantage, index) => (
          <AdvantageCard key={index} {...advantage} />
        ))}
      </div>
      <Carousel
        className="mt-6 md:!hidden"
        slides={advantages?.map((advantage, index) => (
          <AdvantageCard key={index} {...advantage} />
        ))}
      />
    </div>
  );
};
