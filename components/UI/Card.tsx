import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { formatDate } from "@/utils/format-date";
import { CardProps } from "@/types";

export function Card({
    title,
    description,
    slug,
    image,
    price,
    createdAt,
    startDate,
    basePath,
}: Readonly<CardProps>){
    return (
        <Link 
            className="flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden w-full h-[360px] sm:h-[420px]" 
            href={`/${basePath}/${slug}`}
        >
            <div className="relative w-full h-48 sm:h-56 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                <StrapiImage
                  src={image.url}
                  alt={image.alternativeText || "Article promotional graphic"}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  width={400} 
                  height={250}
                />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
                <div className="w-full px-5 py-5">
                    <h5 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug mb-2">
                        {title}
                    </h5>
                    
                    <div className="flex flex-col gap-1 text-sm text-slate-600 mb-3">
                        {price && (
                            <p className="font-semibold text-emerald-700">
                                <span>Price: </span>CFAS {price}
                            </p>
                        )}
                        {(startDate ?? createdAt) && (
                            <p className="text-xs text-slate-400 font-medium">
                                {formatDate(startDate ?? createdAt)}
                            </p>
                        )}
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 md:line-clamp-4">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    )
}