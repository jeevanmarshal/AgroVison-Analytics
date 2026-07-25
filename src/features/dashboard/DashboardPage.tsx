import React, { useMemo, lazy, Suspense } from 'react';
import { useDashboard } from './context/DashboardContext';
import { HeroSummary } from '../../components/dashboard/HeroSummary';
import { KPICard } from '../../components/dashboard/KPICard';
import { SensorStatusTable } from '../../components/dashboard/SensorStatusTable';
import { NutrientPanel } from '../../components/dashboard/NutrientPanel';
import { AlertPanel } from '../../components/dashboard/AlertPanel';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { ChartSkeleton } from '../../components/ui/LoadingStates';

const MoistureTemperatureChart = lazy(() => import('../../components/charts/MoistureTemperatureChart').then(m => ({ default: m.MoistureTemperatureChart })));
import { 
  Activity, Droplets, Thermometer, FlaskConical, AlertTriangle, TrendingUp 
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentFarm, currentField } = useDashboard();
  
  const targetField = currentField || currentFarm.fields[0];
  const hasCriticalAlerts = useMemo(() => targetField.alerts?.some((a: any) => a.type === 'Critical'), [targetField.alerts]);

  const sensorData = useMemo(() => [
    { sensor: 'Soil Moisture', value: `${targetField.soilMoisture.currentValue}%`, status: targetField.soilMoisture.status, lastUpdated: new Date(targetField.soilMoisture.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { sensor: 'Temperature', value: `${targetField.temperature.currentValue}°C`, status: targetField.temperature.status, lastUpdated: new Date(targetField.temperature.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { sensor: 'Nitrogen (N)', value: `${targetField.npk.nitrogen.value} ppm`, status: targetField.npk.nitrogen.status, lastUpdated: new Date(targetField.npk.nitrogen.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { sensor: 'Phosphorus (P)', value: `${targetField.npk.phosphorus.value} ppm`, status: targetField.npk.phosphorus.status, lastUpdated: new Date(targetField.npk.phosphorus.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
    { sensor: 'Potassium (K)', value: `${targetField.npk.potassium.value} ppm`, status: targetField.npk.potassium.status, lastUpdated: new Date(targetField.npk.potassium.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) },
  ], [targetField]);

  const npkScore = useMemo(() => Math.round((targetField.npk.nitrogen.value + targetField.npk.phosphorus.value + targetField.npk.potassium.value) / 3), [targetField.npk]);

  return (
    <div className="flex flex-col space-y-8 pb-12">
      {hasCriticalAlerts && (
        <AlertBanner 
          type="critical" 
          title="Critical Field Alert" 
          message="One or more sensors are reporting critical values. Immediate attention required." 
        />
      )}

      {/* Hero Section */}
      <section className="mb-8">
        <HeroSummary 
          farmName={currentFarm.name}
          greeting={`Your farm is thriving!`}
          healthScore={currentFarm.overallHealthScore}
          summaryMessage={
            targetField.recommendations.length > 0 
              ? targetField.recommendations[0].message
              : "All monitored fields are healthy. Moisture levels are stable."
          }
        />
      </section>

      {/* KPI Ribbon */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            <KPICard 
              title="Moisture" 
              value={targetField.soilMoisture.currentValue} 
              unit="%"
              icon={<Droplets className="w-4 h-4" />} 
              status={targetField.soilMoisture.status}
              trend="down" trendPercentage={5}
            />
            <KPICard 
              title="Temperature" 
              value={targetField.temperature.currentValue} 
              unit="°C"
              icon={<Thermometer className="w-4 h-4" />} 
              status={targetField.temperature.status}
              trend="up" trendPercentage={1}
            />
            <KPICard 
              title="NPK Score" 
              value={npkScore} 
              unit="ppm"
              icon={<FlaskConical className="w-4 h-4" />} 
              status={targetField.npk.nitrogen.status === 'Critical' || targetField.npk.phosphorus.status === 'Critical' ? 'Critical' : 'Healthy'}
              trend="up" trendPercentage={3}
            />
            <KPICard 
              title="Alerts" 
              value={targetField.recommendations.filter((r: any) => r.type === 'Action').length} 
              icon={<AlertTriangle className="w-4 h-4" />} 
              status={targetField.recommendations.filter((r: any) => r.type === 'Action').length > 0 ? 'Critical' : 'Healthy'}
            />
            <KPICard 
              title="Efficiency" 
              value={94} 
              unit="%"
              icon={<Activity className="w-4 h-4" />} 
              status="Healthy"
              trend="up" trendPercentage={2}
            />
            <KPICard 
              title="Weekly Trend" 
              value={85} 
              unit="pts"
              icon={<TrendingUp className="w-4 h-4" />} 
              status="Healthy"
              trend="up" trendPercentage={12}
            />
          </div>
      </section>

      {/* Analytics Workspace */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Telemetry Chart occupies majority */}
        <div className="lg:col-span-2 flex flex-col min-h-[500px]">
          <Suspense fallback={<ChartSkeleton />}>
            <MoistureTemperatureChart 
              moistureData={targetField.soilMoisture.history} 
              temperatureData={targetField.temperature.history} 
            />
          </Suspense>
        </div>
        
        {/* Nutrient Panel occupies remaining space */}
        <div className="lg:col-span-1 flex flex-col min-h-[500px]">
          <NutrientPanel npk={targetField.npk} />
        </div>
      </section>

      {/* Alerts and Sensor Status */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AlertPanel recommendations={targetField.recommendations} />
        </div>
        <div className="lg:col-span-2">
          <SensorStatusTable data={sensorData} />
        </div>
      </section>
    </div>
  );
};
