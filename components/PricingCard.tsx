'use client'

import Link from "next/link";
import Image from "next/image";

import { BiCheckCircle } from "react-icons/bi";
import { PRICING_PLANS } from "@/data/data";



const PricingCard = () =>{


  return (
    <section className="">
      <div className="mx-auto w-auto mb-18 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0  items-center justify-center">
          {PRICING_PLANS.map((plan, index) => (
              <div key={index} className="mx-auto w-[19.2rem] h-[36rem] bg-slate-50 shadow-xl md:shadow-none rounded-md border-r-[1px] border-[#0174da]">
                <div className="mx-auto w-full bg-slate-400 rounded-l-md rounded-r-md rounded-br-none rounded-bl-none text-[0.8em] text-center py-1">{plan.promo}</div>
                  <div className="py-4 text-center">
                    <div className="py-2">
                      <h2 className="text-[2em] font-bold text-[#0174da]">{plan.name}</h2>
                      {/* <i className="">{plan.for}</i> */}
                    </div>
                      <h3 className="text-xl font-bold">{plan.currency} {plan.price}</h3>
                      <p className=""> {plan.calendar}</p>
                  </div>
                  <ul className="flex flex-col px-8">
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
    </section>
  )
}

export default PricingCard