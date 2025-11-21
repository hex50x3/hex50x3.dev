import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppWrapper from "@/components/layout/AppWrapper";
import { siteConfig } from "@/config/site";
import Script from "next/script";
import "@/styles/globals.css";

export const metadata = {
  title: `${siteConfig.name} - Software Engineer`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.publisher,

  openGraph: {
    title: `${siteConfig.name} - Software Engineer`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: "website",
  },

  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem("theme") || "dark";
                document.documentElement.classList.add(saved);
              } catch {
                document.documentElement.classList.add("dark");
              }
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              logo: siteConfig.logo,
              sameAs: siteConfig.sameAs,
            }),
          }}
        />
      </head>

      <body className="flex flex-col min-h-screen">
        <AppWrapper>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppWrapper>
      </body>
    </html>
  );
}
