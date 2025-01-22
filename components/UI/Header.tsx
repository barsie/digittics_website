'use client'

import Link from 'next/link'
import Logo from '../Logo'

import { NAV_LINKS } from '@/data/data'
import clsx from 'clsx'

import { usePathname } from 'next/navigation'
// import { useState } from 'react'
import Button from '../Button'


export default function Header() {

  const pathname = usePathname();
  
  // const [nav, setNav] = useState(false)

  // const handleClick = () => setNav(!nav)


  return (
    <header className='w-screen h-[90px] px-4 md:px-10 z-10 bg-[#fff] fixed top-0 shadow-[#0174da] drop-shadow-xl'>
      <nav className="px-2 flex justify-between items-center w-full h-full">
        
        <Link href='/'> <Logo title={'SitaFrio'}/> </Link>
        
        <ul className='hidden h-full md:flex gap-12'>
          {NAV_LINKS.map((link) => (
            <Link href={link.url} key={link.key}
              className={clsx(
                "text-[1.1em] text-black flex items-center justify-center cursor-pointer pb-1.5 transition-all hover:text-[#0174da]",
                {
                  'underline underline-offset-8 decoration-[#0174da] decoration-4' : pathname == link.url
                }
              )}
            >
              {link.label}
            </Link>
          ))}

        </ul>

        <Link href='https://wa.me/240555818481' target='_blank'><Button title='Contactar Ventas' type='button'/></Link>
      </nav>

    </header>
  )
}
