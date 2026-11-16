import React from "react";
import { ServiceSectionProps } from "@/types";
import { DynamicIcon } from "../UI/IconComponent";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


const colorMap = {
  primary: "#2ccb73",  
  secondary: "#4b5563",
};

export default function ServiceSection({
  heading,
  feature: feature = [],
}: Readonly<ServiceSectionProps>) {
  
  if (!feature || feature.length === 0) return null;

  return (
    <section className="max-w-[1240px] w-full mx-auto px-4 md:px-0 my-32">

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 items-stretch">
        {feature.map((feature) => {
          const hexColor = colorMap[feature.iconColor] || colorMap.primary;

          return (
            <div 
              key={feature.id} 
              className="flex flex-col items-start p-6 rounded-xl shadow-sm border transition-shadow"
            >
              <div className="p-3 rounded-lg mb-2 flex items-center justify-center">
                <DynamicIcon 
                  iconName={feature.iconName} 
                  size={feature.iconSize} 
                  color={hexColor} 
                />
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                {feature.text}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                {feature.description}
              </p>

              <div className="mt-auto flex items-center gap-2 text-[#2ccb73] text-sm">
                <Link 
                  className=""  
                  href={feature.link?.href ?? "#"}>
                    {feature.link?.text ?? "Saber Más"}
                </Link>
                <FaArrowRight />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}