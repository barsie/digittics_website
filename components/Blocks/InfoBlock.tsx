import React from 'react'
import type { InfoBlockProps } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';
import { StrapiImage } from '../StrapiImage';
import { BiCheckCircle } from 'react-icons/bi';

function H1(props:any) { 
  return <h1 className="text-start text-3xl pb-4" {...props} />; 
}

function UL({children}:any) { 
  return <ul className="space-y-2 my-4" >{children}</ul>; 
}

function LI({children}:any){
    return (
        <li className='flex gap-2 items-center'>
            <BiCheckCircle className='color-primary' size={36}/>
            <span className='text-lg'>{children}</span> 
        </li>
    )
}



export default function InfoBlock({
    headline,
    content,
    image,
    cta
}: Readonly<InfoBlockProps>) {

    const ctaData = Array.isArray(cta) ? cta[0] : cta

  return (
    <section className='w-full mx-auto my-24'>
        <h1 className='text-5xl text-center'>{headline}</h1>
        <div className='py-12 '>
            <div className='text-center px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:px-0'>
                <StrapiImage
                    src={image.url}
                    alt={image.alternativeText || "No alternative text provided"}
                    className = "border-b-0 rounded-sm"
                    width = {520}
                    height = {380}
                />
                <div className=''>
                    <ReactMarkdown components={
                        {
                            h1: H1, 
                            ul: UL,
                            li: LI
                        }
                    }>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    </section>
  )
}
