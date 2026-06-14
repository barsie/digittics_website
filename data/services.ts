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
