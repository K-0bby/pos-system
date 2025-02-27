"use client";

import { Input } from "@/components/ui/input"; // ShadCN Input component
import { useDebouncedCallback } from "use-debounce";
import { Search as SearchIcon } from "lucide-react"; // Lucide icon

interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void; // Notify parent on search term change
}

export default function Search({ placeholder, onSearch }: SearchProps) {
  const handleSearch = useDebouncedCallback((term: string) => {
    onSearch(term); // Notify parent with the updated term
  }, 300);

  return (
    <div className="relative flex w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <Input
        id="search"
        placeholder={placeholder}
        className="pl-10 focus:outline-none h-12 rounded-xl" // Add padding for the icon
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
    </div>
  );
}
