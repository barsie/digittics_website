import { ArticleProps } from "@/types";
import {getContent} from '@/data/loaders';
import { Search } from "./Search";
import { PaginationComponent } from "./Pagination";

interface ContentListProps {
    headline: string;
    query?: string;
    path: string;
    featured?: boolean;
    component: React.ComponentType<ArticleProps & { basePath: string }>;
    headlineAlignment?: "center" | "right" | "left";
    showSearch?: boolean;
    page?: string;
    showPagination?: boolean;
}

async function loader(
    path: string, 
    featured?: boolean, 
    query?: string,
    page?: string,
) {
    const { data, meta } = await getContent(path, featured, query, page);

    return{
        articles: (data as ArticleProps[]) || [],
        pageCount: meta?.pagination?.pageCount || 1,
    }
}

export async function ContentList({
    headline,
    path,
    featured,
    component,
    headlineAlignment,
    showSearch,
    query,
    page,
    showPagination,

}: Readonly<ContentListProps>) {
    const { articles, pageCount } = await loader(path, featured, query, page);
    const Component = component;

    return (
        <section className="w-full mx-auto px-0 my-12">
            <h3 className={`text-black text-2xl md:text-4xl my-6 ${headlineAlignment ?? ""} `}>{headline || "Featured Articles"}</h3>
            {showSearch && <Search />}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                {articles.map((article) => (
                    <Component key={article.documentId} {...article} basePath={path}/>
                ))}
            </div>
            { showPagination && <PaginationComponent pageCount={pageCount}/>}
        </section>
    )
}