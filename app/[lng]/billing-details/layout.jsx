import { useTranslation } from "@/services/i18n";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "contact-page");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function ContactLayout({ children }) {
  return children;
}
