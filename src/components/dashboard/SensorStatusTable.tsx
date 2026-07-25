import React from 'react';
import { cn } from '@/utils/cn';

export interface SensorStatusRow {
  sensor: string;
  value: string | number;
  status: 'Healthy' | 'Warning' | 'Critical';
  lastUpdated: string;
}

export interface SensorStatusTableProps {
  data: SensorStatusRow[];
}

export const SensorStatusTable: React.FC<SensorStatusTableProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="px-6 py-5 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
        <h3 className="text-sm font-bold text-neutral-900">Sensor Status</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="sticky top-0 bg-white z-10 text-neutral-400 text-[10px] uppercase tracking-widest font-bold border-b border-neutral-100">
            <tr>
              <th className="px-6 py-4">Sensor</th>
              <th className="px-6 py-4">Current Value</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 bg-white">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-neutral-50/50 transition-colors group">
                <td className="px-6 py-2.5 font-semibold text-neutral-800 text-sm">{row.sensor}</td>
                <td className="px-6 py-2.5 text-neutral-600 font-medium text-sm font-mono">{row.value}</td>
                <td className="px-6 py-2.5">
                  <span className={cn(
                    "px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md",
                    row.status === 'Healthy' ? 'bg-green-50 text-success' :
                    row.status === 'Warning' ? 'bg-amber-50 text-warning' : 'bg-red-50 text-critical'
                  )}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-2.5 text-neutral-400 text-right font-mono text-xs">{row.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
