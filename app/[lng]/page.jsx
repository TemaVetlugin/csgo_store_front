"use client";

import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "@/services/i18n/client";
import {
  useBuyProductsMutation,
  useGetPopularProductsQuery,
} from "@/redux/services/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartProduct, setTotalAmount } from "@/redux/features/cartSlice";

import { Carousel } from "@/components/carousel";
import { ProductCard } from "@/components/cards/product-card";
import { Advantages } from "@/components/advantages";
import { HeaderBanner } from "@/components/header-banner";
import { NewsSubscribtion } from "@/components/news-subscribtion";
import { Testimonials } from "@/components/testimonials";
import { PageWrapper } from "@/components/page-wrapper";
import { Motion } from "@/components/motion/motion";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ScrollToTop from "@/components/auto-scroll-to-top";
import {
  API_PAYMNET_ORDER_ITEMS_LS_NAME,
  API_PAYMNET_ORDER_LS_NAME,
} from "@/lib/constants/config";

export default function Home({ params: { lng } }) {
  const { t } = useTranslation(lng, "home-page");
  const { t: tCheckout } = useTranslation(lng, "checkout-page");
  const { t: tToasts } = useTranslation(lng, "toasts");

  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    data: popularProducts,
    isSuccess,
    isLoading,
  } = useGetPopularProductsQuery();
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

  const [fastBoughtProduct, setFastBoughtProduct] = useState(null);

  const handleBuyProductClick = (product, isFastBought = false) => {
    if (isFastBought) {
      if (!user?.steam_trade_link || !user?.email) {
        toast({
          description: tToasts("checkout_payment_user_error"),
        });

        return;
      }

      setFastBoughtProduct(product);
      buyProducts({ body: { product_ids: [product.id] } });

      localStorage.setItem(
        API_PAYMNET_ORDER_ITEMS_LS_NAME,
        JSON.stringify([product])
      );

      return;
    }

    const hasCartProduct = cartItems.find((i) => i.id === product.id);

    if (hasCartProduct) {
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

    // isFastBought && router.push(`/${lng}/checkout`);
  };

  useEffect(() => {
    if (!isLoadingProductsData && isSuccessProductsData) {
      localStorage.setItem(
        API_PAYMNET_ORDER_LS_NAME,
        JSON.stringify(buyProductsData)
      );

      setFastBoughtProduct(null);

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

  if (isLoading) {
    return null;
  }

  return (
    <PageWrapper className="mt-28 overflow-hidden">
      <ScrollToTop />
      <HeaderBanner lng={lng} />
      <Motion configName="SLIDE_UP_WHILE_IN_VIEW">
        {isSuccess && (
          <h2 className="text-subtitle mt-24 flex flex-col items-center justify-center sm:flex-row">
            <span className="mr-2 text-destructive">
              {t("popular_title_text")}
            </span>
            <span>{t("csgo_items_title_text")}</span>
          </h2>
        )}
        <Suspense>
          {isSuccess && !isLoading && !!popularProducts?.products?.length && (
            <Motion
              className="mt-6 hidden gap-7 md:grid md:grid-cols-3 lg:grid-cols-4"
              configName="PRODUCT_CARDS"
            >
              {popularProducts?.products?.slice(0, -1)?.map((product) => (
                <Motion key={product.id} configName="PRODUCT_CARD">
                  <ProductCard
                    lng={lng}
                    className="transition-all duration-300 ease-in-out hover:shadow-lg"
                    onProductBuyClick={() =>
                      handleBuyProductClick(product, true)
                    }
                    onProductCartClick={() => handleBuyProductClick(product)}
                    isLoading={
                      isLoadingProductsData &&
                      fastBoughtProduct?.id === product.id
                    }
                    {...product}
                  />
                </Motion>
              ))}
            </Motion>
          )}

          {isSuccess && !isLoading && (
            <Carousel
              className="mt-6 h-[415px] md:!hidden"
              slides={popularProducts?.products?.map((product) => (
                <ProductCard
                  key={product.id}
                  lng={lng}
                  className="w-full"
                  onProductBuyClick={() => handleBuyProductClick(product, true)}
                  onProductCartClick={() => handleBuyProductClick(product)}
                  isLoading={
                    isLoadingProductsData &&
                    fastBoughtProduct?.id === product.id
                  }
                  {...product}
                />
              ))}
            />
          )}
        </Suspense>
      </Motion>
      <Motion configName="SLIDE_UP_WHILE_IN_VIEW">
        <Advantages lng={lng} className="py-12" />
      </Motion>
      {/*<Motion configName="SLIDE_UP_WHILE_IN_VIEW">*/}
      {/*  <Testimonials lng={lng} className="py-12" />*/}
      {/*</Motion>*/}
      <Motion configName="SLIDE_UP_WHILE_IN_VIEW">
        <NewsSubscribtion lng={lng} className="py-12" />
      </Motion>
    </PageWrapper>
  );
}
