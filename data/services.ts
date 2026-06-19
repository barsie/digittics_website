import { EventsSubscribeProps } from '@/types';
import { getStrapiURL } from '@/utils/get-strapi-url';

const BASE_URL = getStrapiURL()



export async function subscribeService( email: string) {

    const url = new URL("/api/newsletter-signups", BASE_URL)

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    email,
                }
            })
        })

        return response.json();

    } catch (error) {
        console.error("Subscribe Service Error", error);
    }
}



export default async function eventSubscribeService(data: EventsSubscribeProps) {

    const url = new URL("/api/event-signups", BASE_URL)

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data: {...data}}),
        });
        return await response.json();
        
    }catch(error){
        console.error("Subscribe Service Error", error);
    }
}
