"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Minus, Plus } from "lucide-react";
// import { toast } from "sonner";
import { InventoryItem } from "@/lib/inventory-data";

interface InventoryTableProps {
  data: InventoryItem[];
  updateStock: (id: string, change: number) => void;
}

export default function InventoryTable({ data, updateStock }: InventoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>₵{item.price.retail.toFixed(2)}</TableCell>
            <TableCell>{item.currentStock}</TableCell>
            <TableCell>
              <span
                className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.currentStock > item.minStock ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.currentStock > item.minStock ? "In Stock" : "Low Stock"}
              </span>
            </TableCell>
            <TableCell>{new Date(item.lastUpdated).toLocaleDateString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => updateStock(item.id, -1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => updateStock(item.id, 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
