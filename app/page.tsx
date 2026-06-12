
import { BlockRenderer } from "@/components/BlockRederer";
import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";

import React from 'react'

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
    </main>
  );
}
