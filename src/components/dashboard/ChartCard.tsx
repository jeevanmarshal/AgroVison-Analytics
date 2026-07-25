import React from 'react';
import { cn } from '@/utils/cn';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  actions,
  children,
  className
}) => {
  return (
    <div className={cn("p-6 flex flex-col min-h-[350px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]", className)}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
          {subtitle && (
            <p className="text-[11px] font-medium text-neutral-500 mt-1 uppercase tracking-widest">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
      <div className="flex-1 w-full h-full relative">
        {children}
      </div>
    </div>
  );
};
