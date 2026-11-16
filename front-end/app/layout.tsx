import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Header from "@/components/layout/Header";
import { getGlobalSettings } from "@/data/loaders";
import Footer from "@/components/layout/Footer";
import LivePreview from "@/components/Preview";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Digittics | Tus socio Digital",
    template: "%s | GREENLIVES"
  },
  description: "Digittic: Visibilidad digital con resultados medibles.",
  keywords: [
    "Digittics",
    "Comunicacion digital",
    "Marketing",
    "Formación en comunicacion y marketing",
    "Malabo",
    "Guinea Ecuatorial",
    "Edicion de Video",
    "Sitios web",
    "Newsletters",
    "Tecnologia de communicacion",
    "merchandising",
    "tienda electrónica malabo",
    "tienda electrónica Guinea Ecuaotrial",
  ],
  authors: [{ name: "Digittics", url: "https://www.digittics.com" }],
  metadataBase: new URL('https://www.digittics.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-Es': 'es-Es',
      'en-En': 'en-En'
    }
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.digittics.com",
    siteName: "Digittics",
    title: "Digittics | Tus socio Digital",
    description: "Marketing | Comunicacion | Ventas — Mundo digital Hecho Facil.",
    images: [
      {
        url: "https://www.digittics.com/assets/og-digittics.png",
        width: 1200,
        height: 630,
        alt: "Digittics - Tu Socio Digital",
      },
    ],
  },
    twitter: {
    card: "summary_large_image",
    site: "@digittics",
    title: "Digittics | Tus socio Digital",
    description:
      "Marketing | Comunicacion | Ventas — Mundo digital Hecho Facil.",
    images: ["/assets/og-digittics.png"]
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
};

async function loader(){
  const {data} = await getGlobalSettings();
  if (!data) throw new Error("Failed to fetch global settings");
  return { header: data?.header, footer: data?.footer }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { header, footer } = await loader()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection hide-scrollbar`}
      >
        <Header data={header}/>
        {children}
        <LivePreview/>
        <Footer data={footer}/>
      </body>
    </html>
  );
}
