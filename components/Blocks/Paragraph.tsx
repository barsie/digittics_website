import React from 'react'
import { ParagraphProps } from '@/types'
import ReactMarkdown from 'react-markdown'

export default function Paragraph({content}: Readonly<ParagraphProps>) {
  return (
    <div className='max-w-[1240px]'>
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
