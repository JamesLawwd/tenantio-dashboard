
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', occupancyRate: 80 },
  { month: 'Feb', occupancyRate: 85 },
  { month: 'Mar', occupancyRate: 90 },
  { month: 'Apr', occupancyRate: 92 },
  { month: 'May', occupancyRate: 88 },
  { month: 'Jun', occupancyRate: 93 },
];

const unitTypes = [
  { type: 'One Bedroom', total: 6, occupied: 6, color: '#8B5CF6' },
  { type: 'Two Bedroom', total: 8, occupied: 7, color: '#3B82F6' },
  { type: 'Three Bedroom', total: 4, occupied: 3, color: '#10B981' },
];

export function TenantOccupancyChart() {
  const currentOccupancy = 83;

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Current Occupancy</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold">{currentOccupancy}%</span>
                <div className="bg-green-50 text-green-700 py-1 px-2.5 rounded-md text-xs font-medium">
                  +5% from last month
                </div>
              </div>
              <Progress value={currentOccupancy} className="h-2" />
              <p className="text-sm text-muted-foreground">10 out of 12 units occupied</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-3">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Occupancy Trend</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} />
                  <YAxis 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Occupancy Rate']}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="occupancyRate" 
                    stroke="#8B5CF6" 
                    fillOpacity={1} 
                    fill="url(#colorOcc)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Occupancy by Unit Type</h3>
          <div className="space-y-6">
            {unitTypes.map((unit, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{unit.type}</span>
                  <span className="text-sm text-muted-foreground">{unit.occupied} / {unit.total} units</span>
                </div>
                <Progress 
                  value={(unit.occupied / unit.total) * 100} 
                  className="h-2"
                  style={{ backgroundColor: '#f1f5f9' }}
                  indicatorClassName={`bg-[${unit.color}]`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
