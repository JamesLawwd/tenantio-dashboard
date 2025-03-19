
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { month: 'Jan', revenue: 420000 },
  { month: 'Feb', revenue: 430000 },
  { month: 'Mar', revenue: 445000 },
  { month: 'Apr', revenue: 450000 },
  { month: 'May', revenue: 450000 },
  { month: 'Jun', revenue: 470000 },
];

export function RevenueChart() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold">KES 2,665,000</p>
          <p className="text-sm text-muted-foreground">Total revenue for the period</p>
        </div>
        <div className="bg-green-50 text-green-700 py-1 px-2.5 rounded-md text-xs font-medium">
          +4.3% from last period
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis 
              tickFormatter={(value) => `KES ${value/1000}k`} 
              tickLine={false} 
              axisLine={false}
              width={80}
            />
            <Tooltip 
              formatter={(value) => [`KES ${value.toLocaleString()}`, 'Revenue']}
              labelFormatter={(label) => `${label}`}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Bar 
              dataKey="revenue" 
              fill="#8B5CF6" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
