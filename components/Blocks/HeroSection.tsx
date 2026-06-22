import Link from "next/link";
import { StrapiImage } from "../UI/StrapiImage";
import type { HeroSectionProps } from "@/types";

export function HeroSection({
    heading,
    description,
    cta,
    image,

}: Readonly<HeroSectionProps>){
    const ctaData = Array.isArray(cta) ? cta[0] : cta;

    return (
      <section className="w-full mx-auto px-4 flex flex-col justify-between md:my-0 md:px-0">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-[1240px] m-auto">
          <div className="">
            <h1 className="text-black text-4xl md:text-7xl">{heading}</h1>
            <p className="text:xl md:text-2xl pb-8">{description}</p>
            {ctaData && (
              <Link
                href={ctaData.href || ""}
                target={ctaData.isExternal ? "_blank" : "_self"}
                className={`btn_primary`}
              >
                {ctaData.text}
              </Link>
            )}
          </div>
          {image?.url ? (
            <StrapiImage
              src={image.url}
              alt={image.alternativeText || "No alternative text provided"}
              className="w-full h-full object-cover rounded-2xl"
              width={300}
              height={200}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
              <svg
                className="w-8 h-8 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs font-medium">Imagen no disponible</span>
            </div>
          )}
        </div>
      </section>
    );
}