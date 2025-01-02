//Contain a banner with offers,
'use client'

import Image from 'next/image';
import React from 'react'

import { TypeAnimation } from 'react-type-animation';


type HeroType = {
    text?: string,
    startTitle?: string,
    endTitle?: string,
    subtitle?: string,
    icon?: any,
    variant?: 'hero_primary' | 'hero_secundary'
}


export default function Hero({startTitle, endTitle, icon}:HeroType) {
  return (
    <section className={`hero_primary`}>
        {icon && <Image src={icon} alt='image'/>}
        <h2 className='text-[2.6em] md:text-[3.8em] text-center font-bold'>
          <span>{startTitle}   </span>

          <TypeAnimation 
            sequence={[ 
              'hogar', 1000,
              'negocio', 1000

            ]}
            speed={1}
            omitDeletionAnimation
            preRenderFirstString
            wrapper='span'
            repeat={Infinity}
            className='text-[#0174da]'
          />

          <span>{endTitle}</span>
        </h2>
    </section>
  )
}
