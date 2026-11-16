import Link from 'next/link'
import {FaHouse} from 'react-icons/fa6'

export default function NotFound() {
  return (
    <div className='w-auto mx-auto my-32 flex flex-col items-center justify-items align-middle text-center'>
        <h2 className='text-4xl md:text-7xl font-bold'>Uupppsssss!!!</h2>
        <p className=' text-xl md:text-3xl my-4'>Lo sentimos, seguimos trabajando este recurso</p>
        <Link href="/" className='mt-4 flex justify-center gap-x-2 btn_primary text-white p-2 rounded-md'>Volver Inicio <FaHouse className='mt-[2px]'/></Link>
    </div>
  )
}