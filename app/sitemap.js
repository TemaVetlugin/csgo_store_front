import { BASE_URL } from "@/lib/constants/config";
import { languages } from "@/services/i18n/settings";

export default function sitemap() {
  const routes = languages.map((lang) => {
    return [
      "",
      "/store",
      "/about",
      "/faq",
      "/contact",
      "/cart",
      "/checkout",
      "/profile",
      "/privacy-policy",
      "/terms-and-conditions",
    ].map((route) => ({
      url: `${BASE_URL}/${lang}${route}`,
      lastModified: new Date().toISOString(),
    }));
  });

  return [...routes.flat()];
}
