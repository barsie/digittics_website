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
  title: "GREENLIVES",
  description: "Investigación Tecnológica Sostenible",
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
