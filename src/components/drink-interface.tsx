"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { List, Grid } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { drinks } from "@/lib/data"; // Import your drinks data

const categories = ["Beer", "Wine & Spirits", "Tots", "Soft Drinks", "Other"];

export default function DrinksInterface() {
  const [selectedTab, setSelectedTab] = useState("Beer");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState("grid");
  const itemsPerPage = 8;

  const filteredDrinks = drinks.filter(
    (drink) => drink.category === selectedTab
  );
  const totalPages = Math.ceil(filteredDrinks.length / itemsPerPage);
  const paginatedDrinks = filteredDrinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleTabChange(tab: string) {
    setSelectedTab(tab);
    setCurrentPage(1);
  }

  //   function handleToggleView() {
  //     setViewType(viewType === "grid" ? "list" : "grid");
  //   }

  return (
    <div className="flex flex-col">
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        {/* Tabs Navigation */}
        <TabsList className="flex items-center justify-between space-x-10 border-b border-gray-100 px-10">
          {categories.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="pb-3 text-base font-medium text-gray-400 border-b-2 border-transparent data-[state=active]:text-gray-800 data-[state=active]:border-gray-800"
            >
              {tab}
            </TabsTrigger>
          ))}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg ">
              <button
                onClick={() => setViewType("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewType === "grid"
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/50"
                )}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  viewType === "list"
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/50"
                )}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </TabsList>

        {/* Drink Listings */}
        <div className="p-4 max-h-[600px] overflow-y-auto">
          {categories.map((tab) => (
            <TabsContent key={tab} value={tab}>
              {paginatedDrinks.length === 0 ? (
                <p className="text-center text-gray-500">
                  No drinks available.
                </p>
              ) : viewType === "grid" ? (
                <div className="grid grid-cols-4 gap-4">
                  {paginatedDrinks.map((drink, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <Image
                        src={drink.img}
                        alt={drink.name}
                        width={100}
                        height={100}
                        className="w-18 h-32 rounded-full mb-2"
                      />
                      <p className="text-sm text-center">{drink.name}</p>
                      <p className="text-sm text-center text-gray-500">
                        Qty: {drink.qty}
                      </p>
                      <p className="text-sm text-center text-gray-500">
                        GH¢ {drink.price.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">
                        Image
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">Qty</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDrinks.map((drink, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">
                          <Image
                            src={drink.img}
                            alt={drink.name}
                            width={64}
                            height={64}
                            className="w-18 h-24 rounded-full "
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          {drink.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                          {drink.qty}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                          GH¢ {drink.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {/* Pagination outside the scrollable content */}
      {totalPages > 1 && (
        <Pagination className="mt-5 self-center">
          <PaginationContent>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
