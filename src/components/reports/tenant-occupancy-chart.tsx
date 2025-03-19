
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Sample data for the tenant occupancy chart
const occupancyData = [
  { property: 'Sunflower Apartments', occupancy: 85, vacant: 15, color: '#10B981' },
  { property: 'The Palms Estate', occupancy: 92, vacant: 8, color: '#8B5CF6' },
  { property: 'Greenview Heights', occupancy: 78, vacant: 22, color: '#3B82F6' },
  { property: 'Riverside Towers', occupancy: 88, vacant: 12, color: '#F59E0B' },
];

// Data for turnover rates
const turnoverData = [
  { month: 'Jan', rate: 5 },
  { month: 'Feb', rate: 3 },
  { month: 'Mar', rate: 7 },
  { month: 'Apr', rate: 2 },
  { month: 'May', rate: 4 },
  { month: 'Jun', rate: 6 },
];

// Custom tooltip for the bar chart
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="font-medium">{payload[0].payload.property}</p>
        <p className="text-emerald-500">Occupancy: {payload[0].value}%</p>
        <p className="text-red-500">Vacant: {payload[0].payload.vacant}%</p>
      </div>
    );
  }

  return null;
};

export function TenantOccupancyChart() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-4">Current Occupancy by Property</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupancyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="property" 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => value.split(' ')[0]}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="occupancy" radius={[4, 4, 0, 0]}>
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-4">Tenant Turnover Rate (Last 6 Months)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={turnoverData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis 
                  tickFormatter={(value) => `${value}%`} 
                  domain={[0, 10]} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Turnover Rate']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Bar dataKey="rate" fill="#F87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Overall Portfolio Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {occupancyData.map((property, index) => (
            <div key={index} className="bg-card rounded-lg p-4 border">
              <h4 className="text-sm font-medium mb-2">{property.property}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Occupancy</span>
                  <span className="font-medium">{property.occupancy}%</span>
                </div>
                <Progress 
                  value={property.occupancy} 
                  className="h-2" 
                  style={{ backgroundColor: "#f1f5f9" }}
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                  <span>{property.occupancy < 80 ? 'Below Target' : 'On Target'}</span>
                  <span>{property.vacant}% vacant units</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
