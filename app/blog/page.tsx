import { BlockRenderer } from '@/components/BlockRederer';
import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';
import { ContentList } from '@/components/UI/ContentList';
import { BlogCard } from '@/components/UI/BlogCard';

async function loader(slug: string) {
    const {data} = await getPageBySlug(slug);
    if(data.length === 0) return notFound()
    return { blocks: data[0]?.blocks}
}

interface PageProps {
    searchParams: Promise< { page?: string; query?: string}>
}


export default async function BlogRoute({searchParams}: PageProps) {

    const { page, query } = await searchParams;

    const { blocks } = await loader("blog");

  return  (
    <main className="max-w-[1240px] mx-auto my-32">
        <BlockRenderer blocks={blocks}/>
        <ContentList 
            headline='Check out our latest articles'
            path="/api/articles"
            component={BlogCard}
            showSearch
            query={query}
            showPagination
            page={page}
        />
    </main>
  )   
}
