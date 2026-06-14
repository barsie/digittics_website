import Link from "next/link";
import { StrapiImage } from "../StrapiImage";
import type { HeroSectionProps } from "@/types";

export function HeroSection({
    theme,
    heading,
    description,
    cta,
    image,
    logo,

}: Readonly<HeroSectionProps>){
    const ctaData = Array.isArray(cta) ? cta[0] : cta;

    return (
        <section className="w-full mx-auto px-4 flex flex-col justify-between md:my-0 md:px-0">
            <div className='grid md:grid-cols-2 gap-8 items-center max-w-[1240px] m-auto'>
                <div className="">
                    <h1 className="text-black text-4xl md:text-7xl">{heading}</h1>
                    <p className="text:xl md:text-2xl pb-8">{description}</p>
                    {
                        ctaData &&(
                            <Link 
                                href={ctaData.href || ""} 
                                target={ctaData.isExternal ? "_blank" : "_self"}
                                className={`btn_primary`}
                            >
                                {ctaData.text}
                            </Link>
                        )
                    
                    }
                </div>

                <StrapiImage
                    src={image.url}
                    alt={image.alternativeText || "No alternative text provided"}
                    className = "w-0 mx-auto rounded-full px-4 md:w-[90%] md:px-0"
                    width = {640}
                    height = {480}
                />

            </div>

        </section>
    )
}