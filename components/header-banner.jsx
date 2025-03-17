"use client";

import { useTranslation } from "@/services/i18n/client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Motion } from "./motion/motion";

import HeaderBannerImage from "@/public/assets/header-img.png";

export const HeaderBanner = ({ className = "", lng }) => {
  const { t } = useTranslation(lng, "header-banner");

  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left">
        <div className="md:w-[70%]">
          <Motion
            as="h1"
            className="text-title"
            configName="HEADER_BANNER_TITLE"
          >
            <p>{t("elevate_your_game_text")}</p>
            <p className="inline">{t("buy_sell_skins_text")}</p>
            <span className="ml-2 text-destructive">{t("now_text")}</span>
          </Motion>
          <Motion
            as="p"
            className="w-full py-4"
            configName="HEADER_BANNER_TEXT"
          >
            {t("description")}
          </Motion>
          <Motion className="w-full py-4" configName="HEADER_BANNER_TEXT">
            <Link className={buttonVariants()} href="/store">
              {t("go_store_button_label")}
            </Link>
          </Motion>
        </div>
        <Motion configName="HEADER_BANNER_IMG">
          <Image
            src={HeaderBannerImage}
            width={400}
            height={485}
            alt="A soldier from CS:GO holding a gun on a red circle background"
            className="mt-5 md:mt-0"
            placeholder="blur"
          />
        </Motion>
      </div>
    </div>
  );
};
