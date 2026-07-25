import React, { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

export interface KPICardProps {
  title: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  status: 'Healthy' | 'Warning' | 'Critical' | 'Neutral';
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit = '',
  icon,
  status,
  trend,
  trendPercentage
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  const statusColors = {
    Healthy: 'text-success bg-green-50',
    Warning: 'text-warning bg-amber-50',
    Critical: 'text-critical bg-red-50',
    Neutral: 'text-neutral-500 bg-neutral-100'
  };

  const sparklineData = [20, 40, 30, 70, 50, 90, 80];
  const sparklineColor = trend === 'down' ? '#EF4444' : '#22C55E';

  return (
    <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group min-h-[140px] h-full relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
      
      <div className="flex justify-between items-center mb-4 z-10 relative">
        <div className="flex items-center space-x-2">
          <div className={cn("p-1.5 rounded-xl", statusColors[status])}>
            {icon}
          </div>
          <span className="text-sm font-semibold text-neutral-600">{title}</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between z-10 relative">
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-extrabold text-neutral-900 tracking-tight font-mono">{displayValue}</span>
          {unit && <span className="text-sm font-bold text-neutral-400">{unit}</span>}
        </div>
        
        {trendPercentage !== undefined && (
          <div className="flex items-center">
            <span className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              trend === 'up' ? 'text-success bg-green-50' : trend === 'down' ? 'text-critical bg-red-50' : 'text-neutral-500 bg-neutral-100'
            )}>
              {trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : ''}{trendPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Tiny sparkline */}
      <div className="absolute bottom-0 left-0 right-0 h-10 opacity-30 group-hover:opacity-60 transition-opacity flex items-end pointer-events-none">
        <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path 
            d={`M0,30 L0,${30 - sparklineData[0]} ${sparklineData.map((d, i) => `L${(i * 100) / (sparklineData.length - 1)},${30 - d}`).join(' ')}`} 
            fill="none" 
            stroke={sparklineColor} 
            strokeWidth="2" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
};
