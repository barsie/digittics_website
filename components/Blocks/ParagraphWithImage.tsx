import React from 'react'
import { StrapiImage } from '../StrapiImage'
import ReactMarkdown from 'react-markdown'
import {ParagraphWithImageProps} from '@/types'

export default function ParagraphWithImage({
    content,
    image,
    reversed,
    imageLandscape,
}: Readonly<ParagraphWithImageProps>) {
  return (
    <div className={`"" ${reversed ? "" : " "} ${imageLandscape ? "" : ""}`}>
        <ReactMarkdown>
            {content}
        </ReactMarkdown>
        <div className=''>
            <StrapiImage
                src={image.url}
                alt={image.alternativeText || "Article Image"}
                width={1920}
                height={1080}
                className=''
            />
        </div>
    </div>
  )
}
