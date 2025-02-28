"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddProductDialogProps {
  onAddProduct: (product: {
    name: string;
    category: string;
    price: number;
    minStock: number;
    maxStock: number;
  }) => void;
  categories: string[];
}

export default function AddProductDialog({
  onAddProduct,
  categories,
}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    minStock: "",
    maxStock: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.price ||
      !formData.minStock ||
      !formData.maxStock
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (parseInt(formData.minStock) > parseInt(formData.maxStock)) {
      toast.error("Minimum stock cannot exceed maximum stock");
      return;
    }

    // Add product
    onAddProduct({
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      minStock: parseInt(formData.minStock),
      maxStock: parseInt(formData.maxStock),
    });

    // Reset form
    setFormData({
      name: "",
      category: "",
      price: "",
      minStock: "",
      maxStock: "",
    });

    setOpen(false);

    // Success message
    toast.success("Product added successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
              value={formData.category}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((cat) => cat !== "Beer")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
              placeholder="Enter price"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minStock">Minimum Stock</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, minStock: e.target.value }))
                }
                placeholder="Min stock"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxStock">Maximum Stock</Label>
              <Input
                id="maxStock"
                type="number"
                value={formData.maxStock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, maxStock: e.target.value }))
                }
                placeholder="Max stock"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
