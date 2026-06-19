"use client"
import { useActionState } from 'react'
import { Block } from '@/types'
import { BlockRenderer } from '../BlockRederer'
import { formatDate } from '@/utils/format-date'
import { StrapiImage } from './StrapiImage'
import SubmitButton from './SubmitButton'
import { eventSubscribeAction } from '@/data/actions'

const INITIAL_STATE = {
    zodErrors: null,
    strapiErrors: null,
    errorMessage: null,
    successMessage: null,
    formData: null
}

interface TextInputProps {
    id: string;
    label: string;
    name: string;
    type?: string;
    error?: string;
    defaultValue?: string;
}

function TextInput({
    id,
    label,
    name,
    type,
    error,
    defaultValue
}: TextInputProps){
    return (
        <div className='w-full'>
            <label htmlFor={id} className='block my-1 text-sm font-medium'>{label}</label>
            <input 
                type={type}
                name={name}
                id={id}
                className="w-full bg-[#c5f8cb96] border border-transparent text-black py-2 px-3 rounded-md focus:outline-none focus:border-[#2aa638] transition-colors duration-200"
                defaultValue={defaultValue}
            />
            { error &&  <p className='text-red-500 text-sm mt-1'>{error}</p>}
        </div>
    )
}

export default function EventSigupForm({
    blocks,
    eventId,
    startDate,
    price,
    image
}: {
    blocks: Block[];
    eventId: string;
    startDate?: string;
    price?: string;
    image?: {
        url: string;
        alt: string;
    }
}){

    const [formState, formAction] = useActionState( eventSubscribeAction, INITIAL_STATE )

    const zodErrors = formState?.zodErrors;
    const strapiErrors = formState?.strapiErrors;
    const successMessage = formState?.successMessage;

  return (
    <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 sm:px-8 md:px-0">
      <div className="my-4 md:my-8 px-0 sm:px-4 md:px-0">
        <BlockRenderer blocks={blocks} />
        {startDate && (
          <p className="text-sm md:text-base mt-4">
            <span className="font-semibold">Start Date: </span>{formatDate(startDate)}
          </p>
        )}
        {price && (
          <p className="text-sm md:text-base mt-2">
            <span className="font-semibold">Price: </span>{price}
          </p>
        )}
      </div>
      <form
        action={formAction}
        className="w-full md:w-auto my-4 md:my-8 rounded-2xl shadow-sm px-4 sm:px-6 md:px-8 py-6 md:py-8"
        name="signup-form"
      >
        {image && (
            <StrapiImage
                src={image?.url}
                alt={image.alt}
                height={200}
                width={200}
                className="w-full h-40 mx-auto mb-4"
            />
        )}

        <div className="flex flex-col sm:flex-row gap-4 md:gap-8 my-4">
            <TextInput
                id="firstName"
                label="First Name"
                name="firstName"
                error={zodErrors?.firstName}
                defaultValue={formState?.formData?.firstName ?? ""}
            />
            <TextInput
                id="lastName"
                label="Last Name"
                name="lastName"
                error={zodErrors?.lastName}
                defaultValue={formState?.formData?.lastName ?? ""}
            />
        </div>
            <TextInput
                id="email"
                label="Email"
                name="email"
                type="email"
                error={zodErrors?.email}
                defaultValue={formState?.formData?.email ?? ""}
            />
            <TextInput
                id="phone"
                label="Phone"
                name="telephone"
                type="phone"
                error={zodErrors?.telephone}
                defaultValue={formState?.formData?.telephone ?? ""}
            />
        <input hidden type="text" name="eventId" defaultValue={eventId} />
        <SubmitButton
          text="Sign Up"
          className={`btn_primary flex items-center justify-center mt-6`}
        />

        {strapiErrors && (
          <p className="text-red-500 text-sm mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            {strapiErrors}
          </p>
        )}
        {successMessage && (
          <p className="text-[#2aa638] text-sm mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            {successMessage}
          </p>
        )}
      </form>
    </section>
  );
}