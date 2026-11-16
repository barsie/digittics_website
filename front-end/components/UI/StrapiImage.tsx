"use client";

import Image from "next/image";
import { createContext, useContext } from "react";

const StrapiMediaContext = createContext<string | null>(null);

export function StrapiMediaProvider({ baseURL, children }: { baseURL: string; children: React.ReactNode }) {
    return <StrapiMediaContext.Provider value={baseURL}>{children}</StrapiMediaContext.Provider>;
}

interface StrapiImageProps {
    src: string;
    alt: string;
    // width: number;
    // height: number;
    className?: string;
    [key: string]: string | number | boolean | undefined;
}

export function StrapiImage({
    src,
    alt,
    className,
    ...rest
}: Readonly<StrapiImageProps>){
    const baseURL = useContext(StrapiMediaContext);
    const imageUrl = getStrapiMedia(src, baseURL);
    if(!imageUrl) return null

    return <Image src={imageUrl} alt={alt} className={className} {...rest}></Image>
}

export function getStrapiMedia( url: string | null, baseURL: string | null) {
    if(url === null ) return null

    if(url.startsWith("data:")) return url

    if(url.startsWith("http") || url.startsWith("//")) return url

    if (!baseURL) throw new Error("Strapi media configuration is missing.");
    return `${baseURL}/${url.replace(/^\/+/, "")}`;
}