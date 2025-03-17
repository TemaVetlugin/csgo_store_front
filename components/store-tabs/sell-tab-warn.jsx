"use client";

import { useTranslation } from "@/services/i18n/client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Icon } from "../icon";
import { getPaymentMethodsData } from "@/lib/utils/data";
import { cn } from "@/lib/utils";
export const SellTabWarn = ({ lng, productsData = [] }) => {
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
        <div className="mt-6 justify-center flex">
            <div className="row-span-1 rounded-xl bg-secondary-200 p-4 md:w-2/3">
                <h2 className="text-paragraph text-center mt-3 mb-6 text-2xl">{t("sell_warn.title")}</h2>
                {t("sell_warn.texts", { returnObjects: true })?.map(({ title, description },index) => {
                    return (
                        <li key={index} className="flex flex-col gap-6">
                            {title.length > 0 && (<p className="text-body text-lg font-semibold mt-10" dangerouslySetInnerHTML={{ __html: title }} />)}
                            <p className="text-body " dangerouslySetInnerHTML={{ __html: description }} />
                        </li>
                    );
                })}
            </div>
        </div>
    );
};
