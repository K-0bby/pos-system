"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import {
  monthlySales,
  marketShare,
  topProducts,
  COLORS,
} from "@/lib/reports-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  const filteredMonthlySales = monthlySales.filter(
    (sale: { month: string; revenue: number; orders: number }) => {
      if (timeRange === "month") return true;
      if (timeRange === "week") return sale.month === "Jun";
      if (timeRange === "year") return true;
      return true;
    }
  );

  const downloadReport = (reportType: string) => {
    const data =
      reportType === "sales"
        ? filteredMonthlySales
        : reportType === "category"
        ? marketShare
        : topProducts;

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reportType}-report-${timeRange}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-8 px-4">
      <div className="flex justify-between items-center gap-10">
        <h1 className="text-xl lg:text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <Button variant="outline" onClick={() => downloadReport("sales")}>
            <FileText className="mr-2 h-4 w-4" />
            Sales Report
          </Button>
        </div>
      </div>

      <div className="mb-6 w-[200px]">
        <Select
          value={timeRange}
          onValueChange={(value) =>
            setTimeRange(value as "week" | "month" | "year")
          }
        >
          <SelectTrigger className="shadow-inner">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 shadow-inner">
          <CardHeader>
            <CardTitle>Sales & Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredMonthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1 shadow-inner">
          <CardHeader>
            <CardTitle>Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShare}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}`}
                  >
                    {marketShare.map(
                      (
                        entry: { name: string; value: number },
                        index: number
                      ) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1 shadow-inner">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
