
import React from 'react'
type PricingHeaderProps = {
  title: string,
  promo?: string,
  span?: string
}
const PricingHeader = ({title, promo, span}: PricingHeaderProps) => {

  return (
    <section>
    <div className="py-8">
      <span className="flex items-center justify-center text-[#0174da] font-semibold md:text-[1.4em]">{span}</span>
      <p className="text-center md:text-[3.2em] font-bold">{promo}</p>
      <h1 className="text-center md:text-[4em] font-bold">{title}</h1>
    </div>
    </section>
  )
}

export default PricingHeader