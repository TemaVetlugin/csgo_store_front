"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useTranslation } from "@/services/i18n/client";
import { cn } from "@/lib/utils";

import { CustomAccordion } from "@/components/accordion";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/page-wrapper";
import { AnimatedText } from "@/components/motion/animated-text";
import { AnimatePresence, Motion } from "@/components/motion/motion";
import ScrollToTop from "@/components/auto-scroll-to-top";

export default function FAQ({ params: { lng } }) {
  const { t } = useTranslation(lng, "faq-page");

  const [tabs, setTabs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = useMemo(() => tabs.find((slide) => slide.active), [tabs]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => {
      const index = prevIndex === tabs.length - 1 ? 0 : prevIndex + 1;

      setTabs(() =>
        tabs.map((tab, _index) => ({ ...tab, active: _index === index }))
      );
      return index;
    });
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => {
      const index = prevIndex === 0 ? tabs.length - 1 : prevIndex - 1;

      setTabs(() =>
        tabs.map((tab, _index) => ({ ...tab, active: _index === index }))
      );

      return index;
    });
  };

  useEffect(() => {
    setTabs(t("tabs", { returnObjects: true }));
  }, [lng, t]);

  return (
    <PageWrapper>
      <ScrollToTop />
      <h1 className="text-subtitle text-center">FAQ</h1>

      {/* Desktop */}
      <Suspense>
        {tabs?.length === 0 && !activeSlide ? null : (
          <div className="hidden md:block" defaultValue={tabs[0]?.name}>
            <div className="mt-4 grid h-full w-full gap-8 bg-transparent md:grid-cols-3">
              {tabs?.map(({ name, active }, i) => (
                <div
                  key={`${name}_${i}`}
                  className={cn(
                    "hidden cursor-pointer items-center justify-center whitespace-nowrap rounded-xl bg-secondary-200 p-0 shadow-sm transition-all duration-500 ease-in-out md:inline-flex",
                    active && "bg-[#DE2424] text-primary shadow-lg"
                  )}
                  onClick={() =>
                    setTabs(
                      tabs?.map((tab) => ({
                        ...tab,
                        active: name === tab.name,
                      }))
                    )
                  }
                >
                  <div className="flex flex-col items-center justify-center">
                    <Icon
                      name={
                        active ? "PanelOpenTopActiveIcon" : "PanelOpenTopIcon"
                      }
                      className="m-auto py-5"
                    />
                    <p className="text-paragraph py-4 text-white">{name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* {tabs?.map((tab, i) => ( */}
            <div key={`${activeSlide?.name}`} value={activeSlide?.name}>
              <Motion configName="FAQ_PAGE_TAB_CONTENT">
                <h2 className="text-paragraph mb-4 mt-12 text-center">
                  {activeSlide?.name}
                </h2>
                <CustomAccordion className="px-8" items={activeSlide?.items} />
              </Motion>
            </div>
            {/* ))} */}
          </div>
        )}
      </Suspense>

      {/* Mobile */}

      <div className="mt-4 md:hidden">
        <div className="flex w-full items-center justify-between gap-2">
          <Button
            variant="icon-primary"
            size="icon-default"
            className="shadow-sm"
            onClick={prevSlide}
          >
            <Icon name="ArrowLeftIcon" />
          </Button>
          <AnimatePresence mode="wait">
            <Motion
              key={activeIndex}
              className="z-10 flex w-[80%] flex-col items-center justify-center rounded-xl bg-[#DE2424] shadow-lg"
              configName="FAQ_PAGE_MOBILE_TAB"
            >
              <Icon
                name={
                  activeSlide?.active
                    ? "PanelOpenTopActiveIcon"
                    : "PanelOpenTopIcon"
                }
                className="py-5"
              />
              <p className="text-paragraph py-4 text-center">
                {activeSlide?.name}
              </p>
            </Motion>
          </AnimatePresence>
          <Button
            variant="icon-primary"
            size="icon-default"
            onClick={nextSlide}
          >
            <Icon name="ArrowRightIcon" />
          </Button>
        </div>
        <div key={activeSlide?.name}>
          <AnimatedText
            as="h3"
            className="text-paragraph mb-4 mt-12 text-center"
            text={activeSlide?.name || ""}
          />
          <CustomAccordion items={activeSlide?.items} />
        </div>
      </div>
    </PageWrapper>
  );
}
