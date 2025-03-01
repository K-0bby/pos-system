import { drinks } from "@/lib/data";

interface MonthlySalesData {
  month: string;
  revenue: number;
  orders: number;
}


interface MarketShareData {
  name: string;
  value: number;
}

interface TopProductsData {
  name: string;
  sales: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// Data holders
const marketShareMap: Record<string, number> = {};
const monthlySalesData: MonthlySalesData[] = [];

const productSales: TopProductsData[] = [];

// Iterate over drinks and populate data
drinks.forEach((drink, index) => {
  const revenue = drink.qty * drink.price.retail;

  // Monthly sales data
  if (index < MONTHS.length) {
    monthlySalesData.push({
      month: MONTHS[index],
      revenue,
      orders: drink.qty,
    });
  }

  // Weekly sales data (simulate with the same logic)
 
  // Market share data
  marketShareMap[drink.category] = (marketShareMap[drink.category] || 0) + revenue;

  // Top products data
  productSales.push({ name: drink.name, sales: revenue });
});

// Convert market share map to array
const marketShare: MarketShareData[] = Object.entries(marketShareMap).map(([name, value]) => ({ name, value }));

// Sort and select top 5 products
const topProducts: TopProductsData[] = productSales.sort((a, b) => b.sales - a.sales).slice(0, 5);

// Export data
export const monthlySales = monthlySalesData;

export const yearlySales = [
  {
    year: "2023",
    revenue: monthlySalesData.reduce((sum, data) => sum + data.revenue, 0),
    orders: monthlySalesData.reduce((sum, data) => sum + data.orders, 0),
  },
];

export { marketShare, topProducts };

// Colors for charts
export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
