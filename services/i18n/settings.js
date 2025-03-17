export const fallbackLng = "en";
export const languages = ["en"];
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
    ns,
    // defaultLocale: fallbackLng,
    // localeDetection: false,
  };
}
