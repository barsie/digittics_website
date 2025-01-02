// Contain a Button prototype structure

import Image from 'next/image';

type ButtonType = {
    type: "button" | "submit";
    title: string;
    icon?: any;
    variant?: 'btn_primary' | 'btn_secundary'
}

const Button = ({type, title, icon}: ButtonType) => {
  return (
    <button
        className={`btn_primary`}
        type={type}
    >
        {icon && <Image src={icon} alt={title} width={24} height={24}/>}
        <label className='regular-16 whitespace-nowrap'>{title}</label>
    </button>
  )
}

export default Button