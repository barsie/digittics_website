'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaBars, FaXmark } from 'react-icons/fa6'
import Link from 'next/link'
import clsx from 'clsx'

import { StrapiImage } from '../UI/StrapiImage'
import { LinkProps, LogoProps } from '@/types'


interface HeaderProps {
  data: {
    logo: LogoProps;
    navigation: LinkProps[];
    cta: LinkProps;
  }
}

export default function Header({data}: HeaderProps) {

    const pathname = usePathname();

    const [nav, setNav] = useState(false)
    const handleclick = () => setNav(!nav)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      setNav(false);
    },[pathname])

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

    if(!data) return null;

    const {logo, navigation, cta} = data;

    const isNavActive = (href?: string) => {
      if (!href || href.startsWith("http")) return false;

      return pathname === href || pathname.startsWith(`${href}/`);
    };

  return (
    <header className="w-full mx-auto h-22.5 py-5 md:px-10 z-50 bg-[#040e25] text-white fixed top-0">
      <nav className="px-2 flex justify-between items-center md:gap-20 w-full h-full">
        <div className="flex items-center justify-center">
          <div ref={menuRef} className="relative md:hidden">
            <div onClick={handleclick} className="cursor-pointer">
              {!nav ? (
                <FaBars className="w-9" size={16} />
              ) : (
                <FaXmark className="w-9" size={16} />
              )}
            </div>

            <ul
              className={
                !nav
                  ? 'hidden'
                  : 'absolute left-0 top-full mt-6 bg-white drop-shadow-2xl w-screen h-screen z-50'
              }
            >
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    target={item.isExternal ? '_blank' : '_self'}
                    onClick={() => setNav(false)}
                    className={clsx(
                      'text-sm py-6 text-black flex px-8 cursor-pointer pb-1.5',
                      {
                        'font-semibold text-[#22B864]': isNavActive(item.href),
                      },
                    )}
                  >
                    <h5 className=''>{item.text}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" className="flex flex-row items-center gap-2">
            {logo.image?.url ? (
              <StrapiImage
                src={logo.image.url}
                alt={logo.image.alternativeText || 'No alternative text provided'}
                className="hidden md:block"
                width={40}
                height={40}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                <svg
                  className="w-8 h-8 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs font-medium">No logo Image</span>
              </div>
            )}

            {logo.logoText && (
              <div className="flex flex-col uppercase">
                <span className="text-[1rem] font-semibold">{logo.logoText}</span>
                <span className="text-[8px] md:text-[12px] md:-mt-2 font-light text-slate-200">
                  {logo.logoDescription}
                </span>
              </div>
            )}
          </Link>
        </div>

        <ul className="hidden h-full md:flex justify-between items-center gap-12">
          {navigation.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                target={item.isExternal ? '_blank' : '_self'}
                onClick={() => setNav(false)}
                className={clsx(
                  'flex items-center justify-center cursor-pointer pb-1.5',
                  {
                    'font-semibold underline underline-offset-8 decoration-[#22B864]': isNavActive(item.href),
                  },
                )}
              >
                <h5>{item.text}</h5>
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:flex">
          <Link
            href={cta.href}
            target={cta.isExternal ? '_blank' : '_self'}
            className="bg-[#2CCB73] px-3 py-2 rounded-full font-semibold text-[#F7F9FC]"
          >
            {cta.text}
          </Link>
        </div>
      </nav>
    </header>
  );
}
