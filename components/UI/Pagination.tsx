"use client"

import {FC} from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';


interface paginationProps {
    pageCount: number;
}

interface PaginationArrowProps {
    direction: "left" | "right";
    href: string;
    isDisabled: boolean;
}
const PaginationArrow: FC<PaginationArrowProps> =({
    direction,
    href,
    isDisabled,
}) => {
    const router = useRouter();
    const isLeft = direction === "left";

    return(
        <button
            onClick={
                (e) => {e.preventDefault();
                router.push(href, { scroll: false})
            }}
            className={`bg-[#2aa638] text-white px-2 py-[0.1rem] text-[.9rem] rounded-lg ${isDisabled ? "bg-[#c5f8cb96]" : ""}`}
            aria-disabled={isDisabled}
            disabled={isDisabled}
        >
            {isLeft ? "←" : "→"}
        </button>
    )
}


export function PaginationComponent({pageCount}: Readonly<paginationProps>){

    // Get current URL path and search parameters using Next.js hooks

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}` //combines current path with updated page parameter
    }

    return (
        <nav role='navigation' aria-label='Pagination' className='pagination-nav'>
            <ul className='flex items-center justify-center gap-4 my-8'>
                <li>
                    <PaginationArrow
                        direction = "left"
                        href={createPageURL(currentPage - 1)}
                        isDisabled={currentPage <= 1}
                    />
                </li>
                <li>
                    <span>
                        Page {currentPage}
                    </span>
                </li>
                <li>
                    <PaginationArrow
                        direction = "right"
                        href={createPageURL(currentPage + 1)}
                        isDisabled={currentPage >= pageCount}
                    />
                </li>
            </ul>
        </nav>
    )
}
