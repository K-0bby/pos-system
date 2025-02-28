import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Package,
  TrendingUp,
  BarChart as BarChartIcon,
} from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: "DollarSign" | "Package" | "TrendingUp" | "BarChart";
  subtitle: string;
}

export function SummaryCard({
  title,
  value,
  icon,
  subtitle,
}: SummaryCardProps) {
  const IconComponent = {
    DollarSign,
    Package,
    TrendingUp,
    BarChart: BarChartIcon,
  }[icon];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1"> 
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
