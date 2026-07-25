import React from 'react';
import { cn } from '@/utils/cn';

interface NutrientProps {
  npk: any;
}

export const NutrientPanel: React.FC<NutrientProps> = ({ npk }) => {
  const nutrients = [
    { name: 'Nitrogen', value: npk.nitrogen.value, target: 120, color: 'bg-primary' },
    { name: 'Phosphorus', value: npk.phosphorus.value, target: 80, color: 'bg-amber-500' },
    { name: 'Potassium', value: npk.potassium.value, target: 100, color: 'bg-blue-500' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col h-full min-h-[400px]">
      <h3 className="text-sm font-bold text-neutral-900 mb-6">Nutrient Levels</h3>
      <div className="flex-1 flex flex-col justify-around">
        {nutrients.map((n) => {
          const maxScale = Math.max(n.value, n.target) * 1.2;
          const progress = (n.value / maxScale) * 100;
          const targetPos = (n.target / maxScale) * 100;
          
          return (
            <div key={n.name} className="flex flex-col mb-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-neutral-600">{n.name}</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg font-extrabold text-neutral-900 font-mono">{n.value}</span>
                  <span className="text-xs text-neutral-400 font-bold">/ {n.target} ppm</span>
                </div>
              </div>
              <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden relative">
                <div 
                  className={cn("h-full rounded-full transition-all duration-1000", n.color)}
                  style={{ width: `${progress}%` }}
                />
                {/* Target marker */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-neutral-400 z-10" 
                  style={{ left: `${targetPos}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
