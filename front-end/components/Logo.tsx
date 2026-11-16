// Contain the logo 

import Image from 'next/image';

type LogoType = {
  title: string;
  subtitle?: string;
  icon?: any;
  variant?: 'logo_primary' | 'btn_secundary';
  width?: 'full' | 'w-50'
}

const Logo = ({title,subtitle, icon}:LogoType) => {
  return (
    <div className={`logo_primary flex flex-col gap-1`}>
        {icon && <Image src={icon} alt={title} width={40} height={40}/>}
        <h3 className='text-[2em] uppercase'>{title}<span className='text-black text-[.8em]'>&trade;</span></h3>
        <span className='text-black'>{subtitle}</span>
    </div>
  )
}

export default Logo