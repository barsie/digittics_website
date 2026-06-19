import { FeatureArticleProps } from '@/types';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { StrapiImage } from '../UI/StrapiImage';
import { H1 } from '../UI/ReactMarkdownStyles';

export function FeatureArticle({
    headline,
    link,
    summary,
    image
}: Readonly<FeatureArticleProps>) {
  return (
    <article className='w-full max-w-7xl mx-auto px-4 my-12 md:my-20'>
        <div className='flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12'>
            <div className='flex-1 w-full text-center md:text-left'>
                <h3 className='text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4'>
                    {headline}
                </h3>
                <div className='mt-4 mb-8 text-slate-700 leading-relaxed max-w-prose mx-auto md:mx-0'>
                    <ReactMarkdown components={{ h1: H1 }}>
                        {summary}
                    </ReactMarkdown>
                </div>
                <Link 
                    href={link.href}
                    className='btn_primary inline-block w-full sm:w-auto text-center'
                >
                    {link.text}
                </Link>
            </div>
            <div className='flex-1 w-full max-w-md md:max-w-none'>
                <StrapiImage
                    src={image.url}
                    alt={image.alternativeText || "Feature article promotional image"}
                    width={300} 
                    height={200}
                    className='w-full h-[28rem] object-cover rounded-2xl shadow-md'
                />
            </div>

        </div>
    </article>
  )
}