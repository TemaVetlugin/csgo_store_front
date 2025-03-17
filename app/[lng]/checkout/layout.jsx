import { Suspense } from "react";
import { useTranslation } from "@/services/i18n";
import Loading from "../loading";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "checkout-page");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function CheckoutLayout({ children, params: { lng } }) {
  return <Suspense fallback={<Loading lng={lng} />}>{children}</Suspense>;
}
