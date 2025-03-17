"use client";

import { useTranslation } from "@/services/i18n/client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeCartItem,
  resetCart,
  setTotalAmount,
} from "@/redux/features/cartSlice";
import { useBuyProductsMutation } from "@/redux/services/productsApi";
import { useRouter } from "next/navigation";

import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/page-wrapper";
import { useToast } from "@/components/ui/use-toast";
import { Suspense, useEffect, useState } from "react";
import { AlertWarning } from "@/components/alerts/warning";
import { Icon } from "@/components/icon";

import {
  API_PAYMNET_ORDER_ITEMS_LS_NAME,
  API_PAYMNET_ORDER_LS_NAME,
} from "@/lib/constants/config";

export default function Cart({ params: { lng } }) {
  const { t } = useTranslation(lng, "cart-page");
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

  const { cartItems, totalAmount } = useAppSelector(({ cart }) => cart);
  const { user } = useAppSelector(({ auth }) => auth);
  const selectedCurrency = useAppSelector(({ main }) => main.selectedCurrency);

  const [fastBoughtProduct, setFastBoughtProduct] = useState(null);

  const handleBuyProductClick = (product) => {
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
  };

  const handleRemoveCartProduct = (product) => {
    dispatch(removeCartItem(product.id));
    dispatch(setTotalAmount());

    !fastBoughtProduct &&
      toast({
        description: tToasts("product_removed_from_cart_success_message", {
          product: product.name,
        }),
      });

    setFastBoughtProduct(null);
  };

  const handleBuyProducts = () => {
    if (!user?.steam_trade_link || !user?.email) {
      toast({
        description: tToasts("checkout_payment_user_error"),
      });

      return;
    }

    buyProducts({ body: { product_ids: cartItems.map(({ id }) => id) } });
  };

  useEffect(() => {
    if (!isLoadingProductsData && isSuccessProductsData) {
      localStorage.setItem(
        API_PAYMNET_ORDER_LS_NAME,
        JSON.stringify(buyProductsData)
      );
      localStorage.setItem(
        API_PAYMNET_ORDER_ITEMS_LS_NAME,
        JSON.stringify(cartItems)
      );

      toast({
        description: tToasts("order_created_success_message"),
      });

      fastBoughtProduct
        ? handleRemoveCartProduct(fastBoughtProduct)
        : dispatch(resetCart());

      router.push(`/${lng}/billing-details?uuid=${buyProductsData.uuid}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    buyProductsData,
    dispatch,
    isLoadingProductsData,
    isSuccessProductsData,
    lng,
    router,
    tToasts,
    toast,
  ]);


  return (
    <PageWrapper className="flex h-full flex-col justify-between">
      <h1 className="text-subtitle text-center">{t("title")}</h1>

      {cartItems?.length ? (
        <div className="mt-4 grid grid-cols-1 gap-7 md:grid-cols-4">
          <Suspense>
            {cartItems?.map((product) => (
              <ProductCard
                key={product.id}
                lng={lng}
                hasRemove={true}
                className="transition-all duration-200 hover:shadow-lg"
                onProductBuyClick={() => handleBuyProductClick(product, true)}
                onProductCartClick={() => handleRemoveCartProduct(product)}
                isLoading={
                  isLoadingProductsData && fastBoughtProduct?.id === product.id
                }
                isDisabledBought={isLoadingProductsData}
                {...product}
              />
            ))}
          </Suspense>
        </div>
      ) : (
        <div className="mt-8 text-center">{t("cart_empty_text")}</div>
      )}

      {isErrorProductsData &&
        errorProductsData?.data?.error?.code ===
          "products_are_out_of_stock" && (
          <AlertWarning
            className="mt-4"
            description={t("payment.payment_some_products_error", {
              products: cartItems
                .filter((ci) =>
                  errorProductsData.data.error.context.products_out_of_stock.includes(
                    ci.id
                  )
                )
                .map(({ name }) => name)
                .join(", "),
            })}
          />
        )}

      <div className="mt-6 flex flex-col items-center justify-between gap-6 md:flex-row">
        <Suspense>
          <div className="text-paragraph">
            <span>{t("total_amount_due")}</span>
            <span className="ml-2 text-destructive">
              {selectedCurrency?.symbol} {totalAmount}
            </span>
          </div>
        </Suspense>

        <Button
          disabled={cartItems?.length === 0 || isLoadingProductsData}
          onClick={handleBuyProducts}
        >
          {isLoadingProductsData && !fastBoughtProduct && (
            <Icon name="SpinnerIcon" iconClassName="animate-spin" />
          )}
          {isLoadingProductsData && !fastBoughtProduct
            ? `${t("checkout_button_label")}...`
            : t("checkout_button_label")}
        </Button>
      </div>

      {isErrorProductsData &&
        errorProductsData?.data?.error?.code === "email_is_not_verified" && (
          <AlertWarning
            className="mt-4"
            description={tCheckout("payment.payment_email_not_verified_error")}
          />
        )}
      {isErrorProductsData &&
        errorProductsData?.data?.error?.code ===
          "order_amount_is_too_large" && (
          <AlertWarning
            className="mt-4"
            description={tCheckout("payment.payment_system_error")}
          />
        )}
      {isErrorProductsData &&
        errorProductsData?.data?.error?.code ===
          "order_amount_is_too_small" && (
          <AlertWarning
            className="mt-4"
            description={tCheckout("payment.payment_too_small_error")}
          />
        )}
      {isErrorProductsData &&
        errorProductsData?.data?.error?.code !== "order_amount_is_too_large" &&
        errorProductsData?.data?.error?.code !== "email_is_not_verified" &&
        errorProductsData?.data?.error?.code !== "products_are_out_of_stock" &&
        errorProductsData?.data?.message !== "Unauthenticated." && (
          <AlertWarning
            className="mt-4"
            description={errorProductsData?.data?.message}
          />
        )}
    </PageWrapper>
  );
}
