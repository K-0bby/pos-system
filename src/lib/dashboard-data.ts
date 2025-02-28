import { drinks } from "@/lib/data";

// Top Products by Sales
export const topProducts = drinks
  .map((drink) => ({
    name: drink.name,
    sales: drink.qty * drink.price.retail,
  }))
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5); // Top 5 products

// Market Share by Category
export const marketShare = Object.entries(
  drinks.reduce((acc, drink) => {
    acc[drink.category] = (acc[drink.category] || 0) + drink.qty;
    return acc;
  }, {} as Record<string, number>)
).map(([name, value]) => ({ name, value }));

// Monthly Sales (Mocked Data)
export const monthlySales = [
  { month: "Jan", revenue: 45000, orders: 420 },
  { month: "Feb", revenue: 52000, orders: 480 },
  { month: "Mar", revenue: 49000, orders: 460 },
  { month: "Apr", revenue: 58000, orders: 550 },
  { month: "May", revenue: 55000, orders: 520 },
  { month: "Jun", revenue: 60000, orders: 580 },
];

// Inventory Status
export const inventoryStatus = [
  { name: "In Stock", value: drinks.filter((d) => d.qty > 10).length },
  { name: "Low Stock", value: drinks.filter((d) => d.qty > 0 && d.qty <= 10).length },
  { name: "Out of Stock", value: drinks.filter((d) => d.qty === 0).length },
];

// Colors for Pie Charts
export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
