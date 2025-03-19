
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', maintenance: 35000, utilities: 25000, administrative: 18000 },
  { month: 'Feb', maintenance: 28000, utilities: 22000, administrative: 15000 },
  { month: 'Mar', maintenance: 42000, utilities: 28000, administrative: 16000 },
  { month: 'Apr', maintenance: 31000, utilities: 24000, administrative: 19000 },
  { month: 'May', maintenance: 38000, utilities: 27000, administrative: 17000 },
  { month: 'Jun', maintenance: 33000, utilities: 26000, administrative: 16000 },
];

export function MonthlyExpensesChart() {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-lg font-medium">Total Expenses</p>
          <p className="text-3xl font-bold">KES 464,000</p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Maintenance</p>
            <p className="text-lg font-semibold">KES 207,000</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Utilities</p>
            <p className="text-lg font-semibold">KES 152,000</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Administrative</p>
            <p className="text-lg font-semibold">KES 105,000</p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} />
            <YAxis 
              tickFormatter={(value) => `KES ${value/1000}k`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              formatter={(value) => [`KES ${value.toLocaleString()}`, '']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="maintenance" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="utilities" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="administrative" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
