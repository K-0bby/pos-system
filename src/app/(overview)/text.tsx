
import React from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import CheckoutSection from '@/components/CheckoutSection';
import { Category, Product, SaleMode, ViewMode } from '@/types/product';
import { Grid, List, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Lager',
    category: 'Beer',
    price: {
      retail: 4.99,
      wholesale: 3.99
    },
    inStock: true,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500'
  },
  {
    id: '2',
    name: 'Red Wine',
    category: 'Wine & Spirit',
    price: {
      retail: 24.99,
      wholesale: 19.99
    },
    inStock: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500'
  },
  {
    id: '3',
    name: 'Cola',
    category: 'Soft Drinks',
    price: {
      retail: 1.99,
      wholesale: 1.49
    },
    inStock: false,
    image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?w=500'
  }
];

const categories: Category[] = ['All', 'Beer', 'Wine & Spirit', 'Tots', 'Soft Drinks', 'Others'];

const Index = () => {
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');
  const [saleMode, setSaleMode] = React.useState<SaleMode>('retail');
  const [selectedCategory, setSelectedCategory] = React.useState<Category>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const { dispatch } = useCart();

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search drinks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === 'grid' ? "bg-white shadow-sm" : "hover:bg-white/50"
                    )}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-2 rounded-md transition-colors",
                      viewMode === 'list' ? "bg-white shadow-sm" : "hover:bg-white/50"
                    )}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>

                <select
                  value={saleMode}
                  onChange={(e) => setSaleMode(e.target.value as SaleMode)}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary/20"
                >
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                </select>
              </div>
            </div>

            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-secondary text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={cn(
                "grid gap-6",
                viewMode === 'grid'
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                  : "grid-cols-1"
              )}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative group"
                  onClick={() => product.inStock && handleAddToCart(product)}
                >
                  <ProductCard
                    product={product}
                    saleMode={saleMode}
                    viewMode={viewMode}
                  />
                  {product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-secondary px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                        Add to Cart
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <CheckoutSection />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;







import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Minus, Receipt } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { SaleMode } from '@/types/product';
import { useToast } from "@/hooks/use-toast";

const CheckoutSection = ({ saleMode }: { saleMode: SaleMode }) => {
  const { state, dispatch } = useCart();
  const [selectedTable, setSelectedTable] = useState('');
  const [salesType, setSalesType] = useState<'Wholesale' | 'Retail'>('Retail');
  const { toast } = useToast();

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = salesType === 'Wholesale' ? item.price.wholesale : item.price.retail;
      return total + (price * item.quantity);
    }, 0);
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleSalesTypeChange = (type: 'Wholesale' | 'Retail') => {
    setSalesType(type);
    toast({
      title: "Sales Type Changed",
      description: `Switched to ${type} pricing`,
    });
  };

  const clearTables = () => {
    setSelectedTable('');
    toast({
      title: "Tables Cleared",
      description: "All table selections have been cleared",
    });
  };

  const handleAddOne = (id: string) => {
    const item = state.items.find(item => item.id === id);
    if (item) {
      dispatch({ type: 'ADD_ITEM', payload: item });
    }
  };

  const handleRemoveOne = (id: string) => {
    dispatch({ type: 'REMOVE_ONE', payload: id });
  };

  const handleCheckout = () => {
    // Generate receipt
    const receipt = `
====== RECEIPT ======
Table: ${selectedTable}
Type: ${salesType}
-------------------
${state.items.map(item => `
${item.name}
Qty: ${item.quantity} x $${(salesType === 'Wholesale' ? item.price.wholesale : item.price.retail).toFixed(2)}
Subtotal: $${(item.quantity * (salesType === 'Wholesale' ? item.price.wholesale : item.price.retail)).toFixed(2)}
`).join('\n')}
-------------------
Total: $${calculateTotal().toFixed(2)}
===================
    `;
    
    console.log(receipt);
    
    toast({
      title: "Order Complete",
      description: "Receipt has been printed to console",
    });
    
    clearCart();
    setSelectedTable('');
  };

  return (
    <div className="mt-3 w-full xl:w-[360px] flex flex-col justify-between rounded pr-10 mx-auto">
      {/* Wholesale/Retail Info Card */}
      <div className={`${salesType === 'Wholesale' ? 'bg-blue-500' : 'bg-orange-500'} text-white p-6 rounded`}>
        <h1 className="text-white/80 font-extrabold text-4xl mb-3">
          {salesType}
        </h1>
        <p className="py-3">
          All prices are switched to {salesType.toLowerCase()}.
        </p>

        {/* Toggle Link */}
        <Link 
          to="/" 
          className={`block text-center ${
            salesType === 'Wholesale' ? 'bg-blue-700' : 'bg-orange-700'
          } py-2 rounded mt-4`}
        >
          View {salesType === 'Wholesale' ? 'retail' : 'wholesale'} sales
          <ArrowRight className="w-4 h-4 ml-2 inline" />
        </Link>
      </div>

      {/* Sales Type and Table Controls */}
      <div className="mt-8 space-y-6">
        {/* Sales Type Switcher */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-700">Sales Type:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleSalesTypeChange('Wholesale')}
              className={`px-3 py-1 rounded text-white transition-colors ${
                salesType === 'Wholesale' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              Wholesale
            </button>
            <button
              onClick={() => handleSalesTypeChange('Retail')}
              className={`px-3 py-1 rounded text-white transition-colors ${
                salesType === 'Retail' ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              Retail
            </button>
          </div>
        </div>

        {/* Clear Tables Button */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-700">Tables:</span>
          <Button
            variant="destructive"
            onClick={clearTables}
            size="sm"
          >
            Clear Tables
          </Button>
        </div>

        {/* Table Selection */}
        <div>
          <select
            id="tables"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full bg-white outline-none"
          >
            <option value="">Select Table</option>
            <option value="table1">Table 1</option>
            <option value="table2">Table 2</option>
            <option value="table3">Table 3</option>
            <option value="table4">Table 4</option>
          </select>
        </div>

        {/* Cart Items */}
        <Card>
          <CardHeader>
            <CardTitle>Cart Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.items.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No items in cart
              </p>
            ) : (
              <>
                {state.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveOne(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddOne(item.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="min-w-[80px] text-right">
                        ${((salesType === 'Wholesale' ? item.price.wholesale : item.price.retail) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          <Button 
            className="flex-1"
            disabled={state.items.length === 0 || !selectedTable}
            onClick={handleCheckout}
          >
            <Receipt className="mr-2 h-4 w-4" />
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;