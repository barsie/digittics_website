import React from 'react'
import { StrapiImage } from '../StrapiImage'
import { FullImageProps } from '@/types'

export default function FullImage({ image }: Readonly<FullImageProps>) {
  return (
    <div>
        <StrapiImage
            src={image.url}
            alt={image.alternativeText || "Article Image"}
            width={1920}
            height={1080}
            className=''
        />

    </div>
  )
}
