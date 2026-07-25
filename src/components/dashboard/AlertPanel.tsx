import React from 'react';
import { AlertTriangle, Info, ShieldAlert, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AlertPanelProps {
  recommendations: any[];
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ recommendations }) => {
  const alerts = recommendations.slice(0, 5);

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col h-full min-h-[300px]">
        <h3 className="text-sm font-bold text-neutral-900 mb-6">Recent Alerts</h3>
        <div className="flex-1 flex items-center justify-center text-sm font-medium text-neutral-400">
          No active alerts.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full overflow-hidden">
      <div className="px-6 py-5 border-b border-black/5 bg-neutral-50/50">
        <h3 className="text-sm font-bold text-neutral-900">Recent Alerts</h3>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {alerts.map((rec, i) => (
          <div key={i} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-2xl transition-colors group cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className={cn(
                "p-2 rounded-xl flex-shrink-0",
                rec.type === 'Action' ? 'bg-red-50 text-critical' : rec.type === 'Monitor' ? 'bg-amber-50 text-warning' : 'bg-blue-50 text-info'
              )}>
                {rec.type === 'Action' ? <ShieldAlert className="w-5 h-5" /> : rec.type === 'Monitor' ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-neutral-900 line-clamp-1">{rec.message}</span>
                <span className="text-xs font-medium text-neutral-400 mt-0.5">2 hours ago</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 opacity-80 group-hover:opacity-100 pl-4">
              <span className={cn(
                "px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest rounded-md whitespace-nowrap",
                rec.type === 'Action' ? 'bg-critical text-white' : rec.type === 'Monitor' ? 'bg-warning text-white' : 'bg-neutral-200 text-neutral-700'
              )}>
                {rec.type === 'Action' ? 'High' : rec.type === 'Monitor' ? 'Med' : 'Low'}
              </span>
              <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
