import { ReactNode } from "react";

import { PRICING_PLANS } from "@/data/data";

import React from 'react'
import { BiCheckCircle } from "react-icons/bi";

const Test = () => {
  return (
    <div className="mx-auto w-auto mb-18 grid grid-cols-1 md:grid-cols-4 gap-12 items-center justify-center">
        {PRICING_PLANS.map((plan, index) => (
            <div key={index} className="mx-auto relative px-8 w-[18rem] h-[32rem] bg-slate-50 shadow-2xl rounded-md border-[1px] border-[#0174da]">
                <div className="py-4 text-center">
                    <h2 className="text-[2em] font-bold text-[#0174da] py-2">{plan.name}</h2>
                    <h3 className="text-xl font-bold">{plan.currency} {plan.price}</h3>
                </div>
                <ul className="flex flex-col">
                    {plan.features.map((item) => (
                        <li className="flex items-center gap-2 py-2"><BiCheckCircle className="" size={20} color="#0174da"/>{item.item}</li>
                    ))}
                </ul>
            </div>
        ))}
       
    </div>
  )
}

export default Test