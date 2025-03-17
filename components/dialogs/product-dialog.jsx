"use client";

import { useTranslation } from "@/services/i18n/client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartProduct, setTotalAmount } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import { useBuyProductsMutation } from "@/redux/services/productsApi";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "../icon";
import { Button, buttonVariants } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Motion } from "../motion/motion";
import { CustomTooltip } from "../custom-tooltip";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";
import {
  API_PAYMNET_ORDER_ITEMS_LS_NAME,
  API_PAYMNET_ORDER_LS_NAME,
} from "@/lib/constants/config";

export const ProductDialog = ({
  lng,
  open = false,
  onClose = () => null,
  product,
}) => {
  const { t } = useTranslation(lng, "product-dialog");
  const { t: tCheckout } = useTranslation(lng, "checkout-page");
  const { t: tToasts } = useTranslation(lng, "toasts");

  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [
    buyProducts,
    {
      data: buyProductsData,
      isLoading: isLoadingProductsData,
      isSuccess: isSuccessProductsData,
      isError: isErrorProductsData,
      error: errorProductsData,
    },
  ] = useBuyProductsMutation();

  const cartItems = useAppSelector(({ cart }) => cart.cartItems);
  const { user } = useAppSelector(({ auth }) => auth);

  const handleBuyProductClick = (product, isFastBought = false) => {
    if (isFastBought) {
      if (!user?.steam_trade_link || !user?.email) {
        toast({
          description: tToasts("checkout_payment_user_error"),
        });

        return;
      }

      buyProducts({ body: { product_ids: [product.id] } });

      localStorage.setItem(
        API_PAYMNET_ORDER_ITEMS_LS_NAME,
        JSON.stringify([product])
      );

      return;
    }

    const hasProduct = cartItems.find((i) => i.id === product.id);

    if (hasProduct) {
      toast({
        description: tToasts("product_exist_in_cart_warning_message", {
          product: product.name,
        }),
      });

      return;
    }

    dispatch(addCartProduct(product));
    dispatch(setTotalAmount());

    toast({
      description: tToasts("product_added_to_cart_success_message", {
        product: product.name,
      }),
    });

    // isFastBought && router.push("/checkout");
  };

  useEffect(() => {
    if (!isLoadingProductsData && isSuccessProductsData) {
      localStorage.setItem(
        API_PAYMNET_ORDER_LS_NAME,
        JSON.stringify(buyProductsData)
      );

      toast({
        description: tToasts("order_created_success_message"),
      });

      router.push(`/${lng}/billing-details?uuid=${buyProductsData.uuid}`);
    }
  }, [
    buyProductsData,
    isLoadingProductsData,
    isSuccessProductsData,
    lng,
    router,
    tToasts,
    toast,
  ]);

  useEffect(() => {
    if (isErrorProductsData) {
      const errorCode = errorProductsData?.data?.error?.code;
      const errorMessage = errorProductsData?.data?.message;

      if (errorCode === "products_are_out_of_stock") {
        toast({
          description: tCheckout("payment.payment_some_productss_error"),
        });
      }

      if (errorCode === "email_is_not_verified") {
        toast({
          description: tCheckout("payment.payment_email_not_verified_error"),
        });
      }

      if (errorCode === "order_amount_is_too_large") {
        toast({
          description: tCheckout("payment.payment_system_error"),
        });
      }

      if (
        errorCode !== "order_amount_is_too_large" &&
        errorCode !== "products_are_out_of_stock" &&
        errorCode !== "email_is_not_verified" &&
        errorMessage !== "Unauthenticated."
      ) {
        toast({
          description: errorProductsData?.data?.message,
        });
      }
    }
  }, [
    errorProductsData?.data?.error?.code,
    errorProductsData?.data?.message,
    isErrorProductsData,
    tCheckout,
    toast,
  ]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl border-0 bg-secondary-200 py-12 shadow-md md:py-5">
        <Motion
          configName="PRODUCT_DIALOG"
          className="grid gap-7 md:grid-cols-2"
        >
          <div>
            <div className="flex h-full justify-center rounded-xl bg-[#1B1B20] p-10">
              <Image
                width={344}
                height={204}
                className="w-[256px] md:w-[344px]"
                src={`https://api.steamapis.com/image/item/730/${product?.name}`}
                alt={`The image of ${product?.name}`}
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <h3 className="text-paragraph">{product?.name}</h3>
                <p className="text-mini py-1 text-muted">
                  {`${product?.extra?.quality} / ${product?.extra?.type}`}
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-1">
                {product?.stickers?.map((sticker, index) => {
                  return (
                    <Motion
                      key={`${sticker?.img}_${index}`}
                      configName="PRODUCT_STICKERS_HOVER"
                      className="cursor-pointer"
                    >
                      <CustomTooltip text={sticker?.name}>
                        <Image
                          width={41}
                          height={41}
                          src={sticker?.img}
                          alt={sticker?.name}
                        />
                      </CustomTooltip>
                    </Motion>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-secondary-600 px-4 py-4">
              <div className="text-tiny my-2 flex justify-between">
                <span>{t("type_text")}:</span>
                <span>{product?.extra?.type}</span>
              </div>
              <div className="text-tiny my-2 flex justify-between">
                <span>{t("weapons_text")}:</span>
                <span>{product?.extra?.weapon}</span>
              </div>
              <div className="text-tiny my-2 flex justify-between">
                <span>{t("exterior_text")}:</span>
                <span>{product?.extra?.exterior}</span>
              </div>
              <div className="text-tiny my-2 flex justify-between">
                <span>{t("qualities_text")}:</span>
                <span>{product?.extra?.quality}</span>
              </div>
            </div>
            <div className="mt-4 grid auto-cols-max grid-cols-4 items-center gap-2">
              <Button
                className="col-span-2"
                disabled={isLoadingProductsData}
                onClick={() => handleBuyProductClick(product, true)}
              >
                {isLoadingProductsData && (
                  <Icon
                    name="SpinnerIcon"
                    className="mr-3 w-[1rem]"
                    iconClassName="animate-spin"
                  />
                )}
                {isLoadingProductsData
                  ? `${t("buy_button_label")}...`
                  : t("buy_button_label")}
                {isLoadingProductsData ? "" : product?.price}
              </Button>
              <div className="col-span-2 flex gap-2">
                <Button
                  size="icon-lg"
                  variant="icon-primary"
                  onClick={() => handleBuyProductClick(product)}
                >
                  <Icon name="BasketIcon" />
                </Button>
                <Link
                  className={buttonVariants({
                    size: "icon-lg",
                    variant: "icon-primary",
                  })}
                  href={`https://steamcommunity.com/market/listings/730/${product?.name}`}
                  target="_blank"
                >
                  <Icon name="SteamIcon" />
                </Link>
              </div>
            </div>
          </div>
        </Motion>
      </DialogContent>
    </Dialog>
  );
};
