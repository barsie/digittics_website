import { ContentList } from "@/components/UI/ContentList";
import { Card } from "@/components/UI/Card";
import { CardProps, EventProps } from "@/types";
import { getContentBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import EventSigupForm from "@/components/UI/EventSignupForm";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";


async function loader(slug: string) {
  const response = await getContentBySlug(slug, "/api/events");
  const data = response?.data;
  const event = Array.isArray(data) ? data[0] : data;
  
  if (!event) throw notFound();
  return { event: event as EventProps, blocks: event?.blocks };
}

interface ParamsProps{
    params: Promise<{slug: string}>;
    searchParams: Promise<{page?: string, query?: string}>
}

const EventCard = (props: Readonly<CardProps>) => <Card {...props} basePath="events"/>



export default async function SingleEventRoute({
    params,
}:ParamsProps) {

    const slug = (await params).slug
    const { event, blocks} = await loader(slug);

  return (
    <section className="max-w-[1240px] mx-auto mt-20">
                <EventSigupForm
                    blocks={blocks}
                    eventId={event.documentId}
                    startDate={event.startDate}
                    price={`CFAS ${event.price}`}
                    image={
                        {
                            url: event?.image?.url, 
                            alt: event?.image?.alternativeText || "Event Image"
                        }
                    }
                    
                />
           
            <div className="">
                <ContentList
                    headline="Featured Events"
                    path="/api/events"
                    featured={true}
                    component={EventCard}
                />
                <Link 
                    href="/events" 
                    className="mb-2 -mt-8 px-4 flex items-center justify-center md:justify-end text-[#2aa638]">
                See all events <MdArrowForward/>
                </Link>
            </div>
    </section>
  )
}
