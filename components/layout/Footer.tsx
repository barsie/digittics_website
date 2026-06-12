"use client";
import React from "react";
import Link from "next/link";
import { StrapiImage } from "../StrapiImage";
import { LogoProps, LinkProps } from "@/types";

interface FooterProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    policies: LinkProps[];
    copyright: string;
  };
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null;
  const { logo, navigation, policies, copyright } = data;

  return (
    <footer className="w-full bg-black text-gray-300 px-4 py-8 md:px-10 lg:px-16 border-t border-zinc-900">
      {/* Sección Superior: Marca y Navegación Principal */}
      <div className="flex flex-col gap-6 pb-6 border-b border-zinc-900 md:flex-row md:items-center md:justify-between md:py-4">
        
        {/* Bloque del Logotipo e Identidad */}
        <div className="flex items-center gap-3">
          {logo.image?.url && (
            <StrapiImage
              src={logo.image.url}
              alt={logo.image.alternativeText || "Logo corporativo"}
              className="object-contain block shrink-0" // 💡 CORREGIDO: Cambiado de hidden a block
              width={40}
              height={40}
            />
          )}

          {logo.logoText && (
            <div className="flex flex-col justify-center">
              <span className="text-white font-extrabold text-xl leading-tight">
                {logo.logoText}
              </span>
              {logo.logoDescription && (
                <span className="text-[11px] text-gray-500 mt-0.5 block"> 
                  {logo.logoDescription}
                </span>
              )}
            </div>
          )}
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium md:gap-8">
          {navigation.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                className="hover:text-white transition-colors duration-200"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col-reverse gap-4 pt-6 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
        
        <p className="text-center sm:text-left">
          &copy; {new Date().getFullYear()} {copyright}
        </p>

        <ul className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 sm:justify-end">
          {policies.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                className="hover:text-white transition-colors duration-200"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}