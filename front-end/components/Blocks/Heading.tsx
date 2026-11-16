import React from "react";

import type { HeadingProps } from "@/types"
export function Heading({ heading, linkId}: Readonly<HeadingProps>) {
    return (
        <h3 id={linkId} className="w-full mx-auto font-semibold py-2 text-lg md:text-3xl">
            {heading}
        </h3>
    )
}