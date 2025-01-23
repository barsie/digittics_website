
import Button from "@/components/Button";
import ClientSection from "@/components/CountCard";
import PricingCard from "@/components/PricingCard";
import PricingHeader from "@/components/PricingHeader";
import Hero from "@/components/UI/Hero";
import Link from "next/link";

export default function Home() {

console.log('Started request')

  return (
    <main className="max-w-[1240px] mx-auto my-32">
      <Hero startTitle="Manten tu" endTitle="siempre fresco"/>
      <PricingHeader
        span="Planes y Precios" 
        title={"Estudio y Diagnóstico Gratuito"} 
        promo={'Sin compromiso de contratación'}
      />
      <PricingCard/>
        <div className="my-12">
          <h1 className="text-center text-5xl text-[#0174da] font-bold">Clientes</h1>
          <div className="w-auto mx-8 mt-12 grid grid-cols-1 md:grid-cols-4 md:mx-0 gap-8 items-center justify-center">
            <ClientSection title={"Hogares Suscritos"} total={6}/>
            <ClientSection title={"Empresas Suscritas"} total={2}/>
            <ClientSection title={"Edificios Suscritos"} total={1}/>
            <ClientSection title={"Aires mantenidos"} total={28}/>
          </div>
          <div className="w-auto mx-auto my-8 flex items-center justify-center cursor-pointer">
            <Link href = 'https://wa.me/240555818481' target="_blank">
              <Button type={"button"} title={"¡Pide tu primer servicio Gratis hoy!"}/>
            </Link>
          </div>
        </div>
    </main>
  );
}
