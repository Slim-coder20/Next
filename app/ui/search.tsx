"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
export default function Search({ placeholder }: { placeholder: string }) {
  // initialize search params and pathname
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... $(term)`);
    // create a new URLSearchParams object
    const params = new URLSearchParams(searchParams);
    // if the term is not empty, set the query parameter to the term
    if (term) {
      params.set("query", term);
    } else {
      // if the term is empty, delete the query parameter
      params.delete("query");
    }
    // replace the current path with the new path
    replace(`${pathname}?${params.toString()}`);
  }, 3000);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // handle the search input change
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // set the default value to the query parameter
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
