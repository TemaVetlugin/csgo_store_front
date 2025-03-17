import { useTranslation } from "@/services/i18n";

import { PageWrapper } from "@/components/page-wrapper";

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "terms-of-payment");

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export default async function TermsOfPayment({ params: { lng } }) {
    const { t } = await useTranslation(lng, "terms-of-payment");
    const paymentText = t("text").split('\n').map((line, index) => (
      <p key={index} className="text-body mt-5">
        {line}
      </p>
    ));
  
    return (
      <PageWrapper>
        <h1 className="text-subtitle">{t("title")}</h1>
        {paymentText}
        <ul className="mt-10 flex flex-col gap-6">
          {t("list", { returnObjects: true })?.map(({ title, texts, bullets }, listIndex) => (
            <li key={`${title}-${listIndex}`} className="flex flex-col gap-2">
              <p className="text-body text-lg font-semibold">{title}</p>
              <ul className="flex flex-col gap-4">
                {texts?.map((text, textIndex) => (
                  <li key={`${text}-${textIndex}`} className="text-mini">
                    {text}
                  </li>
                ))}
              </ul>
              {bullets && (
                <ul className="list-disc ml-4">
                  {bullets.map((bullet, bulletIndex) => (
                    <li key={`${bullet}-${bulletIndex}`} className="text-mini mb-2">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </PageWrapper>
    );
  }
  
