import React from 'react';
import { Sparkles, TrendingUp, Droplets } from 'lucide-react';
import { HealthGaugeCard } from './HealthGaugeCard';

export interface HeroSummaryProps {
  farmName: string;
  greeting: string;
  healthScore: number;
  summaryMessage: string;
}

export const HeroSummary: React.FC<HeroSummaryProps> = ({
  healthScore,
  summaryMessage,
}) => {
  const isHealthy = healthScore > 80;
  const isWarning = healthScore > 50 && healthScore <= 80;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {/* 1. Overall Health Gauge */}
      <HealthGaugeCard 
        title="Overall Health" 
        score={healthScore} 
        statusText={isHealthy ? 'Optimal' : isWarning ? 'Needs Attention' : 'Critical'}
        trendNode={
          <div className="flex items-center space-x-1 text-success bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            <TrendingUp className="w-3 h-3" />
            <span className="text-[10px] font-bold text-green-700">+8 pts</span>
          </div>
        }
      />

      {/* 2. AI Mission Brief */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center relative overflow-hidden">
        <div className="flex items-center space-x-2 text-primary mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">AI Mission Brief</span>
        </div>
        
        <p className="text-lg md:text-xl font-medium text-neutral-900 leading-relaxed max-w-sm mb-8">
          {summaryMessage}
        </p>

        <div className="grid grid-cols-3 gap-4 mt-auto">
          <div>
            <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1 tracking-widest">Health</p>
            <p className="text-sm font-extrabold text-neutral-900 font-mono">92</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1 tracking-widest">Moisture</p>
            <p className="text-sm font-extrabold text-neutral-900 font-mono">45%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1 tracking-widest">Prod.</p>
            <p className="text-sm font-extrabold text-neutral-900 font-mono">98%</p>
          </div>
        </div>
      </div>

      {/* 3. Next Critical Action */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Next Action</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-info shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          
          <h3 className="text-xl font-extrabold text-neutral-900 mb-2">Irrigate Field B</h3>
          <p className="text-sm font-medium text-neutral-500 mb-6">
            Soil moisture below optimal range.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400 mb-1 tracking-widest">Priority</span>
              <span className="text-xs font-bold text-critical bg-red-50 px-2 py-0.5 rounded-full inline-block">High</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-neutral-400 mb-1 tracking-widest">ETA</span>
              <span className="text-xs font-extrabold text-neutral-900 font-mono">Today, 8 PM</span>
            </div>
          </div>
        </div>
        
        <button className="w-full py-4 rounded-2xl bg-primary text-white text-sm font-bold hover:shadow-[0_8px_20px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 transition-all">
          Execute Action
        </button>
      </div>
    </section>
  );
};
