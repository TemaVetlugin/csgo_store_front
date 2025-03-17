"use client";

import { useState } from "react";
import { useTranslation } from "@/services/i18n/client";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { Icon } from "@/components/icon";
import { PageWrapper } from "@/components/page-wrapper";
import { Motion, AnimatePresence } from "@/components/motion/motion";

import AboutImage from "@/public/assets/rules_img.webp";
import ScrollToTop from "@/components/auto-scroll-to-top";

export default function Rules({ params: { lng } }) {
  const { t } = useTranslation(lng, "about-page");

  const [activeRuleIndex, setActiveRuleIndex] = useState(0);

  const aboutData = t("about-data", { returnObjects: true });

  return (
    <PageWrapper>
      <ScrollToTop />
      <h1 className="text-subtitle mb-6">{t("title")}</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
        <Motion
          className="flex h-max flex-col gap-2 rounded-lg bg-secondary-200 p-2 shadow-sm"
          configName="ABOUT_PAGE_ITEMS"
        >
          {aboutData?.map((rule, index) => (
            <Motion
              key={rule.title}
              configName="ABOUT_PAGE_ITEM"
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border border-transparent p-2 transition-all duration-300 ease-in-out",
                activeRuleIndex === index &&
                  "border border-[#E24E4E] border-opacity-30 bg-primary bg-opacity-10 text-[#E24E4E]"
              )}
              onClick={() => {
                setActiveRuleIndex(index);
                setTimeout(
                  () =>
                    document.getElementById(index)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    }),
                  1000
                );
              }}
            >
              <Motion
                key={activeRuleIndex}
                configName={
                  activeRuleIndex === index ? "ABOUT_PAGE_TAB_ICON" : "DEFAULT"
                }
              >
                <Icon name={rule.icon} className="mr-2" />
              </Motion>
              <span className="text-body">{rule.title}</span>
            </Motion>
          ))}
        </Motion>

        <AnimatePresence mode="wait">
          <Motion
            id={activeRuleIndex}
            key={activeRuleIndex}
            className="col-span-1 flex flex-col rounded-lg bg-secondary-200 px-10 py-9 pb-6 pt-9 shadow-sm md:col-span-3"
            configName="ABOUT_PAGE_TAB_CONTENT"
          >
            <h2 className="text-paragraph text-body text-center">
              {aboutData[activeRuleIndex].title}
            </h2>
            <div className="text-mini mt-6">
              <p
                className={cn(
                  !aboutData[activeRuleIndex].content?.items?.length &&
                    "text-center"
                )}
              >
                {aboutData[activeRuleIndex].content?.text}
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {aboutData[activeRuleIndex].content?.items?.map(
                  (item, index) => (
                    <li key={index}>
                      <span className="mr-1">{index + 1})</span>
                      <strong className="mr-2">{item.strong}</strong>
                      {item.text}
                    </li>
                  )
                )}
              </ul>
            </div>
            <Image
              src={AboutImage}
              width="0"
              height="0"
              alt="The logo with a soldier wielding a gun for CS:GO store"
              className="m-auto mt-6 h-auto w-[390px]"
              placeholder="blur"
            />
          </Motion>
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}
