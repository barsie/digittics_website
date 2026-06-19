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
    <main className="max-w-[1240px] mx-auto my-32">
      <BlockRenderer blocks={blocks}/>
      <div className="container">
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