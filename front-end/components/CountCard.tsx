import React from 'react'

type CountCardProps = {
    title: string
    total: number
}

const CountCard = ( {title, total}: CountCardProps) => {
  return (
    <div className='w-full mx-auto shadow rounded-lg px-8 flex flex-col items-center justify-center'>
        <p className='font-semibold text-[1.2em] text-center'>{title}</p>
        <span className='font-bold text-[2.5em] text-center text-[#0174da]'>{total}</span>
    </div>
  )
}

export default CountCard