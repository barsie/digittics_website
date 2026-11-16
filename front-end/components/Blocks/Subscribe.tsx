'use client'

import { SubscribeProps } from '@/types'
import { subscribeAction } from '@/data/actions'
import { useActionState } from 'react'

const INITIAL_STATE = {
   zodErrors: null,
   strapiErrors: null,
   errorMessage: null,
   successMessage: null, 
}

export function Subscribe({
    headline,
    content,
    placeholder,
    buttonText
}: Readonly<SubscribeProps>) {

    const [formState, formAction] = useActionState( subscribeAction, INITIAL_STATE)
    // console.log(formState, "this is a form state comming from useActionState")
    const zodErrors = formState?.zodErrors?.email;
    const strapiErrors = formState?.strapiErrors?.[0]?.message;

    // create a generic error message
    const errorMessage = strapiErrors || zodErrors || formState?.errorMessage;
    const successMessage = formState?.successMessage;

  return (
    <section className='w-full max-w-7xl mx-auto px-4 md:px-0 my-12'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#1E293B] rounded-md p-6 md:p-8'>
            <div className='space-y-1 text-center lg:text-left'>
                <h4 className='font-semibold text-xl md:text-2xl text-slate-100'>{headline}</h4>
                <p className='text-sm md:text-base text-slate-300'>{content}</p>
            </div>
            <form className='flex flex-col sm:flex-row items-stretch sm:items-center w-full lg:w-auto gap-2 sm:gap-0' action={formAction}>
                <input 
                    // type="email"
                    name="email" 
                    id="email" 
                    placeholder={ errorMessage || successMessage || placeholder}
                    className={`newsletter__email ${errorMessage ? "newsletter__email--error" : ""}`}
                />
                <button 
                    type='submit' 
                    className='bg-[#2CCB73] hover:bg-[#21852c] transition-colors text-white py-2.5 px-5 font-medium rounded-md sm:rounded-l-none sm:rounded-r-xl whitespace-nowrap'
                >
                    {buttonText}
                </button>
            </form>
        </div>
    </section>
  )
}