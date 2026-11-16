import { BiCheckCircle } from "react-icons/bi";

export function H1(props:any) { 
  return <h1 className="text-center md:text-start text-3xl pb-4" {...props} />; 
}

export function UL({children}:any) { 
  return <ul className="space-y-2 my-4" >{children}</ul>; 
}

export function LI({children}:any){
    return (
        <li className='flex gap-2 items-center'>
            <BiCheckCircle className='color-primary' size={36}/>
            <span className='md:text-lg'>{children}</span> 
        </li>
    )
}
