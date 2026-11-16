import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LivePreview from "@/components/Preview";
import { StrapiMediaProvider } from "@/components/UI/StrapiImage";
import { getGlobalSettings } from "@/data/loaders";
import { getStrapiURL } from "@/utils/get-strapi-url";

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data } = await getGlobalSettings();
  if (!data) throw new Error("Failed to fetch global settings");

  return (
    <StrapiMediaProvider baseURL={getStrapiURL()}>
      <Header data={data.header} />
      {children}
      <LivePreview />
      <Footer data={data.footer} />
    </StrapiMediaProvider>
  );
}
