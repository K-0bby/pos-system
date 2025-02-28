"use client";
import { SummaryCard } from "@/components/summary-cards";
import { ChartCard } from "@/components/chart-card";
import {
  topProducts,
  marketShare,
  monthlySales,
  inventoryStatus,
  COLORS,
} from "@/lib/dashboard-data";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Revenue"
          value="₵319,000"
          icon="ReceiptCent"
          subtitle="+20.1% from last month"
        />
        <SummaryCard
          title="Total Orders"
          value="3,010"
          icon="TrendingUp"
          subtitle="+15% from last month"
        />
        <SummaryCard
          title="Products"
          value="246"
          icon="Package"
          subtitle="12 low in stock"
        />
        <SummaryCard
          title="Avg. Order Value"
          value="₵106"
          icon="BarChart"
          subtitle="+5% from last month"
        />
      </div>

      {/* Chart Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Products */}
        <ChartCard
          title="Most Purchased Drinks"
          chartType="Bar"
          data={topProducts}
          xAxisKey="name"
          yAxisKeys={["sales"]}
          colors={["#8884d8"]}
        />

        {/* Market Share */}
        <ChartCard
          title="Market Share by Category"
          chartType="Pie"
          data={marketShare}
          pieKey="value"
          colors={COLORS}
        />

        {/* Monthly Sales */}
        <ChartCard
          title="Monthly Revenue & Orders"
          chartType="Bar"
          data={monthlySales}
          xAxisKey="month"
          yAxisKeys={["revenue", "orders"]}
          colors={["#8884d8", "#82ca9d"]}
        />

        {/* Inventory Status */}
        <ChartCard
          title="Inventory Status"
          chartType="Pie"
          data={inventoryStatus}
          pieKey="value"
          colors={COLORS}
        />
      </div>
    </div>
  );
}
