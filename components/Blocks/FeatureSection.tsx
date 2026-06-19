import React from "react";
import { FeatureSectionProps } from "@/types";
import { DynamicIcon } from "../UI/IconComponent";


const colorMap = {
  primary: "#2aa638",  
  secondary: "#4b5563",
};

export default function FeatureSection({
  heading,
  feature: feature = [],
}: Readonly<FeatureSectionProps>) {
  
  if (!feature || feature.length === 0) return null;

  return (
    <section className="w-full mx-auto px-4 my-12">

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {feature.map((feature) => {
          const hexColor = colorMap[feature.iconColor] || colorMap.primary;

          return (
            <div 
              key={feature.id} 
              className="flex flex-col items-start p-6 rounded-xl shadow-sm border transition-shadow"
            >
              <div className="p-3 rounded-lg mb-4 flex items-center justify-center">
                <DynamicIcon 
                  iconName={feature.iconName} 
                  size={feature.iconSize} 
                  color={hexColor} 
                />
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {feature.text}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}