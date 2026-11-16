"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search(){

    //  Get access to URL search parameters, routing and current pathname
    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    // Create a debounced search handler that only triggers 300ms after the user stops typing
    const handleSearch = useDebouncedCallback((term: string) => {

        // Create a new URLSearchParams intance with current params
        const params = new URLSearchParams(searchParams);

        // Reset to first page whenever search term changes
        params.set("page", "1"); 

        // Update URL search parameters based on term
        if(term) {
            params.set("query", term)
        }else {
            params.delete("query");
        }

        // Update the URl without triggering a page refresh
        // scroll: false prevents the page from jumping to top
        replace(`${pathname}?${params.toString()}`, { scroll: false})
    }, 300);


    return (
        <div className="flex items-center justify-start py-4">
            <input type="text"
                placeholder="Search for new articles, events and more"
                name=""
                id="" 
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
                className="w-[40rem] bg-white border shadow-sm text-black py-1 px-3 rounded-md focus:outline-none focus:border-[#2aa638] transition-colors duration-200"
            />
        </div>
    )

}