import { useTranslation } from "@/services/i18n";

import { PageWrapper } from "@/components/page-wrapper";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "terms-and-conditions-page");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function TermsAndConditions({ params: { lng } }) {
  const { t } = await useTranslation(lng, "terms-and-conditions-page");

  return (
    <PageWrapper>
      <h1 className="text-subtitle">{t("title")}</h1>

      <p className="text-body mt-5">{t("text")}</p>

      <ul className="mt-10 flex flex-col gap-6">
        {t("list", { returnObjects: true })?.map(({ title, texts }) => {
          return (
            <li key={title} className="flex flex-col gap-8">
              <p className="text-body text-lg font-semibold">{title}</p>

              <ul className="flex flex-col gap-4">
                {texts?.map((t) => (
                  <li key={t} dangerouslySetInnerHTML={{ __html: t }} className="text-mini"/>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </PageWrapper>
  );
}
