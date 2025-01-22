'use client'

import Link from "next/link";
import Image from "next/image";

import { BiCheckCircle } from "react-icons/bi";
import { PRICING_PLANS } from "@/data/data";
import { BsBoxArrowUpRight } from "react-icons/bs";


const PricingCard = () =>{


  return (
    <section className="">
      <div className="mx-auto w-auto mb-18 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0  items-center justify-center">
          {PRICING_PLANS.map((plan, index) => (
              <div key={index} className="mx-auto px-8 w-[19.2rem] h-[32rem] bg-slate-50 shadow-xl md:shadow-none rounded-md border-r-[1px] border-[#0174da]">
                  <div className="py-4 text-center">
                      <h2 className="text-[2em] font-bold text-[#0174da] py-2">{plan.name}</h2>
                      <h3 className="text-xl font-bold">{plan.currency} {plan.price}</h3>
                  </div>
                  <ul className="flex flex-col">
                      {plan.features.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 py-2">
                          <BiCheckCircle className="flex-none" size={20} color="#0174da"/>
                          <span className="grow">{item.item}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="">
                    <Link 
                      className="w-[90%] mx-auto relative top-2 left-0 right-0 flex items-center justify-center gap-1 btn_primary" 
                      href='https://wa.me/240555818481' target="_blank">
                      <span>{plan.button}</span>
                      <Image src={plan.img} alt="freepik WhatsApp Icon" width={20} height={20}/>
                    </Link>
                  </div>
              </div>
          ))}
      </div>
      <div className="my-6 px-8 text-center flex gap-2 items-center justify-center">
        <b>Nota:</b> Estos planes no contemplan <strong className="cursor-pointer text-[#0174da]">
          <Link className="flex items-center justify-center gap-1" href='https://www.guineaecuatorialpress.com/noticias/presentacion_oficial_de_la_nueva_ley_general_tributaria_de_guinea_ecuatorial#:~:text=Impuestos%20sobre%20Sueldos%20y%20Salarios,los%20cr%C3%A9ditos%20de%20este%20impuesto.' target="_blank">IVA <BsBoxArrowUpRight size={14}/></Link></strong> <i>que, según el Ley Nacional Tributaria es del 15%.</i>
      </div>
    </section>
  )
}

export default PricingCard