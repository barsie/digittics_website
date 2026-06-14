import type { ArticleProps } from "@/types";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/format-date";
import { getContentBySlug } from "@/data/loaders";

import { HeroSection } from "@/components/Blocks/HeroSection";
interface PageProps{
    params: Promise<{slug: string}>;
}

async function loader(slug: string) {
    const response = await getContentBySlug(slug, "/api/articles")
    const data = response?.data;
    const article = data?.[0];
    if(!article) throw notFound();
    return { article: article as ArticleProps, blocks: article?.blocks}
}

interface ArticleOverviewProps {
    headline: string;
    description: string;
}

function ArticleOverview({
    headline,
    description,
}: Readonly<ArticleOverviewProps>){
    return (
        <div className="w-full mx-auto my-6">
            <div>
                <h3>{headline}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default async function SingleBlogRoute({params}: PageProps) {
    const slug = (await params).slug;
    const { article, blocks} = await loader(slug);
    const { title, author, publishedAt, description, image } = article;

    console.dir(blocks, {depth: null});

    return(
        <section className="w-full mx-auto px-4 my-12 md:my-20">
            <HeroSection
                id={article.id}
                heading={title}
                theme="primary"
                image={image}
                author={author}
                description={description}
                publishedAt={formatDate(publishedAt)}
                darken={true}
            />

            <div className="">
                <ArticleOverview headline={title} description={description}/>
            </div>
        </section>
    )
}