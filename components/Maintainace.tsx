import logo from "../public/logo-color.png"

import React from 'react'
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";

export default function Maintainace() {
  return (
    <section className="mx-auto w-auto">
        <div className="flex flex-col items-center justify-items align-middle text-center min-h-screen"></div>
        <Image src={logo} alt="logo" width={360} height={140} className="rounded-full mt-8"/>
        <h2 className="text-5xl md:text-8xl font-bold text-center">Sitio Web en construcción</h2>
        <Link href='/services' className="py-8">
          <Button 
            type='button'
            title="Ver Servicios"
          />
        </Link>
  </section>
  )
}
