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
            <span className="font-semibold">Start Date: </span>
            {formatDate(startDate)}
          </p>
        )}
        {price && (
          <p className="text-sm md:text-base mt-2">
            <span className="font-semibold">Price: </span>
            {price}
          </p>
        )}
      </div>
      <form
        action={formAction}
        className="md:w-auto my-4 md:my-2 rounded-xl shadow-b-sm shadow-t-2xl px-4 sm:px-6 md:px-8 py-6 md:py-8 w-full"
        name="signup-form"
      >
         <div className="relative w-full h-48 sm:h-56 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 px-0 ">
          {image?.url ? (
            <StrapiImage
              src={image?.url}
              alt={image.alt}
              width={400} 
              height={250}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
              <svg
                className="w-8 h-8 opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs font-medium">Imagen no disponible</span>
            </div>
          )}

         </div>

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