import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo-color.png'
import {FaHouse} from 'react-icons/fa6'
 
export default function NotFound() {
  return (
    <div className='w-auto mx-auto flex flex-col items-center justify-items align-middle text-center min-h-screen'>
        <Image src={logo} alt='logo' width={360} height={140} className='rounded-full mt-8'/>
        <h2 className='text-4xl md:text-7xl font-bold'>Página no encontrada</h2>
        <p className=' text-xl md:text-3xl my-4'>Lo sentimos no pudimos encontrar esta recurso</p>
        <Link href="/" className='mt-4 flex justify-center gap-x-2 bg-[#0843ad] text-white p-2 rounded-md'>Volver Inicio <FaHouse className='mt-[2px]'/></Link>
    </div>
  )
}