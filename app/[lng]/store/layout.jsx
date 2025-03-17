import { Suspense } from "react";
import { useTranslation } from "@/services/i18n";
import Loading from "../loading";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "store-page");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function StoreLayout({ children, params: { lng } }) {
  return <Suspense fallback={<Loading lng={lng} />}>{children}</Suspense>;
}
