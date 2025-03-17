import { dir } from "i18next";
import { Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { useTranslation } from "@/services/i18n";
import { languages } from "@/services/i18n/settings";
import { ReduxProvider } from "@/redux/provider";

import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { RegistrationDialog } from "@/components/dialogs/registration-dialog";

import { BASE_URL, GTM_ID } from "@/lib/constants/config";

import "@/styles/globals.css";
import { Meta } from "next/dist/lib/metadata/generate/meta";

const montserrat = Montserrat({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng: "en" }));
}

export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng, "home-page");

  return {
    metadataBase: new URL(BASE_URL),
    title: t("metadata.title"),
    description: t("metadata.description"),
    author: 'CS:GO Store Team',
    keywords: 'CS:GO, CS:GO Store, CS:GO Skins, CS:GO Items, Buy CS:GO, Gaming, Online Store',
    alternates: { canonical: "/en", languages: { en: "/en" } },
  };
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
    </Script>
    <Script id="jsonLd" type="application/ld+json">
      {`
        {
  "@context": "http://www.schema.org",
  "@type": "Organization",
  "name": "CS:GO Store",
  "alternateName": ["csgostore", "csgostore.co.uk"],
  "legalName": "CS:GO Store",
  "description": "Discover a wide selection of CS:GO skins and items. Explore our user-friendly platform to easily buy  CS:GO assets. Join the CS:GO Store community today!",
  "logo": "https://csgostore.co.uk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheader-img.ecdd7d3a.webp&w=828&q=75",
  "url": "https://csgostore.co.uk/",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "email": "info@csgostore.co.uk",
      "contactType": "customer service"
    }
  ],

  "foundingDate": "2023"
}
        `}
    </Script>

    <body className={montserrat.className}>
    <ReduxProvider value={cookies().getAll()}>
      <div
        className="relative flex min-h-screen flex-col bg-auto bg-no-repeat md:bg-contain"
        style={{
          backgroundImage: "url('/assets/header-shadow-bg.webp')",
        }}
      >
        <Header lng={lng} />
        <main className="flex-1">{children}</main>
        <Footer lng={lng} />
        <Toaster />
        <RegistrationDialog lng={lng} />
      </div>
    </ReduxProvider>

    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
      }}
    />
    <script
      async
      src="https://unpkg.com/@paycore/merchant-widget-js@0.3.0/dist/merchantWidget.umd.js"
    />
    </body>
    </html>
  );
}
