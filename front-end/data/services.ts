import { EventsSubscribeProps } from '@/types';
import { fetchAPI } from '@/utils/fetch-api';



export async function subscribeService( email: string) {

    return fetchAPI("/api/newsletter-signups", {
        method: "POST",
        body: { data: { email } },
    });
}



export default async function eventSubscribeService(data: EventsSubscribeProps) {

    return fetchAPI("/api/event-signups", {
        method: "POST",
        body: { data: { ...data } },
    });
}
