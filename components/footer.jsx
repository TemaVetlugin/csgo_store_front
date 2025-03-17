"use client";

import { useTranslation } from "@/services/i18n/client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icon";
import { Motion } from "./motion/motion";

import FooterImage from "@/public/assets/footer.png";
import Logo from "@/public/assets/logo.png";

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, "footer");

  const firstLinks = t("firstLinks", { returnObjects: true });
  const secondLinks = t("secondLinks", { returnObjects: true });

  return (
    <Motion as="footer" className="w-full" configName="FOOTER">
      <div className="container relative flex flex-col border-t border-secondary-300 py-12 md:grid md:grid-cols-4 md:items-center md:justify-center">
        <div className="col-span-2 mb-7 flex flex-col items-center text-center sm:mb-0 md:block md:text-left">
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="Open home page"
          >
            <Image
                src={Logo}
                width="0"
                height="50"
                alt="A soldier from CS:GO holding a gun"
                placeholder="blur"
            />
          </Link>
          <p className="w-[325px] py-7">{t("text")}</p>
          <div className="flex items-center gap-8">

          </div>
        </div>
        <div className="col-span-2 grid gap-5 md:grid-cols-2 md:gap-0">
          <ul className="flex flex-col gap-3">
            {firstLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={`/${lng}${href}`}
                  className="text-mini flex w-fit transition-all duration-300 ease-in-out hover:scale-x-105 hover:text-destructive"
                >
                  
                  {name}
                </Link>
                
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3">
            {secondLinks.map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={`/${lng}${href}`}
                  className="text-mini flex w-fit transition-all duration-300 ease-in-out hover:scale-x-105 hover:text-destructive"
                >
                  {name}
                </Link>
              </li>
            ))}
          <div className="flex items-center gap-4">

            <Icon
              name="MasterCardIcon"
              />

              <Icon
              name= "VisaIcon"
              />
              </div>
          </ul>
        </div>
        <Image
          src={FooterImage}
          width="0"
          height="0"
          sizes="100vw"
          alt="A soldier from CS:GO holding a gun"
          className="absolute bottom-0 right-[5%] -z-10 h-auto w-[240px] translate-y-9 md:left-[25%] md:sm:translate-y-0"
          placeholder="blur"
        />
      </div>
      <p className="text-tiny bg-secondary-200 py-4 text-center text-secondary-700" dangerouslySetInnerHTML={{ __html: t("rights_reserved_text") }}>
      </p>
    </Motion>
  );
};
