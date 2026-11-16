'use server'
import { z } from "zod";
import eventSubscribeService, { subscribeService } from "./services";
import { EventsSubscribeProps } from "@/types";
import { StrapiHTTPError } from "@/utils/fetch-api";

async function signupResponse(request: Promise<unknown>) {
    try {
        return await request;
    } catch (error) {
        if (error instanceof StrapiHTTPError && [400, 409, 422].includes(error.status) &&
            typeof error.responseBody === "object" && error.responseBody !== null &&
            "error" in error.responseBody && error.responseBody.error) {
            return error.responseBody;
        }
        throw error;
    }
}

const subscribeSchema = z.object({
    email: z.email({
        message: "Please enter a valid email address"
    })
})


export async function subscribeAction(prevState: any, formData:FormData) {
    // console.log("This is a server action");
    const email = formData.get("email");

    const validatedFields = subscribeSchema.safeParse({
        email: email
    })

    if(!validatedFields.success){

        console.dir(validatedFields.error.flatten().fieldErrors, {depth: null})

        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors, 
            strapiErrors: null,
            successMessage: null
        }
    }

    const responseData = await signupResponse(subscribeService(validatedFields.data.email));

    if(!responseData){
        return{
            ...prevState,
            strapiErrors: null,
            zodError: null,
            errorMessage: "Ups! Something went wrong. Please try again.",
            successMessage: null
        }
    }

    if(typeof responseData === "object" && "error" in responseData && responseData.error){
        return{
            ...prevState,
            strapiErrors: responseData.error,
            zodError: null,
            errorMessage: "Already Subscribed.",
            successMessage: null
        }
    }

    return {
        ...prevState,
        zodErrors:null, 
        strapiErrors: null,
        errorMessage: null,
        successMessage: "🔓 Successfully Subscribed!"
    }
}

const eventSubscribeSchema = z.object({
    firstName: z.string().min(1, {message: "Please enter your first name"}),
    lastName: z.string().min(1, {message: "Please enter your last name"}),
    email: z.email({ message: "Please enter your email address"}),
    telephone: z.string()
        .min(1)
        .regex(/^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/, {
            message: "Please enter a valid phone number"
        }),
})

export async function eventSubscribeAction(prevState: any, formData: FormData){
    const formDataObject = {
        firstName: formData.get("firstName")?.toString().trim() || "",
        lastName: formData.get("lastName")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        telephone: formData.get("telephone")?.toString().trim() || "",
        eventId: formData.get("eventId"),
    }

    const validatedFields = eventSubscribeSchema.safeParse(formDataObject);

    if(!validatedFields.success){
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors, 
            strapiErrors: null,
            formData: {
                ...formDataObject,
            }
        }
    }

    const dataToSend: EventsSubscribeProps = {
        ...validatedFields.data,
        event: {
            connect: [formDataObject.eventId as string],
        }
    }

    const responseData = await signupResponse(eventSubscribeService(dataToSend));

    if(!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            errorMessage: "Ups! Something went wrong. Please try again"
        }
    }

        if(typeof responseData === "object" && "error" in responseData && responseData.error){
        return{
            ...prevState,
            strapiErrors: responseData.error,
            zodError: null,
            formData: {
                ...formDataObject,
            },
            errorMessage: "✅ Already Joined.",
            successMessage: null
        }
    }

    return {
        ...prevState,
        zodErrors:null, 
        strapiErrors: null,
        errorMessage: null,
        formData: null,
        successMessage: "🔓 Successfully Subscribed!"
    }
}
