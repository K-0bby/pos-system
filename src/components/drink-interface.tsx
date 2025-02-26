"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { List, Grid } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { drinks, Product } from "@/lib/data"; // Import your drinks data
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

const categories = ["Beer", "Wine & Spirit", "Tots", "Soft Drinks", "Others"];

export default function DrinksInterface() {
  const { dispatch } = useCart();
  const [selectedTab, setSelectedTab] = useState("Beer");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const itemsPerPage = 10;

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

  function handleAddToCart(drink: Product) {
    if (drink.inStock && drink.qty > 0) {
      dispatch({ type: "ADD_ITEM", payload: drink });
      drink.qty -= 1; // Reduce stock quantity
      drink.inStock = drink.qty > 0; // Update stock status
      toast.success(`${drink.name} has been added to the cart`);
    } else {
      toast.error(`${drink.name} is out of stock`);
    }
  }

  return (
    <div className="flex flex-col">
      <Tabs value={selectedTab} onValueChange={handleTabChange}>
        <TabsList className="flex flex-wrap items-center justify-between gap-4 sm:gap-10 border-b border-gray-100 px-4 sm:px-10">
          {categories.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={clsx(
                "pb-3 text-sm sm:text-base font-medium border-b-2 border-transparent",
                "text-gray-400 data-[state=active]:text-gray-800 data-[state=active]:border-gray-800"
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x- bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewType("grid")}
                className={clsx(
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
                className={clsx(
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

        <div className="p-4 max-h-[600px] overflow-y-auto">
          {categories.map((tab) => (
            <TabsContent key={tab} value={tab}>
              {paginatedDrinks.length === 0 ? (
                <p className="text-center text-gray-500">
                  No drinks available.
                </p>
              ) : (
                <div
                  className={clsx(
                    "gap-4",
                    viewType === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                      : "w-full"
                  )}
                >
                  {viewType === "grid" ? (
                    paginatedDrinks.map((drink) => (
                      <div
                        key={drink.id}
                        className={clsx(
                          "relative group flex flex-col items-center",
                          drink.inStock && drink.qty > 0
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        )}
                        onClick={() => {
                          if (drink.inStock && drink.qty > 0) {
                            handleAddToCart(drink);
                          } else {
                            toast.error(`${drink.name} is out of stock`);
                          }
                        }}
                      >
                        <Image
                          src={drink.image}
                          alt={drink.name}
                          width={100}
                          height={100}
                          className="w-auto h-32 rounded-full mb-2"
                        />
                        <p className="text-sm text-center">{drink.name}</p>
                        <p className="text-sm text-center text-gray-500">
                          Qty: {drink.qty}
                        </p>
                        <p className="text-sm text-center text-gray-500">
                          GH¢ {drink.price.retail.toFixed(2)}
                        </p>
                        {drink.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-xs text-white font-medium bg-black/80 px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                              Add to Cart
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <table className="w-full text-sm border-collapse border border-gray-200">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">
                            Image
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Name
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Qty
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Retail Price
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Wholesale Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedDrinks.map((drink) => (
                          <tr
                            key={drink.id}
                            className={clsx(
                              "hover:bg-gray-100",
                              drink.inStock && drink.qty > 0
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            )}
                            onClick={() => {
                              if (drink.inStock && drink.qty > 0) {
                                handleAddToCart(drink);
                              } else {
                                toast.error(`${drink.name} is out of stock`);
                              }
                            }}
                          >
                            <td className="border border-gray-300 px-4 py-2">
                              <Image
                                src={drink.image}
                                alt={drink.name}
                                width={64}
                                height={64}
                                className="w-18 h-24 rounded-full"
                              />
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                              {drink.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                              {drink.qty}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                              GH¢ {drink.price.retail.toFixed(2)}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                              GH¢ {drink.price.wholesale.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>

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
