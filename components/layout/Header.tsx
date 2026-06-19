'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { StrapiImage } from '../UI/StrapiImage'
import { LogoProps , LinkProps} from '@/types'
import { FaBars, FaXmark } from 'react-icons/fa6'
import clsx from 'clsx'



interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    cta: LinkProps;
  }
}


export default function Header({data}: HeaderProps) {

    const pathname = usePathname();
    const navLinkLight = pathname === "/solutions"

    const [nav, setNav] = useState(false)
    const handleclick = () => setNav(!nav)

    if(!data) return null;

    const {logo, navigation, cta} = data;

  return (
    <header className="w-full mx-auto h-[90px] md:px-10 z-10 bg-white fixed top-0 ">
      <nav className="px-2 flex justify-between items-center md:gap-20 w-full h-full">
        <Link href="/" className="flex flex-row items-center gap-2">
          <StrapiImage
            src={logo.image.url}
            alt={logo.image.alternativeText || "No alternative text provided"}
            className=""
            width={40}
            height={40}
          />

            {logo.logoText && (
              <div className="flex flex-col">
               <span className='bold-32 '>{logo.logoText}</span>
                <span className='text-[11px] text-gray-600 -mt-2'>{logo.logoDescription}</span>
              </div>
            )}

        </Link>

        <ul className="hidden h-full md:flex justify-between items-center gap-12">
          {navigation.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                target={item.isExternal ? "_blank" : "_self"}
                className={clsx(
                  "regular-16 flex items-center justify-center cursor-pointer pb-1.5",
                  {
                    "font-semibold color-primary ": pathname === item.href,
                  },
                )}
              >
                <h5>{item.text}</h5>
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:flex hidden">
          <Link
            href={cta.href}
            target={cta.isExternal ? "_blank" : "_self"}
            className="btn_primary"
          >
            {cta.text}
          </Link>
        </div>

        <div className="md:hidden mr-5" onClick={handleclick}>
          {!nav ? <FaBars className="w-9" /> : <FaXmark className="w-9" />}
        </div>
      </nav>

      <ul
        className={!nav ? "hidden" : "absolute bg-white drop-shadow-2xl w-full"}
      >
        {navigation.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              target={item.isExternal ? "_blank" : "_self"}
              className={clsx(
                "py-6 text-black flex px-8 cursor-pointer pb-1.5",
                {
                  " font-bold color-primary": pathname === item.href,
                },
              )}
            >
              <h5>{item.text}</h5>
            </Link>
          </li>
        ))}
        <Link
          href={cta.href}
          target={cta.isExternal ? "_blank" : "_self"}
          className="block text-center btn_primary mt-8 mb-4 mx-4"
        >
          {cta.text}
        </Link>
      </ul>
    </header>
  );
}
