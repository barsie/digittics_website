'use client'
import Link from "next/link";
import { HeroSectionProps } from "@/types";
import { StrapiImage } from "../UI/StrapiImage";
import { DynamicIcon } from "../UI/IconComponent";

export function HeroSection({
  heading,
  description,
  cta,
  image,
  theme = "secondary",
  keywords,
  metrics,
}: Readonly<HeroSectionProps>) {
  const ctaItems = Array.isArray(cta) ? cta : cta ? [cta] : [];
  const metricItems = Array.isArray(metrics) ? metrics : [];

  const isPrimary = theme === "primary";
  const headingText = typeof heading === "string" ? heading.trim() : "";
  
  const safeKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : typeof keywords === "string"
      ? keywords
      : "";

  // Split heading into prefix and last characters dynamically
  const lastCount = Math.min(7, headingText.length);
  const prefix = headingText.slice(0, headingText.length - lastCount);
  const lastSeven = headingText.slice(-lastCount);

  return (
    <section
      className={
        isPrimary
          ? " mt-12 bg-[#040e25] mx-auto relative isolate overflow-hidden min-h-130 flex items-center"
          : " mt-16 bg-[#040e25] w-full mx-auto px-16 flex flex-col justify-between"
      }
    >
      {/* Primary Theme: Fullscreen Background Image */}
      {isPrimary && image?.url ? (
        <div>
          <div className="absolute inset-0 -z-10 w-full h-full">
            <StrapiImage
              src={image.url}
              alt={image.alternativeText || "Hero image"}
              className="w-full h-full object-cover"
              width={320}
              height={200}

            />
          </div>
          <div className="absolute inset-0 -z-10 bg-black/55" />
        </div>
      ) : null}

      <div
        className={
          isPrimary
            ? "max-w-[1240px] mx-auto relative z-10 grid md:grid-cols-2 gap-8 items-center text-center md:text-start md:px-0 py-20 text-white"
            : "grid md:grid-cols-2 gap-8 items-center max-w-310 m-auto"
        }
      >
        <div>
          <span className="text-[#2CCB73] text-sm md:text-[.9rem]">
            {safeKeywords || keywords}
          </span>

          <h1 className="w-[90%] text-white text-4xl md:text-[3.2rem] py-4">
            {prefix}
            {/* Restored the missing end slice of your heading text */}
            <span className="text-[#2CCB73]">{lastSeven}</span>
          </h1>

          <p
            className={
              isPrimary
                ? "w-[65%] text-lg pb-8 text-white/90"
                : "text-xl md:text-lg pb-8 text-white/90"
            }
          >
            {description}
          </p>

          {/* CTA Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 mb-8">
            {ctaItems.map((item, index) => {
              const getCtaClasses = (itm: any, idx: number) => {
                if (itm?.variant === "secondary" || idx === 1) {
                  return "btn-secondary";
                }
                return "btn-primary";
              };

              return (
                <Link
                  key={item.id ?? index}
                  href={item.href || ""}
                  target={item.isExternal ? "_blank" : "_self"}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className={`flex items-center justify-center gap-2 ${getCtaClasses(item, index)} text-center ${item.className || ""}`}
                  style={item.style}
                >
                  <DynamicIcon size={24} iconName="FaArrowRight"/>
                  {item.text}
                </Link>
              );
            })}
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metricItems.map((metric, index) => (
              <div
                key={metric.id ?? metric.logoText ?? index}
                className="flex items-center gap-2"
              >
                {metric.image?.url ? (
                  <StrapiImage
                    src={metric.image.url}
                    alt={
                      metric.image.alternativeText ||
                      metric.logoText ||
                      "Metric logo"
                    }
                    className="w-8 h-8 object-contain"
                    width={32}
                    height={32}
                  />
                ) : null}
                <span className="text-sm text-white/90">{metric.logoText}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Theme: Side Image with Fixed Sizing */}
        {!isPrimary && image?.url ? (
          <div className="w-full h-auto aspect-3/2 relative rounded-2xl overflow-hidden">
            <StrapiImage
              src={image.url}
              alt={image.alternativeText || "No alternative text provided"}
              className="w-full h-auto object-cover"
              width={300}
              height={200}
            />
          </div>
        ) : null}

        {/* Fallback Image Missing Box */}
        {!isPrimary && !image?.url ? (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-12 border-2 border-dashed border-slate-700 rounded-2xl">
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