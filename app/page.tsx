import PricingCard from "@/components/PricingCard";
import Hero from "@/components/UI/Hero";

export default function Home() {

console.log('Started request')

  return (
    <main className="max-w-[1240px] mx-auto my-32">
      <Hero startTitle="Manten tu" endTitle="siempre fresco"/>
      <PricingCard
        span="Planes y Precios" 
        title={"Estudio y Diagnóstico Gratuito"} 
        promo={'Sin compriso de alta'}
      />
    </main>
  );
}
