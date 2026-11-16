"use client"

import React from 'react'
import { motion } from "framer-motion"
import { StrapiImage } from '../UI/StrapiImage';
import { PartnerSectionProps } from '@/types';

export default function PartnerSection({
  text,
  partners = [],
}: Readonly<PartnerSectionProps>) {

  if (!partners || partners.length === 0) return null;
  const loop = [...partners, ...partners];

  const headingText = text.includes("%count%") 
  ? text.replace("%count%", partners.length.toString())
  : `${text} +${partners.length}`;

  return (
    <section className="max-w-[1240px] w-auto mx-auto overflow-hidden py-10 px-4 my-0 md:my-12">
      
      <h3 className="text-center text-[#0f172a] font-semibold md:text-xl mb-8">
        {headingText}
      </h3>

      <div className="w-full overflow-hidden flex">
        <motion.div
          className="flex gap-8 pr-8 shrink-0" 
          animate={{ x: "-50%" }} 
          transition={{ 
            repeat: Infinity, 
            duration: partners.length * 5, 
            ease: "linear" 
          }}
        >
          {loop.map((partner, i) => {
            
            const partnerImage = partner.image;
            if (!partnerImage || !partnerImage.url) return null;

            return (
              <div 
                key={i} 
                className="flex items-center justify-center w-[150px] h-15 shrink-0 select-none"
              >
                <StrapiImage
                  src={partnerImage.url}
                  alt={partnerImage.alternativeText || "Partner logo"}
                  className="h-full w-[50%] object-contain grayscale hover:grayscale-0 transition-all duration-300 border-b-0 rounded-sm"
                  width={60} 
                  height={30}  
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}
