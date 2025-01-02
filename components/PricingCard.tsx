
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";
import { usePathname } from "next/navigation";
import Button from "./Button";

type PricingCardProps = {
  title: string,
  promo?: string,
  span?: string
}

export default function PricingCard({title, promo, span}: PricingCardProps) {


  return (
    <section className="max-w-full flex flex-col items-center justify-center mx-auto bg-[#dbecf9] my-8">

    <div className="py-8">
      <span className="flex items-center justify-center text-[#0174da] font-semibold md:text-[1.4em]">{span}</span>
      <p className="text-center md:text-[3.2em] font-bold">{promo}</p>
      <h1 className="text-center md:text-[4em] font-bold">{title}</h1>
    </div>

    <div className="mb-18 grid grid-cols-1 md:grid-cols-4 gap-2 items-center justify-center">
        <div className="relative px-8 w-[18rem] h-[30rem] bg-slate-50 shadow-2xl rounded-md border-2 border-[#0174da]">
          <div className="py-4 text-center">
            <h2 className="text-[2em] font-bold text-[#0174da] py-2">Basic</h2>
            <h3 className="text-xl font-bold"> CFAS 7.000/Mes</h3>
            <span className="py-1">Facturado Por Trimestre</span>
            <p className="py-1">Por Aire Acondicionado</p>
          </div>
          
          <p className="text-slate-500 py-4">Plan incluye:</p>

          <ul className="flex flex-col">
            {/* <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Por Aire Acondicionado</li> */}
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Lavado cada 60 días</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Incorporación de gas</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>25% Off en Reparaciones</li>
          </ul>
          <Link href='https://wa.me/240555793862' target='_blank' className=" text-center bg-[#0174da] py-2 px-3 w-[70%] mx-auto rounded text-white absolute bottom-5 left-0 right-0">Comprar Plan</Link>
        </div>        
        <div className="relative px-8 w-[18rem] h-[30rem] bg-[#0174da] shadow-2xl rounded-md border-2 border-[#0174da] text-[#fff]">
          
          {/* <span className="">Recomendado</span> */}
          
          <div className="py-4 text-center">
            <h2 className="text-[2em] font-bold text-[#fff] py-2">Home</h2>
            <h2 className="text-xl font-bold"> CFAS 10.000/Mes</h2>
            <span className="py-1">Facturado Por Trimestre</span>
            <p className="py-1">Por Aire Acondicionado</p>
          </div>
          
          <ul className="flex flex-col">
          <p className="text-slate-300 py-2">Plan incluye:</p>

            {/* <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#fff"/>Por Aire Acondicionado</li> */}
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#fff"/>Lavado cada 45 días</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#fff"/>Incorporación de gas</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#fff"/>1 Recambio Incluido</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#fff"/>1 Reparacion gratuita</li>
          </ul>
          <Link href='https://wa.me/240555793862' target='_blank' className=" text-center bg-[#fff] py-2 px-3 w-[70%] mx-auto rounded text-[#0174da] absolute bottom-5 left-0 right-0">Comprar Plan</Link>
        </div>        
        <div className="relative px-8 w-[18rem] h-[30rem] bg-slate-50  shadow-2xl rounded-md border-2 border-[#0174da]">
          <div className="py-4 text-center">
            <h2 className="text-[2em] font-bold text-[#0174da] py-2">Business</h2>
            <h2 className="text-xl font-bold"> CFAS 15.000/Mes</h2>
            <span className="py-1">Facturado Anualmente</span>
            <p className="py-1">Por Aire Acondicionado</p>
          </div>
          
          <ul className="flex flex-col">
          <p className="text-slate-500 py-2">Plan incluye:</p>

            {/* <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Por Aire Acondicionado</li> */}
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Lavado cada 30 días</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Incorporación de gas</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>3 Recambios Incluidos</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Reparaciones gratuitas</li>
          </ul>
          <Link href='https://wa.me/240555793862' target='_blank' className=" text-center bg-[#0174da] py-2 px-3 w-[70%] mx-auto rounded text-white absolute bottom-5 left-0 right-0">Comprar Plan</Link>
        </div>        
        <div className="relative px-8 w-[18rem] h-[30rem] bg-slate-50  shadow-2xl rounded-md border-2 border-[#0174da]">
          <div className="py-4 text-center">
            <h2 className="text-[2em] font-bold text-[#0174da] py-2">Institution</h2>
            <h2 className="text-xl font-bold"> CFAS 20.000/Mes</h2>
            <span className="py-1">Facturado Anualmente</span>
            <p className="py-1">Por Aire Acondicionado</p>
          </div>
          
          <ul className="flex flex-col">
          <p className="text-slate-500 py-2">Todo en el Plan Business más:</p>

            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Reparaciones ilimitadas</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Recambios ilimitados</li>
            <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Instalaciones nuevas gratis</li>
            {/* <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Lavado cada 30 días</li> */}
            {/* <li className="flex items-center gap-2 py-2"><BiCheckCircle size={20} color="#0174da"/>Incorporaciones de gas</li> */}
          </ul>
          <Link href='mailto:barsiebarila@gmail.com' className=" text-center bg-[#0174da] py-2 px-3 w-[70%] mx-auto rounded text-white absolute bottom-5 left-0 right-0">Contactar Ventas</Link>
        </div>
      </div>

    </section>
  )
}
