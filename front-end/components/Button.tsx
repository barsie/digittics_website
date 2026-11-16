// Contain a Button prototype structure

import Image from 'next/image';

type ButtonType = {
    type: "button" | "submit";
    title: string;
    icon?: any;
    variant?: 'btn_primary' | 'btn_secondary'
}

const Button = ({type, title, icon}: ButtonType) => {
  return (
    <button
        className={`btn_primary flex items-center justify-center gap-1`}
        type={type}
    >
        <label className='regular-16 whitespace-nowrap'>{title}</label>
        {icon && <Image src={icon} alt={title} width={24} height={24}/>}
    </button>
  )
}

export default Button