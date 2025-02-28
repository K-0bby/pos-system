import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

type BarChartData = Record<string, string | number>;

type PieChartData = {
  name: string;
  value: number;
};

interface ChartCardProps {
  title: string;
  chartType: "Bar" | "Pie";
  data: BarChartData[] | PieChartData[];
  xAxisKey?: string; // For BarChart
  yAxisKeys?: string[]; // For BarChart
  pieKey?: string; // For PieChart
  colors?: string[]; // For PieChart
}

export function ChartCard({
  title,
  chartType,
  data,
  xAxisKey,
  yAxisKeys,
  pieKey,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"],
}: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "Bar" && xAxisKey && yAxisKeys ? (
              <BarChart data={data as BarChartData[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />
                {yAxisKeys.map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </BarChart>
            ) : chartType === "Pie" && pieKey ? (
              <PieChart>
                <Pie
                  data={data as PieChartData[]}
                  dataKey={pieKey}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({
                    name,
                    percent,
                  }: PieChartData & { percent: number }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                >
                  {(data as PieChartData[]).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : (
              <div>No chart data available</div>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
