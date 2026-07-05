import React from 'react'
import type { InfoBlockProps } from '@/types'
import ReactMarkdown from 'react-markdown'
import { StrapiImage } from '../UI/StrapiImage';
import {UL, LI, H1 } from '../UI/ReactMarkdownStyles'


export default function InfoBlock({
    headline,
    content,
    image,
    cta
}: Readonly<InfoBlockProps>) {

    const ctaData = Array.isArray(cta) ? cta[0] : cta

  return (
    <section className='max-w-[1240px] w-full mx-auto px-4 md:px-0 my-12 md:my-20'>
        <h1 className='text-2xl md:text-5xl text-center'>{headline}</h1>
        <div className='py-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:px-0'>
                <StrapiImage
                    src={image.url}
                    alt={image.alternativeText || "No alternative text provided"}
                    className = "border-b-0 rounded-2xl"
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
