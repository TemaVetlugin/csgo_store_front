"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { useTranslation } from "@/services/i18n/client";
import {
  useBuyProductsMutation,
  useLazyGetProductsQuery,
} from "@/redux/services/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartProduct, setTotalAmount } from "@/redux/features/cartSlice";

import { Icon } from "@/components/icon";
import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filters } from "@/components/filters";
import { PageWrapper } from "@/components/page-wrapper";
import { AnimatePresence, Motion } from "@/components/motion/motion";
import { ProductCardSkeleton } from "@/components/cards/product-card-skeleton";
import { AlertWarning } from "@/components/alerts/warning";
import { AlertNotification } from "@/components/alerts/notification";
import { useToast } from "@/components/ui/use-toast";

const ProductDialog = dynamic(
  async () =>
    (await import("@/components/dialogs/product-dialog")).ProductDialog
);
const SellTab = dynamic(
  async () => (await import("@/components/store-tabs/sell-tab")).SellTab
);
const SellTabWarn = dynamic(
    async () => (await import("@/components/store-tabs/sell-tab-warn")).SellTabWarn
);
const ScrollToTop = dynamic(
  async () => (await import("@/components/scroll-to-top")).ScrollToTop
);

import { cn } from "@/lib/utils";
import { useSearchParamsHook } from "@/lib/hooks/useSearchParamsHook";
import { useRouter } from "next/navigation";
import {
  API_PAYMNET_ORDER_ITEMS_LS_NAME,
  API_PAYMNET_ORDER_LS_NAME,
} from "@/lib/constants/config";

const ITEMS_PER_PAGE = 15;

export default function Store({ params: { lng } }) {
  const { t } = useTranslation(lng, "store-page");
  const { t: tCheckout } = useTranslation(lng, "checkout-page");
  const { t: tToasts } = useTranslation(lng, "toasts");

  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchParams } = useSearchParamsHook();

  const cartItems = useAppSelector(({ cart }) => cart.cartItems);
  const { user } = useAppSelector(({ auth }) => auth);

  const [
    getProducts,
    {
      data: productsData,
      isFetching: isFetchingProducts,
      isSuccess: isSuccessProducts,
      isError: isErrorProducts,
    },
  ] = useLazyGetProductsQuery();
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

  const observer = useRef();

  const [openMobileFilters, setOpenMobileFilters] = useState(false);
  const [productForDialog, setProductForDialog] = useState(null);
  const [page, setPage] = useState(1);
  const [allProductsData, setAllProductsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [fastBoughtProduct, setFastBoughtProduct] = useState(null);

  const handleGetProducts = useCallback(
    (page, searchParams) => {
      const name = searchParams.get("name");
      const priceMin = searchParams.get("price_min");
      const priceMax = searchParams.get("price_max");
      const types = searchParams.get("types");
      const rarities = searchParams.get("rarities");
      const qualities = searchParams.get("qualities");
      const weapons = searchParams.get("weapons");
      const stickers = searchParams.get("stickers");
      const exteriors = searchParams.get("exteriors");

      const params = {
        page,
        perPage: ITEMS_PER_PAGE,
        ...(name && { name }),
        ...(priceMin && { price_min: priceMin }),
        ...(priceMax && { price_max: priceMax }),
        ...(types && { types: types.split(",").map((i) => i) }),
        ...(rarities && { rarities: rarities.split(",").map((i) => i) }),
        ...(qualities && { qualities: qualities.split(",").map((i) => i) }),
        ...(weapons && { weapons: weapons.split(",").map((i) => i) }),
        ...(stickers && { stickers: stickers.split(",").map((i) => i) }),
        ...(exteriors && { exteriors: exteriors.split(",").map((i) => i) }),
      };

      getProducts({ params });
    },
    [getProducts]
  );

  const lastBookElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => {
            handleGetProducts(prev + 1, searchParams);
            return prev + 1;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [handleGetProducts, hasMore, searchParams]
  );

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

    // isFastBought && router.push(`/${lng}/checkout`);
  };

  useEffect(() => {
    if (!isFetchingProducts && isSuccessProducts) {
      page !== 1
        ? setAllProductsData((prev) => {
            return Array.from(new Set([...prev, ...productsData?.products]));
          })
        : setAllProductsData(productsData?.products);

      setHasMore(productsData?.products?.length === ITEMS_PER_PAGE);
    }
  }, [productsData, isSuccessProducts, isFetchingProducts, page]);

  useEffect(() => {
    setAllProductsData([]);
    setPage(() => {
      handleGetProducts(1, searchParams);

      return 1;
    });
  }, [handleGetProducts, searchParams]);

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

      if (errorCode === "order_amount_is_too_small") {
        toast({
          description: tCheckout("payment.payment_too_small_error"),
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
    <PageWrapper
      className={cn(
        !openMobileFilters && "container",
        openMobileFilters && "p-4"
      )}
    >
      <Tabs
        className={cn("relative mb-12 mt-4", openMobileFilters && "hidden")}
        defaultValue="buy"
      >
        <TabsList className="gap-1">
          <TabsTrigger
            className="transition-all duration-300 ease-in-out"
            value="buy"
          >
            {t("tab_buy_text")}
          </TabsTrigger>
          <TabsTrigger
            className="transition-all duration-300 ease-in-out"
            value="sell"
          >
            {t("tab_sell_text")}
          </TabsTrigger>
        </TabsList>

        {/* Store Buy Tab*/}
        <TabsContent value="buy">
          <div className="absolute right-0 top-0 flex justify-end gap-2">
            <Button
              variant="icon-primary"
              size="icon-default"
              onClick={() => {
                setAllProductsData([]);
                setPage(() => {
                  handleGetProducts(1, searchParams);

                  return 1;
                });
              }}
              aria-label="Refresh products"
            >
              <Icon name="RefreshIcon" />
            </Button>
            <Button
              variant="icon-primary"
              size="icon-default"
              className="ml-[1.125rem] lg:hidden"
              onClick={() => setOpenMobileFilters(!openMobileFilters)}
            >
              <Icon name="FilterIcon" />
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-7 lg:grid lg:grid-cols-4">
            <div className="col-span-1 hidden lg:block">
              <Filters lng={lng} />
            </div>

            <div className="flex w-full auto-rows-max flex-col gap-5 md:!col-span-3 md:grid md:grid-cols-3 lg:grid-cols-3">
              <Suspense>
                <AnimatePresence mode="popLayout">
                  {allProductsData?.length
                    ? allProductsData?.map((product, index) => (
                        <Motion
                          key={`${product?.id}_${index}`}
                          configName="PRODUCT_CARD_WITH_HOVER"
                          custom={{ index: allProductsData.length / 15 }}
                        >
                          <ProductCard
                            ref={
                              allProductsData.length - 6 === index && hasMore
                                ? lastBookElementRef
                                : null
                            }
                            lng={lng}
                            className="transition-all duration-200 hover:shadow-lg"
                            onProductClick={() => setProductForDialog(product)}
                            onProductBuyClick={() =>
                              handleBuyProductClick(product, true)
                            }
                            onProductCartClick={() =>
                              handleBuyProductClick(product)
                            }
                            isLoading={
                              isLoadingProductsData &&
                              fastBoughtProduct?.id === product.id
                            }
                            {...product}
                          />
                        </Motion>
                      ))
                    : null}

                  {isFetchingProducts &&
                    Array(6)
                      .fill({ name: "fake" })
                      .map(
                        (_el, index) =>
                          isFetchingProducts && (
                            <Motion
                              key={index}
                              configName="PRODUCT_CARD_SKELETON"
                              custom={allProductsData.length / 15}
                              className="flex flex-col rounded-xl bg-secondary-200 shadow-sm"
                            >
                              <ProductCardSkeleton />
                            </Motion>
                          )
                      )}
                </AnimatePresence>
              </Suspense>

              <AlertWarning
                description="No items found with provided filters."
                className={cn(
                  "col-span-1 hidden md:col-span-3",
                  !isFetchingProducts &&
                    allProductsData?.length == 0 &&
                    productsData?.products?.length === 0 &&
                    "block"
                )}
              />

              <AlertNotification
                description="No more items to load."
                className={cn(
                  "col-span-1 hidden md:col-span-3",
                  !isErrorProducts &&
                    !isFetchingProducts &&
                    !hasMore &&
                    Boolean(allProductsData?.length) &&
                    "block"
                )}
              />

              <AlertWarning
                description="Something went wrong. Try again in a while."
                className={cn(
                  "col-span-1 hidden md:col-span-3",
                  isErrorProducts && "block"
                )}
              />
            </div>
          </div>
        </TabsContent>

        {/* Store Sell Tab*/}
        <TabsContent value="sell">
           {/*<SellTab lng={lng} productsData={productsData} />*/}
          <SellTabWarn lng={lng} productsData={productsData} />
        </TabsContent>
      </Tabs>

      {/* Mobile Filters */}
      {openMobileFilters && (
        <div className="lg:hidden">
          <div className="flex justify-between">
            <h2 className="text-subtitle">Filters</h2>
            <Button
              variant="icon-secondary"
              size="icon-default"
              className=""
              onClick={() => setOpenMobileFilters(!openMobileFilters)}
            >
              <Icon name="FilterIcon" />
            </Button>
          </div>
          <Filters
            lng={lng}
            className={cn("mt-2", openMobileFilters && "block w-full")}
          />
        </div>
      )}

      {/* Dialog For Single Product */}
      <AnimatePresence mode="sync">
        {Boolean(productForDialog) && (
          <ProductDialog
            lng={lng}
            open={Boolean(productForDialog)}
            onClose={() => setProductForDialog(null)}
            product={productForDialog}
          />
        )}
      </AnimatePresence>

      <ScrollToTop />
    </PageWrapper>
  );
}
