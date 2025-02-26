"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Receipt, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function Cart() {
  const { state, dispatch } = useCart();
  const [salesType, setSalesType] = useState<"Wholesale" | "Retail">("Retail");
  const [selectedTable, setSelectedTable] = useState<string>("Take Away Order");
  const [discount, setDiscount] = useState<number>(0);

  const calculateTotal = (): number => {
    return state.items.reduce((total, item) => {
      const price =
        salesType === "Wholesale" ? item.price.wholesale : item.price.retail;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateDiscountedPrice = (): string => {
    const total = calculateTotal();
    return (total - (total * discount) / 100).toFixed(2);
  };

  const handleSalesTypeChange = (type: "Wholesale" | "Retail") => {
    setSalesType(type);
    toast.success(`Switched to ${type} pricing`);
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart has been cleared");
  };

  const handleAddOne = (id: string) => {
    const item = state.items.find((item) => item.id === id);
    if (item) {
      if (item.qty > 0) {
        dispatch({ type: "ADD_ITEM", payload: item });
        item.qty -= 1; // Reduce available stock
        toast.success(`${item.name} added to cart`);
      } else {
        toast.error(`${item.name} is out of stock`);
      }
    }
  };

  const handleRemoveOne = (id: string) => {
    const item = state.items.find((item) => item.id === id);
    if (item) {
      dispatch({ type: "REMOVE_ONE", payload: id });
      item.qty += 1; // Restock quantity
      toast.success(`${item.name} removed from cart`);
    }
  };

  const handleRemoveItem = (id: string) => {
    const item = state.items.find((item) => item.id === id);
    if (item) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
      item.qty += item.quantity; // Restock all removed quantity
      toast.success(`${item.name} removed from cart`);
    }
  };

  const handleCheckout = () => {
    const receipt = `
====== RECEIPT ======
${selectedTable ? `Table: ${selectedTable}` : "Take Away Order"}
Type: ${salesType}
-------------------
${state.items
  .map(
    (item) => `${item.name}
Qty: ${item.quantity} x GH₵ ${(salesType === "Wholesale"
      ? item.price.wholesale
      : item.price.retail
    ).toFixed(2)}
Subtotal: GH₵ ${(
      item.quantity *
      (salesType === "Wholesale" ? item.price.wholesale : item.price.retail)
    ).toFixed(2)}
`
  )
  .join("")}
-------------------
Discount: ${discount}%
Total: GH₵ ${calculateDiscountedPrice()}
===================
    `;

    console.log(receipt);
    toast.success("Receipt has been generated");
    clearCart();
    setSelectedTable("Take Away Order");
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="sm:col-span-2 lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cart Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between flex-wrap gap-4">
                <span className="font-bold">Sales Type:</span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSalesTypeChange("Wholesale")}
                    variant={salesType === "Wholesale" ? "default" : "outline"}
                  >
                    Wholesale
                  </Button>
                  <Button
                    onClick={() => handleSalesTypeChange("Retail")}
                    variant={salesType === "Retail" ? "default" : "outline"}
                  >
                    Retail
                  </Button>
                </div>
              </div>

              <div className="flex justify-between flex-wrap gap-4">
                <label className="font-bold" htmlFor="tables">
                  Table:
                </label>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="w-full sm:w-1/2">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tables</SelectLabel>
                      <SelectItem value="Take Away Order">
                        Take Away Order
                      </SelectItem>
                      <SelectItem value="table1">Table 1</SelectItem>
                      <SelectItem value="table2">Table 2</SelectItem>
                      <SelectItem value="table3">Table 3</SelectItem>
                      <SelectItem value="table4">Table 4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between flex-wrap gap-4">
                <span className="font-bold">Discount:</span>
                <Select
                  value={discount.toString()}
                  onValueChange={(value) => setDiscount(Number(value))}
                >
                  <SelectTrigger className="w-full sm:w-1/2">
                    <SelectValue placeholder="Select Discount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Discounts</SelectLabel>
                      <SelectItem value="0">0%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="10">10%</SelectItem>
                      <SelectItem value="15">15%</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 h-[200px] overflow-y-auto">
            {state.items.length === 0 ? (
              <p className="text-center">No items in cart</p>
            ) : (
              state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      GH₵{" "}
                      {(salesType === "Wholesale"
                        ? item.price.wholesale
                        : item.price.retail
                      ).toFixed(2)}{" "}
                      each
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-md border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveOne(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (item.qty === 0) {
                            toast.error(`${item.name} is out of stock`);
                          } else {
                            handleAddOne(item.id);
                          }
                        }}
                        className={`h-8 w-8 p-0 ${
                          item.qty === 0 ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        disabled={item.qty === 0}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="font-bold">Total:</span>
              <span>GH₵ {calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Discounted Total:</span>
              <span>GH₵ {calculateDiscountedPrice()}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={clearCart}
            disabled={state.items.length === 0}
          >
            Clear Cart
          </Button>
          <Button
            className="flex-1"
            onClick={handleCheckout}
            disabled={state.items.length === 0}
          >
            <Receipt className="mr-2 h-4 w-4" /> Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
