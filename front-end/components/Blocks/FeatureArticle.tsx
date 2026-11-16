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
    <article className="max-w-[1240px] mx-auto my-12 md:my-20">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 w-full text-center md:text-left">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
            {headline}
          </h3>
          <div className="mt-4 mb-8 text-slate-700 leading-relaxed max-w-prose mx-auto md:mx-0">
            <ReactMarkdown components={{ h1: H1 }}>{summary}</ReactMarkdown>
          </div>
          <Link
            href={link.href}
            className="btn_primary inline-block w-full sm:w-auto text-center"
          >
            {link.text}
          </Link>
        </div>
        <div className="flex-1 w-full max-w-md md:max-w-none">
          {image?.url ? (
            <StrapiImage
              src={image.url}
              alt={image.alternativeText || "Feature article promotional image"}
              width={300}
              height={200}
              className="w-full h-[28rem] object-cover rounded-2xl shadow-md"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
              <svg
                className="w-8 h-8 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs font-medium">Imagen no disponible</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}