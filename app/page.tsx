import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRederer";
import { ContentList } from "@/components/UI/ContentList";
import { getHomePage } from "@/data/loaders";
import { BlogCard } from "@/components/UI/BlogCard";


async function loader(){
  const data = await getHomePage()
  if(!data) notFound();
  return {...data.data}
}

export default async function HomeRoute() {

  const data =  await loader()
  const blocks = data?.blocks || [];
  // console.log(data)

  return (
    <main className="w-full mx-auto">
      <BlockRenderer blocks={blocks}/>
      <div className="max-w-[1240px] mx-auto px-4 md:px-0">
        <ContentList 
          headline='Featured Articles'
          path="/api/articles"
          component={BlogCard}
          featured
        />
      </div>
    </main>
  );
}