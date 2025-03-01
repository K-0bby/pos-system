"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import InventoryTable from "@/components/inventory-table";
import Search from "@/components/search";
import { inventoryData, InventoryItem, categories } from "@/lib/inventory-data";
import AddProductDialog from "@/components/add-product-dialog";

export default function InventoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryData);
  const [filteredInventory, setFilteredInventory] =
    useState<InventoryItem[]>(inventoryData);

  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    const selectedCategory = searchParams.get("category") || "all";

    setFilteredInventory(
      inventory.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedCategory === "all" || item.category === selectedCategory)
      )
    );
  }, [searchParams, inventory]);

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const updateStock = (id: string, change: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              currentStock: Math.max(
                0,
                Math.min(item.currentStock + change, item.maxStock)
              ),
              lastUpdated: new Date().toISOString(),
            }
          : item
      )
    );

    toast.success(
      `Stock ${change > 0 ? "increased" : "decreased"} successfully.`
    );
  };

  const addProduct = (product: {
    name: string;
    category: string;
    price: number;
    minStock: number;
    maxStock: number;
  }) => {
    const newProduct: InventoryItem = {
      id: crypto.randomUUID(),
      name: product.name,
      category: product.category,
      price: { retail: product.price, wholesale: product.price * 0.8 },
      minStock: product.minStock,
      maxStock: product.maxStock,
      currentStock: 0,
      lastUpdated: new Date().toISOString(),
    };
    setInventory((prev) => [...prev, newProduct]);
    toast.success("Product added successfully");
  };

  return (
    <div className="space-y-4 mt-5">
      <div className="flex items-center gap-4">
        <Select
          onValueChange={(value) => updateSearchParams("category", value)}
          value={searchParams.get("category") || "all"}
        >
          <SelectTrigger className="w-48 shadow-inner">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Search
          placeholder="Search..."
          onSearch={(query) => updateSearchParams("search", query)}
        />
        <AddProductDialog onAddProduct={addProduct} categories={categories} />
      </div>
      <div className="border-b border-gray-100 my-1" />
      <InventoryTable data={filteredInventory} updateStock={updateStock} />
    </div>
  );
}
