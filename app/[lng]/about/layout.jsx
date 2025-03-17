import { useTranslation } from "@/services/i18n";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "about-page");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function RulesLayout({ children }) {
  return children;
}
