import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function SearchBar() {
  return (
    <div className="max-w-lg w-1/3">
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="    Search..."
          className="block w-full rounded-full border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute opacity-20 inset-y-0 right-1 flex py-1.5 pr-1.5">
          <MagnifyingGlassIcon className="w-5" />
        </div>
      </div>
    </div>
  )
}
