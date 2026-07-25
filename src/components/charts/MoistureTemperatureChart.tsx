import React, { useState } from 'react';
import { 
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { ChartCard } from '../dashboard/ChartCard';
import { Button } from '../ui/Button';
import { DataPoint } from '../../types/dashboard.types';
import { EmptyState } from '../ui/EmptyState';
import { LineChart as LineChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export interface MoistureTemperatureChartProps {
  moistureData: DataPoint[];
  temperatureData: DataPoint[];
}

export const MoistureTemperatureChart: React.FC<MoistureTemperatureChartProps> = ({ 
  moistureData, 
  temperatureData 
}) => {
  const [timeFilter, setTimeFilter] = useState<'24H' | '7D' | '30D'>('7D');

  if (!moistureData.length || !temperatureData.length) {
    return (
      <ChartCard title="Field Telemetry">
        <EmptyState 
          icon={LineChartIcon} 
          title="No Trend Data" 
          description="Insufficient data available to render the telemetry." 
        />
      </ChartCard>
    );
  }

  const mergedData = moistureData.map((mPoint, i) => {
    const tPoint = temperatureData[i];
    return {
      time: new Date(mPoint.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date(mPoint.timestamp).toLocaleDateString(),
      moisture: mPoint.value,
      temperature: tPoint ? tPoint.value : null
    };
  });

  const filterData = () => {
    if (timeFilter === '24H') return mergedData.slice(-24);
    if (timeFilter === '7D') return mergedData.slice(-24 * 7); 
    return mergedData;
  };

  const chartData = filterData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-xl backdrop-blur-md">
          <p className="text-[10px] uppercase font-bold text-neutral-400 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-3 text-sm mt-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-neutral-500 font-medium w-24">{entry.name}</span>
              <span className="font-extrabold text-neutral-900 font-mono">
                {entry.value}{entry.name === 'Temperature' ? '°C' : '%'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const actions = (
    <div className="flex space-x-1 bg-neutral-50 p-1 rounded-lg border border-black/5">
      {['24H', '7D', '30D'].map((filter) => (
        <Button 
          key={filter}
          variant={timeFilter === filter ? 'outline' : 'ghost'} 
          size="sm" 
          onClick={() => setTimeFilter(filter as any)}
          className={`text-xs px-3 h-7 ${timeFilter === filter ? 'bg-white shadow-sm border-black/5 text-neutral-900 font-bold' : 'text-neutral-500 hover:text-neutral-700 font-medium'}`}
        >
          {filter}
        </Button>
      ))}
    </div>
  );

  return (
    <ChartCard 
      title="Field Telemetry" 
      actions={actions}
      className="h-full flex flex-col"
    >
      <motion.div
        key={timeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full flex-1 h-[400px] mt-4"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 0, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#A1A1AA', fontSize: 10, fontWeight: 500 }} 
              minTickGap={40}
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#3B82F6', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(val) => `${val}%`}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#F59E0B', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(val) => `${val}°C`}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#A1A1AA', strokeWidth: 1, strokeDasharray: '4 4' }} 
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="moisture" 
              name="Moisture" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorMoisture)" 
              strokeWidth={3}
              animationDuration={1000}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="temperature" 
              name="Temperature" 
              stroke="#F59E0B" 
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: '#F59E0B' }}
              strokeWidth={3}
              animationDuration={1000}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </ChartCard>
  );
};
