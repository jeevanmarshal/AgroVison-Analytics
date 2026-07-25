import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { motion } from 'framer-motion';

export interface HealthGaugeCardProps {
  title: string;
  score: number;
  statusText?: string;
  trendNode?: React.ReactNode;
  className?: string;
}

export const HealthGaugeCard: React.FC<HealthGaugeCardProps> = ({
  title,
  score,
  statusText,
  trendNode,
  className
}) => {
  const data = [{ name: 'Health', value: score, fill: score > 80 ? '#10B981' : score > 50 ? '#F59E0B' : '#EF4444' }]; 

  return (
    <div className={`p-6 flex flex-col min-h-[300px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${className || ''}`}>
      <h3 className="text-sm font-bold text-neutral-900 mb-4">{title}</h3>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 relative flex flex-col items-center justify-center"
      >
        <div className="w-full h-48 absolute top-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart 
              cx="50%" 
              cy="100%" 
              innerRadius="75%" 
              outerRadius="100%" 
              barSize={12} 
              data={data} 
              startAngle={180} 
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: '#F4F4F5' }}
                dataKey="value"
                cornerRadius={10}
                animationDuration={1500}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div className="z-10 mt-20 flex flex-col items-center">
          <span className="text-5xl font-extrabold text-neutral-900 tracking-tight font-mono">{score}</span>
          {statusText && (
            <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 px-2 py-0.5 rounded-md ${
              score > 80 ? 'bg-green-50 text-success' : score > 50 ? 'bg-yellow-50 text-warning' : 'bg-red-50 text-critical'
            }`}>{statusText}</span>
          )}
          {trendNode && (
            <div className="mt-4">
              {trendNode}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
