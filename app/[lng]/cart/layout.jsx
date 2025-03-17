import { useTranslation } from "@/services/i18n";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "cart-page");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function CartLayout({ children, params: { lng } }) {
  return children;
}
