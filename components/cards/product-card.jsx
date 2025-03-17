"use client";

import { forwardRef } from "react";

import { useAppSelector } from "@/redux/hooks";
import { useTranslation } from "@/services/i18n/client";

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Icon } from "../icon";
import { Badge } from "../ui/badge";
import { CustomTooltip } from "../custom-tooltip";
import { Motion } from "../motion/motion";
import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

export const ProductCard = forwardRef(
  (
    {
      lng,
      sell = false,
      hasRemove = false,
      name = "",
      price = 0,
      extra = { quality: "", type: "", rarity: "" },
      link = "",
      stickers = [],
      onProductClick = () => null,
      onProductBuyClick = () => null,
      onProductCartClick = () => null,
      className = "",
      isLoading = false,
      isDisabledBought = false,
    },
    ref
  ) => {
    const { t } = useTranslation(lng, "product-card");

    const selectedCurrency = useAppSelector(
      ({ main }) => main.selectedCurrency
    );

    const getProductOptions = () => {
      const additionOptionsInfo = {
        0: { href: `/${lng}/store?types=${extra?.type}` },
        1: { href: link, rel: "noopener noreferrer" },
      };

      return t("product_options", { returnObjects: true })?.map(
        (po, index) => ({
          ...po,
          ...additionOptionsInfo[index],
        })
      );
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "flex flex-col justify-between rounded-xl bg-secondary-200 shadow-sm",
          className
        )}
      >
        <CardHeader className="px-6 py-3">
          <CardTitle
            className="!text-mini-semibold cursor-pointer truncate text-center md:text-left"
            onClick={onProductClick}
          >
            {name}
          </CardTitle>
          <CardDescription className="!text-tiny mt-1.5 text-center text-secondary-700 md:text-left">
            {`${extra?.quality} / ${extra?.type}`}
          </CardDescription>
          {!sell && (
            <Badge
              className="m-auto w-max capitalize md:m-0"
              variant={extra?.rarity?.toLowerCase()}
            >
              {extra?.rarity}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="mt-3 flex-1 pb-1.5">
          <div className="relative flex h-full flex-col items-center justify-center rounded-2xl bg-secondary-600 px-1.5 py-3.5 shadow-inner">
            <Icon name="ItemLineHighlightIcon" className="absolute top-0" />
            <Image
              className="relative h-[128px] w-auto cursor-pointer text-sm font-normal"
              width="0"
              height="0"
              sizes="100vw"
              src={`https://api.steamapis.com/image/item/730/${name}`}
              alt={`The image of ${name}`}
              onClick={onProductClick}
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                {stickers?.map((sticker, index) => {
                  return (
                    <Motion
                      key={`${sticker?.img}_${index}_${sticker?.name}`}
                      configName="PRODUCT_STICKERS_HOVER"
                    >
                      <CustomTooltip text={sticker?.name}>
                        <Image
                          className="h-auto w-[21px] cursor-pointer"
                          width="0"
                          height="0"
                          sizes="100vw"
                          src={sticker?.img}
                          alt={sticker?.name}
                        />
                      </CustomTooltip>
                    </Motion>
                  );
                })}
              </div>
              <div className="flex gap-1">
                {getProductOptions().map(
                  (option) =>
                    option?.href && (
                      <CustomTooltip
                        key={option?.iconName}
                        text={option?.tooltipText}
                      >
                        <Link
                          key={option?.iconName}
                          className={buttonVariants({
                            variant: "icon-primary",
                            size: "icon-xs",
                          })}
                          href={option?.href}
                          rel={option?.rel}
                          target="_blank"
                          aria-label={option?.tooltipText}
                        >
                          <Icon name={option?.iconName} />
                        </Link>
                      </CustomTooltip>
                    )
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-2">
          <div className="flex w-full justify-between gap-1.5">
            <Button
              className="!text-tiny flex !h-auto flex-1 flex-wrap items-center px-1"
              variant="primary"
              disabled={isLoading || isDisabledBought}
              onClick={onProductBuyClick}
              aria-label={`${t("buy_button_label")} ${
                selectedCurrency?.symbol
              }${price}`}
            >
              {isLoading && (
                <Icon
                  name="SpinnerIcon"
                  className="mr-3 w-[1rem]"
                  iconClassName="animate-spin"
                />
              )}
              <span className="w-max">
                {isLoading
                  ? `${t("buy_button_label")}...`
                  : t("buy_button_label")}
              </span>
              {!isLoading && (
                <div>
                  <span className="ml-0.5">{selectedCurrency?.symbol}</span>
                  {price}
                </div>
              )}
            </Button>
            {!sell && (
              <Button
                size="icon-default"
                variant="icon-primary"
                onClick={onProductCartClick}
                aria-label="Shopping cart button"
              >
                {hasRemove ? <Trash2 /> : <Icon name="BasketIcon" />}
              </Button>
            )}
            {!sell && (
              <Link
                className={buttonVariants({
                  size: "icon-default",
                  variant: "icon-primary",
                })}
                href={`https://steamcommunity.com/market/listings/730/${name}`}
                target="_blank"
                aria-label="See a product in Steam"
              >
                <Icon name="SteamIcon" />
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  }
);

ProductCard.displayName = ProductCard;
