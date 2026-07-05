import Link from "next/link";
import { StrapiImage } from "../UI/StrapiImage";
import type { HeroSectionProps } from "@/types";

export function HeroSection({
  heading,
  description,
  cta,
  image,
  theme = "secondary",
}: Readonly<HeroSectionProps>) {
  const ctaData = Array.isArray(cta) ? cta[0] : cta;
  const isPrimary = theme === "primary";

  return (
    <section
      className={
        isPrimary
          ? "mt-20 relative isolate overflow-hidden min-h-[520px] flex items-center"
          : "mt-32 mb-12 w-full mx-auto px-4 flex flex-col justify-between md:px-0"
      }
    >
      {isPrimary && image?.url ? (
        <div>
          <div className="absolute inset-0 -z-10 w-full h-full">
            <StrapiImage
              src={image.url}
              alt={image.alternativeText || "Hero image"}
              className="w-full h-full object-cover"
              width={1600}
              height={900}
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-black/55" />
        </div>
      ) : null}

      <div
        className={
          isPrimary
            ? "relative z-10 grid md:grid-cols-2 gap-8 items-center text-center px-8 md:text-start md:px-0 max-w-[1240px] m-auto py-20 text-white"
            : "grid md:grid-cols-2 gap-8 items-center max-w-[1240px] m-auto"
        }
      >
        <div>
          <h1
            className={
              isPrimary
                ? "text-white text-4xl md:text-7xl"
                : "text-black text-4xl md:text-7xl"
            }
          >
            {heading}
          </h1>

          <p
            className={
              isPrimary
                ? "text-lg md:text-2xl pb-8 text-white/90"
                : "text-xl md:text-2xl pb-8"
            }
          >
            {description}
          </p>

          {ctaData && (
            <Link
              href={ctaData.href || ""}
              target={ctaData.isExternal ? "_blank" : "_self"}
              className="btn_primary"
            >
              {ctaData.text}
            </Link>
          )}
        </div>

        {!isPrimary && image?.url ? (
          <StrapiImage
            src={image.url}
            alt={image.alternativeText || "No alternative text provided"}
            className="w-full h-full object-cover rounded-2xl"
            width={300}
            height={200}
          />
        ) : null}

        {!isPrimary && !image?.url ? (
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium">Imagen no disponible</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
