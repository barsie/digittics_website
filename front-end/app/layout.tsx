import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection hide-scrollbar`}
      >
        {children}
      </body>
    </html>
  );
}
