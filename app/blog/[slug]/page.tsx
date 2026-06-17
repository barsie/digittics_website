import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/format-date";
import { getContentBySlug } from "@/data/loaders";
import { StrapiImage } from "@/components/StrapiImage";
import { BlockRenderer } from "@/components/BlockRederer";
import type { ArticleProps, Block, CardProps, HeadingProps } from "@/types";
import { Card } from "@/components/Card";
import { ContentList } from "@/components/ContentList";


export const dynamic = 'force-dynamic'
export const revalidate = 0;

async function loader(slug: string) {
  const response = await getContentBySlug(slug, "/api/articles");
  const data = response?.data;
//   console.log("Data:", data)

  const article = Array.isArray(data) ? data[0] : data;
  // console.log("Article:", article)
  
  if (!article) throw notFound();
  return { article: article as ArticleProps, blocks: article?.blocks };
}

const BlogCard = ( props: Readonly<CardProps>) => <Card {...props} basePath="blog"/>

export default async function SingleBlogRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { article, blocks } = await loader(slug);

  const tableOfContent: HeadingProps[] = (blocks?.filter(
    (block: Block): block is HeadingProps => block.__component === "blocks.heading"
  ) ?? []);

  return (
    <article key={slug} className="max-w-[1240px] mx-auto mt-20">
      <div className="relative w-auto h-[350px] md:h-[300px] bg-[#2aa638] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 blur-xl scale-110">
          {article?.image && (
            <StrapiImage
              src={article.image.url}
              alt={
                article.image.alternativeText || "No alternative text provided"
              }
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="w-full h-full mx-auto px-6 flex flex-col justify-center gap-4 md:px-10">
          <div>
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-4xl text-white drop-shadow-md">
              {article?.title}
            </h1>
            {article?.description && (
              <p className="text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed drop-shadow">
                {article.description}
              </p>
            )}

            <div>
              {article.publishedAt && (
                <p className="text-xs text-gray-300 font-medium">
                  {formatDate(article.publishedAt)}
                </p>
              )}
            </div>

          {/* Author Props  */}
            <div className="text-white">
              {article?.author && (
                <>
                  {article.authorAvatar && (
                    <StrapiImage
                      src={article.authorAvatar}
                      alt="Author image"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  )}
                  <h5 className="font-semibold">{article.author}</h5>
                  <span className="text-sm">{article.authorOccupation}</span>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile size */}
      {tableOfContent.length > 0 && (
        <div className="md:hidden mx-8 bg-white p-4 border-b border-gray-200">
          <ul className="flex flex-col gap-2">
            <h3 className="text-slate-800 font-semibold mb-2">
              Table of content
            </h3>
            {tableOfContent.map((item, index) => (
              <li key={index}>
                <Link
                  href={`#${item.linkId}`}
                  className="text-[#2aa638] text-sm hover:underline"
                >
                  {index + 1}. {item.heading}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-8">
        {tableOfContent.length > 0 && (
          <div className="hidden md:block w-[32%] sticky top-16 h-fit">
            <ul className="bg-white p-4 rounded-sm mt-8 shadow-lg">
              <h3 className="text-slate-800 font-semibold mb-3">
                Table of Content
              </h3>
              {tableOfContent.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link
                    href={`#${item.linkId}`}
                    className="text-[#2aa638] text-sm hover:underline"
                  >
                    {index + 1}. {item.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="md:w-[68%] bg-white my-8 px-8 md:px-0">
          <BlockRenderer blocks={blocks} />
        </div>
      </div>
      <div>
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={BlogCard}
          featured={true}
        />
      </div>
    </article>
  );
}