'use server'
import { z } from "zod";
import { subscribeService } from "./services";

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

    const responseData = await subscribeService(validatedFields.data.email);

    if(!responseData){
        return{
            ...prevState,
            strapiErrors: null,
            zodError: null,
            errorMessage: "Ups! Something went wrong. Please try again.",
            successMessage: null
        }
    }

    if(responseData.error){
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