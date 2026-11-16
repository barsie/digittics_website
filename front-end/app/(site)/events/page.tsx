import { ContentList } from "@/components/UI/ContentList";
import { Card } from "@/components/UI/Card";
import { CardProps, EventProps } from "@/types";
import { getContentBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import EventSigupForm from "@/components/UI/EventSignupForm";

async function loader(slug: string) {
  const response = await getContentBySlug(slug, "/api/events");
  const data = response?.data;
//   console.log("Data:", data)

  const event = Array.isArray(data) ? data[0] : data;
  // console.log("Article:", event)
  
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}

interface ParamsProps{
    params: Promise<{slug: string}>;
    searchParams: Promise<{page?: string, query?: string}>
}

const EventCard = (props: Readonly<CardProps>) => <Card {...props} basePath="events"/>



export default async function page({
    params, 
    searchParams
}:ParamsProps) {

    // const slug = (await params).slug
    const { page, query} = await searchParams;
    const { event, blocks} = await loader("stay-in-touch");

  return (
    <section className="max-w-[1240px] mx-auto mt-20">
      <EventSigupForm
        blocks={blocks}
        eventId={event.documentId}
        startDate=""
        price=""
          
      />
           
    <div>
      <ContentList
        headline="All Events"
        path="/api/events"
        query={query}
        page={page}
        showSearch
        showPagination
        component={EventCard}
      />
    </div>
    </section>
  )
}
