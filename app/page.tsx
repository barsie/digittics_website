import Image from "next/image";
import logo from "../public/logo-color.png"
import Link from "next/link";
export default function Home() {
  return (
    <div className="mx-auto w-auto">
      <div className="flex flex-col items-center justify-items align-middle text-center min-h-screen">
        <Image src={logo} alt="logo" width={360} height={140} className="rounded-full mt-8"/>
        <h2 className="text-5xl md:text-8xl font-bold text-center">Sitio Web en construcción</h2>
        <Link href='/services'className="bg-[#0174da] text-white rounded-md px-6 py-3 my-6 font-semibold">Ver Servicios</Link>
      </div>
    </div>
  );
}
