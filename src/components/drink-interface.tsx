"use client";

import { useState, useEffect } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { drinks, Product } from "@/lib/data"; // Importing drinks data
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface DrinksInterfaceProps {
  searchQuery: string; // Receive search query as a prop
}

const categories = ["Beer", "Wine & Spirit", "Tots", "Soft Drinks", "Others"];

export default function DrinksInterface({ searchQuery }: DrinksInterfaceProps) {
  const { state, dispatch } = useCart();
  const [selectedTab, setSelectedTab] = useState("Beer");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [stock, setStock] = useState<Product[]>([...drinks]); // Dynamic stock tracking

  const itemsPerPage = 10;

  useEffect(() => {
    // Sync stock with the cart
    const updatedStock = drinks.map((drink) => {
      const cartItem = state.items.find((item) => item.id === drink.id);
      const updatedQty = drink.qty - (cartItem?.quantity || 0); // Subtract cart quantities
      return {
        ...drink,
        qty: Math.max(updatedQty, 0), // Prevent negative qty
        inStock: updatedQty > 0,
      };
    });
    setStock(updatedStock);
  }, [state.items]);

  const filteredDrinks = stock.filter(
    (drink) =>
      drink.category === selectedTab &&
      (!searchQuery ||
        drink.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredDrinks.length / itemsPerPage);
  const paginatedDrinks = filteredDrinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const handleAddToCart = (drink: Product) => {
    if (drink.qty > 0) {
      dispatch({ type: "ADD_ITEM", payload: drink });
      toast.success(`${drink.name} has been added to the cart`);
    } else {
      toast.error(`${drink.name} is out of stock`);
    }
  };

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
                <p className="text-center text-gray-500">No drinks available.</p>
              ) : viewType === "grid" ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  {paginatedDrinks.map((drink) => (
                    <div
                      key={drink.id}
                      className={clsx(
                        "relative group flex flex-col items-center",
                        drink.qty > 0
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      )}
                      onClick={() => {
                        if (drink.qty > 0) {
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
                        {drink.qty > 0 ? `Qty: ${drink.qty}` : "Out of Stock"}
                      </p>
                      <p className="text-sm text-center text-gray-500">
                        GH¢ {drink.price.retail.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDrinks.map((drink) => (
                      <TableRow
                        key={drink.id}
                        className={clsx(
                          drink.qty > 0
                            ? "hover:bg-gray-100"
                            : "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <TableCell>
                          <Image
                            src={drink.image}
                            alt={drink.name}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                        </TableCell>
                        <TableCell>{drink.name}</TableCell>
                        <TableCell>
                          {drink.qty > 0 ? `Qty: ${drink.qty}` : "Out of Stock"}
                        </TableCell>
                        <TableCell>GH¢ {drink.price.retail.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleAddToCart(drink)}
                            disabled={drink.qty === 0}
                            className={clsx(
                              "px-3 py-1 text-sm rounded",
                              drink.qty > 0
                                ? "text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            )}
                          >
                            Add to Cart
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>

      {totalPages > 1 && (
        <Pagination className="mt-10 self-center">
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
