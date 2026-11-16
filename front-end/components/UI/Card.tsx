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
            className="flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow rounded-xl overflow-hidden w-full h-[380px] sm:h-[420px]" 
            href={`/${basePath}/${slug}`}
        >
            <div className="relative w-full h-48 sm:h-56 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                { image?.url ? (
                    <StrapiImage
                      src={image.url}
                      alt={image.alternativeText || "Article promotional graphic"}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      width={400} 
                      height={250}
                    />

                ): (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                    <svg className="w-8 h-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-medium">No image Available</span>
                </div>
                )}
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