//Contain a banner with offers,
'use client'

import Image from 'next/image';
import React from 'react'



type HeroType = {
  text?: string,
  startTitle: string,
  endTitle: string,
  subtitle?: string,
  icon?: any,
  variant?: 'hero_primary' | 'hero_secundary'
}


export default function Hero({startTitle, endTitle, icon}:HeroType) {
  return (
    <section className={`hero_primary px-8`}>
        {icon && <Image src={icon} alt='image'/>}
        <h2 className='text-[2.6em] md:text-[3.6em] text-center font-bold'>
          <span className='text-[3rem]'>{startTitle}</span>
          <span className='text-[#0174da]'> hogar y negocios </span>
          <span>{endTitle}</span>
        </h2>
    </section>
  )
}
