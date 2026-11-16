"use client"

import { useFormStatus } from "react-dom"

interface SubmitButtonProps{
    text: string;
    className?: string;
}

export default function SubmitButton({
    className, text
}:Readonly<SubmitButtonProps>) {
    
    const status = useFormStatus()
  
    return (
    <button
        type="submit"
        aria-disabled={status.pending}
        disabled={status.pending}
        className={className}
    >
        { status.pending ? "Loading..." : text}
    </button>
  )
}
