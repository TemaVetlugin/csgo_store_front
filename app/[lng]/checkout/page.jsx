"use client";

import {Suspense, useEffect, useState} from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useBuyProductsMutation } from "@/redux/services/productsApi";
import { resetCart } from "@/redux/features/cartSlice";
import { useTranslation } from "@/services/i18n/client";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/input-with-label";
import { InputWithCurrenciesDropDown } from "@/components/inputs/input-with-currencies-dd";
import { PageWrapper } from "@/components/page-wrapper";
import { AlertWarning } from "@/components/alerts/warning";
import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";
import { getPaymentMethodsData } from "@/lib/utils/data";

import { checkoutSchema } from "@/lib/validations/checkout";
import {
  formatCardNumberValue,
  formatCardDateValue,
} from "@/lib/validations/checkout-card";
import {
  API_PAYMENT_DEFAULT_LANG,
  API_PAYMENT_PK_KEY,
  API_PAYMNET_ORDER_ITEMS_LS_NAME,
  API_PAYMNET_ORDER_LS_NAME,
} from "@/lib/constants/config";
import { FUNDS_DATA } from "@/lib/constants/data";

export default function Checkout({ params: { lng } }) {
  const { t } = useTranslation(lng, "checkout-page");
  const { t: tGeneral } = useTranslation(lng);
  const { t: tToasts } = useTranslation(lng, "toasts");
  const { t: tInputs } = useTranslation(lng, "inputs");

  const dispatch = useAppDispatch();

  const [buyProducts, { isLoading, isSuccess, isError, error }] =
    useBuyProductsMutation();

  const { cartItems, totalAmount } = useAppSelector(({ cart }) => cart);
  const { user } = useAppSelector(({ auth }) => auth);

  const selectedCurrency = useAppSelector(({ main }) => main.selectedCurrency);

  const { toast } = useToast();

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [funds, setFunds] = useState(FUNDS_DATA);

  const form = useFormik({
    initialValues: {
      card_number: "",
      date: "",
      cvc: "",
    },
    validationSchema: toFormikValidationSchema(checkoutSchema(tInputs)),
    onSubmit: async (values, actions) => {
      try {
        const { card_number, date, cvc } = values;

        actions.setSubmitting(true);

        handleBuyProducts();
      } catch (error) {
        console.error("error", error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

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
    const orderLS = localStorage.getItem(API_PAYMNET_ORDER_LS_NAME)
      ? JSON.parse(localStorage.getItem(API_PAYMNET_ORDER_LS_NAME))
      : null;
    const amount = orderLS?.transactions?.reduce(
      (acc, cur) => (acc += cur.payed_amount),
      0
    );
    const productNames =
      orderLS?.transactions?.map((t) => t.product.name)?.join(", ") || "";

    window?.widget?.init({
      public_key: API_PAYMENT_PK_KEY,
      baseUrl: "https://api.justipay.com/hpp/",
      flow: "iframe",
      selector: "merchant-widget-mount-point",
      reference_id: orderLS?.uuid,
      amount: amount || 0,
      currency:
        orderLS?.transactions?.[0].payed_in_currency?.toUpperCase() || "EUR",
      language: API_PAYMENT_DEFAULT_LANG,
      description: `${t("payment.iframe_pay_products")} ${productNames}`,
    });

    document.getElementById("payment_widget")?.classList.add("rounded-[20px]");
  }, [selectedCurrency, t]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(API_PAYMNET_ORDER_LS_NAME);
      localStorage.removeItem(API_PAYMNET_ORDER_ITEMS_LS_NAME);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   setPaymentMethods(
  //     getPaymentMethodsData(
  //       tGeneral("general.payment_methods", { returnObjects: true })
  //     )
  //   );
  // }, [lng, tGeneral]);
  //
  // useEffect(() => {
  //   if (!isLoading && isSuccess) {
  //     toast({
  //       description: tToasts("checkout_payment_success_message", {
  //         products: cartItems.map(({ name }) => name).join(","),
  //       }),
  //     });
  //
  //     dispatch(resetCart());
  //   }
  // }, [dispatch, isLoading, isSuccess, tToasts, toast]);

  return (
    <PageWrapper>
      <div className="mt-4 flex flex-1 flex-col">
        <div
          id="merchant-widget-mount-point"
          className="h-[80vh] rounded-[20px]"
        />

         <div className="rounded-xl bg-secondary-200 px-5 py-6">
          <h3 className="text-paragraph text-center md:text-left">
            {t("funds.title")}
          </h3>
          <p className="text-mini py-4 text-center md:text-left">
            {t("funds.text")}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
            {funds.map(({ amount, selected }) => (
              <div
                key={amount}
                className={cn(
                  "py-3#ffffff33 flex cursor-pointer justify-center gap-2 rounded-xl border-l-2 border-[#ffffff33] bg-secondary-300 px-3 py-5",
                  selected && "border-[#E24E4E] bg-[#e24e4e1a] text-destructive"
                )}
                onClick={() =>
                  setFunds(
                    funds.map((pm) => ({
                      ...pm,
                      selected: pm.amount === amount,
                    }))
                  )
                }
              >
                <span className="text-tiny">${amount}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center">
            <span className="h-[1px] w-[50%] bg-white opacity-20" />
            <span className="px-3">{t("funds.or")}</span>
            <span className="h-[1px] w-[50%] bg-white opacity-20" />
          </div>
          <div className="mt-4">
            <h3 className="text-mini">{t("funds.amount_title")}</h3>
            <p className="text-mini mt-1 text-[#71717A]">
              {t("funds.amount_text")}
            </p>
            <InputWithCurrenciesDropDown
              className="mt-2"
              input={{ placeholder: "1,000.00", error: "" }}
              icon={{ text: selectedCurrency.symbol }}
            />
          </div>
        </div>
         <div className="rounded-xl bg-secondary-200 px-5 py-6">
          <h3 className="text-paragraph text-center md:text-left">
            {t("payment.title")}
          </h3>
          <p className="text-mini py-4 text-center md:text-left">
            {t("payment.text")}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
            {paymentMethods.map(({ name, type, iconName, selected }) => (
              <div
                key={name}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-xl border-l-2 border-[#ffffff33] bg-secondary-300 px-3 py-3 py-3",
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
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className="text-tiny">{name}</span>
                  <span className="text-tiny opacity-30">{type}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex w-full flex-col gap-2 rounded-xl border border-dashed border-secondary-300 bg-secondary-600 px-4 py-3">
            <div className="text-tiny flex justify-between">
              <span>{t("payment.fee_text")}</span>
              <span className="text-destructive">
                {selectedCurrency?.symbol} 0
              </span>
            </div>
            <div className="text-tiny flex justify-between">
              <span>{t("payment.to_your_balance_text")}</span>
              <Suspense>
                <span className="text-destructive">
                  {selectedCurrency?.symbol} {totalAmount}
                </span>
              </Suspense>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-4 md:grid-rows-1">
            <InputWithLabel
              required
              label={t("payment.card_number_label")}
              className="col-span-2"
              input={{
                placeholder: "____-____-____-____",
                name: "card_number",
                value: form.values.card_number,
                onChange: (e) =>
                  form.setFieldValue(
                    "card_number",
                    formatCardNumberValue(e.target.value)
                  ),
                onBlur: form.handleBlur,
                error:
                  form?.errors?.card_number &&
                  form?.touched?.card_number &&
                  form?.errors?.card_number,
                autoComplete: "off",
              }}
              icon={{ name: "CreditCardIcon", className: "h-5" }}
            />
            <InputWithLabel
              required
              label={t("payment.card_date_label")}
              input={{
                placeholder: t("payment.card_date_label"),
                name: "date",
                value: form.values.date,
                onChange: (e) =>
                  form.setFieldValue(
                    "date",
                    formatCardDateValue(e.target.value)
                  ),
                onBlur: form.handleBlur,
                error:
                  form?.errors?.date &&
                  form?.touched?.date &&
                  form?.errors?.date,
                autoComplete: "off",
              }}
              icon={{ name: "CreditCardIcon", className: "h-5" }}
            />
            <InputWithLabel
              required
              label="CVC"
              input={{
                placeholder: "CVC",
                name: "cvc",
                value: form.values.cvc,
                onChange: form.handleChange,
                onBlur: form.handleBlur,
                error:
                  form?.errors?.cvc && form?.touched?.cvc && form?.errors?.cvc,
                maxLength: 3,
                autoComplete: "off",
              }}
              icon={{ name: "CreditCardIcon", className: "h-5" }}
            />
          </div>
          <Button
            className="mt-4 w-full md:w-[20%]"
            disabled={cartItems?.length === 0}
            onClick={form.handleSubmit}
          >
            {isLoading && (
              <Icon name="SpinnerIcon" iconClassName="animate-spin" />
            )}
            {isLoading
              ? t("payment.pay_button_in_process_label")
              : t("payment.pay_button_label")}
            {t("payment.pay_button_label")}
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
