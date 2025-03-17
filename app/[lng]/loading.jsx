import { useTranslation } from "@/services/i18n";

export const Loading = async ({ lng }) => {
  const { t } = await useTranslation(lng);

  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-secondary-600 border-t-primary" />
      {t("general.loading_fallback_text")}
    </div>
  );
};

export default Loading;
