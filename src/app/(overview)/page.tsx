"use client";
import { useState } from "react";
import Cart from "@/components/cart";
import DrinksInterface from "@/components/drink-interface";
import Search from "@/components/search";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="pb-5">
      <div className="py-3">
        <Search
          placeholder="Search Product here..."
          onSearch={(query) => setSearchQuery(query)}
        />
      </div>
      <div className="border-b border-gray-100 my-1" />
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <div className="border border-gray-200 rounded-2xl p-5 w-full col-span-2">
          <DrinksInterface searchQuery={searchQuery} />
        </div>
        <div className="border border-gray-200 rounded-2xl p-5 w-full col-span-2 lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}
