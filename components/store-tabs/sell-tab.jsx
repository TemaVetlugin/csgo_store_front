"use client";

import { useTranslation } from "@/services/i18n/client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { AUTHENTICATION_STATUS } from "@/redux/features/authSlice";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "../cards/product-card";
import { InputWithLabel } from "../inputs/input-with-label";
import { Button, buttonVariants } from "../ui/button";
import { Carousel } from "../carousel";
import { InputWithIcon } from "../inputs/input-with-icon";
import { Icon } from "../icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Motion } from "../motion/motion";

import { getPaymentMethodsData } from "@/lib/utils/data";
import { cn, sliceIntoChunks } from "@/lib/utils";
import { STEAM_SIGN_IN_URL } from "@/lib/constants/config";

import StoreSellOfferImage from "@/public/assets/sell-offer-signin.webp";
import StorePriceSigninImage from "@/public/assets/sell-price-signin.webp";

export const SellTab = ({ lng, productsData = [] }) => {
  const { t: tGeneral } = useTranslation(lng);
  const { t: tInputs } = useTranslation(lng, "inputs");
  const { t: tDropdowns } = useTranslation(lng, "dropdowns");
  const { t } = useTranslation(lng, "store-page");

  const { authenticationStatus } = useAppSelector(({ auth }) => auth);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [priceMethods, setPriceMethods] = useState([
    { label: "Max", selected: true, value: "max" },
    { label: "Min", selected: false, value: "min" },
  ]);

  useEffect(() => {
    setPaymentMethods(
      getPaymentMethodsData(
        tGeneral("general.payment_methods", { returnObjects: true })
      )
    );
  }, [lng, tGeneral]);

  return (
    <div className="mt-6 grid grid-flow-row auto-rows-max grid-cols-1 gap-7 md:grid-cols-2">
      <div className="row-span-1 rounded-xl bg-secondary-200 px-6 pt-1">
        <div className="flex items-center justify-between border-b border-secondary-300 pb-2">
          <h3 className="text-paragraph">{t("offer.title")}</h3>
          <div className="flex items-center gap-2">
            <span>$ 0.00</span>
            <span className="text-destructive">
              <Icon name="BasketIcon" />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-paragraph">
              {authenticationStatus === AUTHENTICATION_STATUS.AUTHENTICATED
                ? t("offer.explore_your_inventory_text")
                : t("offer.sign_in_text")}
            </span>
            <span className="text-mini">{t("offer.add_items_text")}</span>
          </div>
          <Image
            src={StoreSellOfferImage}
            width={194}
            height={144}
            alt="An image of a man holding a gun on a black background"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="row-span-1 rounded-xl bg-secondary-200 p-4">
        <h3 className="text-paragraph text-center">{t("payment.title")}</h3>
        <p className="text-mini py-3 text-center">{t("payment.text")}</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {paymentMethods.map(({ name, type, iconName, selected }) => (
            <div
              key={name}
              className={cn(
                "#ffffff33 flex cursor-pointer items-center gap-2 rounded-xl border-l-2 border-[#ffffff33] bg-secondary-300 px-3 py-3",
                selected && "border-[#E24E4E] bg-[#e24e4e1a] text-destructive"
              )}
              onClick={() =>
                setPaymentMethods(
                  paymentMethods.map((pm) => ({
                    ...pm,
                    selected: pm.name === name,
                  }))
                )
              }
            >
              <Icon name={iconName} className="opacity-80" />
              <span className="text-tiny">{name}</span>
              <span className="text-tiny opacity-30">{type}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="row-span-2 row-start-2 rounded-xl bg-secondary-200 py-7 md:row-start-auto">
        <div className="flex flex-col justify-between gap-3 px-5 md:flex-row md:gap-24">
          <div className="flex gap-2">
            <Button variant="icon-primary" size="icon-default">
              <Icon name="RefreshIcon" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-10 items-center rounded-md border border-secondary-300 bg-secondary-200 px-3 py-2 outline-none">
                <span>{tDropdowns("price.label")}:</span>
                <span className="ml-1">
                  {
                    priceMethods.find((priceMethod) => priceMethod.selected)
                      .label
                  }
                </span>
                <Icon name="ChevronDownIcon" className="ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-fit">
                {priceMethods.map((priceMethod) => (
                  <DropdownMenuItem
                    key={priceMethod.value}
                    className={cn(
                      "uppercase",
                      priceMethod.selected && "bg-primary/30 text-primary"
                    )}
                    onClick={() => {
                      setPriceMethods(
                        priceMethods.map((_priceMethod) => ({
                          ..._priceMethod,
                          selected: priceMethod.value === _priceMethod.value,
                        }))
                      );
                    }}
                  >
                    {priceMethod.selected && (
                      <Icon name="CheckIcon" className="mr-1" />
                    )}
                    <span>{priceMethod.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <InputWithIcon
            input={{ placeholder: tInputs("search_placeholder") }}
            icon={{ name: "SearchIcon", className: "top-3" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center overflow-hidden px-2">
          {authenticationStatus === AUTHENTICATION_STATUS.AUTHENTICATED ? (
            <>
              <div className="scrollbar-thumb-destructive scrollbar-thumb-rounded-md scrollbar-thin scrollbar-track-secondary-300 flex w-full gap-5 overflow-x-scroll py-10">
                {productsData?.products?.map((product, index) => (
                  <Motion
                    key={`${product.id}_${index}`}
                    configName="PRODUCT_CARD_SELL_CAROUSEL"
                  >
                    <ProductCard
                      className="w-max flex-shrink-0"
                      lng={lng}
                      sell
                      {...product}
                    />
                  </Motion>
                ))}
              </div>
              {/* <Carousel
                className="!hidden md:!block"
                chunks={sliceIntoChunks(productsData?.products).length}
                arrowsButtom
                slides={productsData?.products?.map((product, index) => (
                  <ProductCard
                    key={`${product.id}_${index}`}
                    lng={lng}
                    sell
                    {...product}
                  />
                ))}
              />
              <Carousel
                className="md:!hidden"
                arrowsButtom
                slides={productsData?.products?.map((product, index) => (
                  <ProductCard
                    key={`${product.id}_${index}`}
                    lng={lng}
                    sell
                    {...product}
                  />
                ))}
              /> */}
            </>
          ) : (
            <div className="py-10">
              <Image
                src={StorePriceSigninImage}
                width={194}
                height={144}
                alt="Two soldiers with guns on a red background"
                placeholder="blur"
              />
              <h3 className="text-paragraph mt-5">
                {t("offer.not_logged_in_text")}
              </h3>
              <p className="text-mini mb-5 mt-2">
                {t("offer.please_sign_in_text")}
              </p>
              <Link href={STEAM_SIGN_IN_URL} className={buttonVariants()}>
                {t("offer.sign_in_with_steam_button_label")}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="row-span-2 flex flex-col items-center rounded-xl bg-secondary-200 p-8">
        <h3 className="text-paragraph text-center">{t("details.title")}</h3>
        <p className="text-mini mt-3 text-center">{t("details.text")}</p>
        <InputWithLabel
          required
          label={t("details.input_label")}
          className="mt-3"
          input={{ placeholder: t("details.input_placeholder") }}
          icon={{ name: "PayPalIcon" }}
        />
        <InputWithLabel
          required
          label={t("details.confirm_input_label")}
          className="mt-3"
          input={{ placeholder: t("details.confirm_input_placeholder") }}
          icon={{ name: "PayPalIcon" }}
        />
        <div className="mt-3 flex w-full flex-col gap-2 rounded-xl border border-dashed border-secondary-300 bg-secondary-600 px-4 py-3">
          <div className="text-tiny flex justify-between">
            <span>{t("details.estimated_text")}</span>
            <span className="text-destructive">$0.25</span>
          </div>
          <div className="text-tiny flex justify-between">
            <span>{t("details.total_amount_text")}</span>
            <span className="text-destructive">$0.00</span>
          </div>
        </div>
        <Button className="mt-7">
          {t("details.receive_your_cash_instantly_button_label")}
        </Button>
      </div>
    </div>
  );
};
