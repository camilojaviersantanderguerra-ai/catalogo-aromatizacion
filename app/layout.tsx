import type { Metadata, Viewport } from "next";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/500.css";
import "./globals.css";
import { siteConfig } from "@/config/site";

const siteUrl =
  siteConfig.url ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.brandName,
    images: [{ url: siteConfig.seo.ogImage, width: 403, height: 403, alt: "Difusores de varillas" }],
  },
  twitter: { card: "summary", title: siteConfig.seo.title, description: siteConfig.seo.description },
};

export const viewport: Viewport = {
  themeColor: "#fbfbf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CL" className="antialiased">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
