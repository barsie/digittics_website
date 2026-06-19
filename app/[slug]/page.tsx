import { BlockRenderer } from '@/components/BlockRederer';
import { getPageBySlug } from '@/data/loaders';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{slug: string}>
}

async function loader(slug:string) {
    const {data} = await getPageBySlug(slug);
    if(data.length === 0) return notFound()
    return { blocks: data[0]?.blocks}
}

export default async function DynamicPageRoute({params}: PageProps) {

    const slug = (await params).slug
    const { blocks } = await loader(slug);

  return  (
    <main className="max-w-[1240px] mx-auto my-32">
        <BlockRenderer blocks={blocks}/>
    </main>
  )   
}
