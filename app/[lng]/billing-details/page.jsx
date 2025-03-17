"use client";

import {useFormik} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {useTranslation} from "@/services/i18n/client";
import {InputWithLabel} from "@/components/inputs/input-with-label";
import {TextareaWithLabel} from "@/components/textarea-with-label";
import {Button} from "@/components/ui/button";
import {PageWrapper} from "@/components/page-wrapper";
import {useToast} from "@/components/ui/use-toast";
import {SelectWithLabel} from "@/components/inputs/select-with-label";
import {billingDetailsSchema} from "@/lib/validations";
import ScrollToTop from "@/components/auto-scroll-to-top";
import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useLazyGetOrderPriceQuery} from "@/redux/services/productsApi";
import {API_PAYMNET_ORDER_LS_NAME} from "@/lib/constants/config";
import {useCreatePaymentMutation} from "@/redux/services/paymentsApi";
import {fallbackCurrency as selectedCurrency} from "@/lib/constants/currencies";
import {countries} from "@/lib/constants/countries";

export default function BillingDetails({ params: { lng } }) {
    const { t } = useTranslation(lng, "billing-page");
    const { t: tCheckout } = useTranslation(lng, "checkout-page");
    const { t: tToasts } = useTranslation(lng, "toasts");

    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const uuid = searchParams.get("uuid");

    const [
        createPayment,
        {
            data: buyProductsData,
            isLoading: isLoadingProductsData,
            isSuccess: isSuccessProductsData,
            isError: isErrorProductsData,
            error: errorProductsData,
        },
    ] = useCreatePaymentMutation();

    const [
        getPrice, { data: data, error: error, isLoading: isLoading, isSuccess: isSuccess }] = useLazyGetOrderPriceQuery();

    useEffect(() => {
        getPrice({params: {uuid: uuid}});
    }, []);

    // const [
    //     getOrderPrice,
    //     {
    //         data: price,
    //         isLoading: isLoadingPrice,
    //         isSuccess: isSuccessPrice,
    //         isError: isErrorPrice,
    //         error: errorPrice,
    //     },
    // ] = useGetOrderPriceQuery({params: {uuid: uuid}});

    useEffect(() => {
        if (!uuid) {
            router.push(`/${lng}/`)
        }
    }, []);

    const form = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            country: "",
            countryIso: "",
            city: "",
            address: "",
            phone: "",
            notes: "",
        },
        validationSchema: toFormikValidationSchema(billingDetailsSchema()),
        onSubmit: async (values, actions) => {
            try {
                actions.setSubmitting(true);
                values.uuid = uuid;
                let activeCountry = countries.filter((country)=>country.value === values.country);
                if(!activeCountry||activeCountry.length===0){activeCountry = countries.filter((country)=>country.label === values.country);}
                values.countryIso = activeCountry[0].value??'';
                values.country = activeCountry[0].label??'';
                createPayment({ body: values });
            } catch (error) {
            } finally {
                actions.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (!isLoadingProductsData && isSuccessProductsData) {
            localStorage.setItem(
                API_PAYMNET_ORDER_LS_NAME,
                JSON.stringify(buyProductsData)
            );

            toast({
                description: tToasts("order_created_success_message"),
            });

            router.push(buyProductsData.url);
        }
    }, [
        buyProductsData,
        isLoadingProductsData,
        isSuccessProductsData,
        lng,
        router,
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

            if (errorCode === "payment_initialisation_failed") {
                toast({
                    description: tCheckout("payment.payment_initialisation_error"),
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
        <PageWrapper className="grid gap-6 p-6 md:mt-0 md:w-[600px] bg-transparent">
            <ScrollToTop />
            <h1 className="text-2xl font-black text-white text-center">Billing Details</h1>
            <form onSubmit={form.handleSubmit} className="flex flex-col gap-4">
                <InputWithLabel
                    required
                    label={t("First name")}
                    input={{
                        type: "text",
                        name: "firstName",
                        placeholder: t("Enter first name"),
                        value: form.values.firstName,
                        onChange: form.handleChange,
                        onBlur: form.handleBlur,
                        maxLength: 19,
                        error:
                            form?.errors?.firstName &&
                            form?.touched?.firstName &&
                            form?.errors?.firstName,
                    }}
                />
                <InputWithLabel
                    required
                    label={t("Last name")}
                    input={{
                        type: "text",
                        name: "lastName",
                        placeholder: t("Enter last name"),
                        value: form.values.lastName,
                        onChange: form.handleChange,
                        onBlur: form.handleBlur,
                        maxLength: 19,
                        error: form.touched.lastName && form.errors.lastName,
                    }}
                />
                <SelectWithLabel
                    required
                    label={t("Country/Region")}
                    select={{
                        name: "country",
                        value: form.values.country,
                        onChange: form.handleChange,
                        onBlur: form.handleBlur,
                        options: countries,
                        error: form.touched.country && form.errors.country,
                    }}
                />
                <InputWithLabel
                    required
                    label={t("Town/City")}
                    input={{
                        type: "text",
                        name: "city",
                        placeholder: t("Enter city"),
                        value: form.values.city,
                        onChange: form.handleChange,
                        onBlur: form.handleBlur,
                        maxLength: 32,
                        error: form.touched.city && form.errors.city,
                    }}
                />
                <InputWithLabel
                    required
                    label={t("Street address")}
                    input={{
                        type: "text",
                        name: "address",
                        placeholder: t("Enter your house number and street name"),
                        value: form.values.address,
                        onChange: form.handleChange,
                        onBlur: form.handleBlur,
                        maxLength: 256,
                        error: form.touched.address && form.errors.address,
                    }}
                />
                <InputWithLabel
                    label={t("Phone (optional)")}
                    input={{
                        type: "tel",
                        name: "phone",
                        placeholder: t("Enter your phone number"),
                        value: form.values.phone,
                        onChange: (e) => {
                            const value = e.target.value;
                            const cleanedValue = value.replace(/[^+\d]/g, '');
                            const formattedValue = cleanedValue.startsWith('+') ? cleanedValue : `+${cleanedValue}`;
                            form.setFieldValue('phone', formattedValue);
                        },

                        onBlur: form.handleBlur,
                        maxLength: 32,
                        error: form.touched.phone && form.errors.phone,
                    }}
                />
                <TextareaWithLabel
                    label={t("Order notes (optional)")}
                    textarea={{
                        name: "notes",
                        placeholder: t("Your message"),
                        value: form.values.notes,
                        rows: 5,
                        onChange: form.handleChange,
                        onBlur: form.handleBlur,
                        maxLength: 256,
                        error: form.touched.notes && form.errors.notes,
                    }}
                />
                <div className="text-center text-white text-lg font-semibold mt-3 mb-3">
                    Total amount due: <span className="text-red-500">
                    {/*{selectedCurrency.symbol}*/}
                    €
                    {isSuccess&&data.price}
                </span>
                </div>
                <Button type="submit" onClick={form.handleSubmit}  disabled={isLoadingProductsData} className="w-[fit-content] mx-auto">
                    {isLoadingProductsData ? t("Processing...") : t("Checkout")}
                </Button>
            </form>
        </PageWrapper>
    );
}
