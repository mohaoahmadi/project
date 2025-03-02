"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  MapPinned,
  CircleOff,
  TrendingUp,
  Trees,
  Cloud,
  Droplets,
  Mountain,
  Thermometer,
  Sun
} from 'lucide-react';

const data = [
  { date: '2024-01', ndvi: 0.65 },
  { date: '2024-02', ndvi: 0.68 },
  { date: '2024-03', ndvi: 0.72 },
  { date: '2024-04', ndvi: 0.75 },
  { date: '2024-05', ndvi: 0.71 },
];

function TrendIndicator({ value }: { value: number }) {
  if (value > 15) {
    return <ArrowUpIcon className="h-3 w-3 text-emerald-500" />;
  } else if (value < -15) {
    return <ArrowDownIcon className="h-3 w-3 text-red-500" />;
  }
  return <ArrowRightIcon className="h-3 w-3 text-yellow-500" />;
}

function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  change: number; 
  icon: any;
}) {
  return (
    <Card className="bg-card/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-2 px-2.5">
        <CardTitle className="text-xs font-medium">
          <div className="flex items-center gap-1">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            {title}
          </div>
        </CardTitle>
        <TrendIndicator value={change} />
      </CardHeader>
      <CardContent className="pb-2.5 px-2.5">
        <div className="text-sm font-semibold">{value}</div>
        <p className="text-[11px] text-muted-foreground">
          {change > 0 ? '+' : ''}{change}% from last month
        </p>
      </CardContent>
    </Card>
  );
}

export function MetricsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      <MetricCard
        title="Area Coverage"
        value="1,245 km²"
        change={20.1}
        icon={MapPinned}
      />
      <MetricCard
        title="Perimeter"
        value="156 km"
        change={5.2}
        icon={CircleOff}
      />
      <MetricCard
        title="Forest Cover"
        value="487 km²"
        change={-2.3}
        icon={Trees}
      />
      <MetricCard
        title="Cloud Coverage"
        value="15%"
        change={-8.5}
        icon={Cloud}
      />
      <MetricCard
        title="Precipitation"
        value="125 mm"
        change={12.8}
        icon={Droplets}
      />
      <MetricCard
        title="Elevation Range"
        value="850-2340m"
        change={0}
        icon={Mountain}
      />
      <MetricCard
        title="Avg Temperature"
        value="22.5°C"
        change={4.2}
        icon={Thermometer}
      />
      <MetricCard
        title="Solar Radiation"
        value="5.8 kWh/m²"
        change={15.3}
        icon={Sun}
      />
      <Card className="col-span-full bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-2 px-2.5">
          <CardTitle className="text-xs font-medium">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
              NDVI Trend
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2.5 pb-2.5">
          <ResponsiveContainer width="100%" height={90}>
            <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11 }}
                dy={10}
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  fontSize: '11px'
                }}
              />
              <Area
                type="monotone"
                dataKey="ndvi"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}