import { SensorStatus } from '../types/dashboard.types';

export const getSensorStatus = (value: number, safeMin: number, safeMax: number, warnMin: number, warnMax: number): SensorStatus => {
  if (value >= safeMin && value <= safeMax) return 'Healthy';
  if (value >= warnMin && value <= warnMax) return 'Warning';
  return 'Critical';
};

export const getMoistureStatus = (value: number): SensorStatus => {
  // Safe: 30-60%, Warning: 20-30% or 60-70%, Critical: <20% or >70%
  return getSensorStatus(value, 30, 60, 20, 70);
};

export const getTemperatureStatus = (value: number): SensorStatus => {
  // Safe: 18-30°C, Warning: 10-18°C or 30-38°C, Critical: <10°C or >38°C
  return getSensorStatus(value, 18, 30, 10, 38);
};

export const getNStatus = (value: number): SensorStatus => getSensorStatus(value, 40, 80, 20, 100);
export const getPStatus = (value: number): SensorStatus => getSensorStatus(value, 20, 40, 10, 50);
export const getKStatus = (value: number): SensorStatus => getSensorStatus(value, 100, 200, 60, 250);

export const calculateHealthScore = (moisture: number, temp: number, n: number, p: number, k: number): number => {
  let score = 100;
  
  if (getMoistureStatus(moisture) === 'Warning') score -= 10;
  if (getMoistureStatus(moisture) === 'Critical') score -= 25;
  
  if (getTemperatureStatus(temp) === 'Warning') score -= 5;
  if (getTemperatureStatus(temp) === 'Critical') score -= 15;
  
  const nStatus = getNStatus(n);
  const pStatus = getPStatus(p);
  const kStatus = getKStatus(k);
  
  if (nStatus === 'Warning') score -= 5;
  if (nStatus === 'Critical') score -= 15;
  if (pStatus === 'Warning') score -= 5;
  if (pStatus === 'Critical') score -= 15;
  if (kStatus === 'Warning') score -= 5;
  if (kStatus === 'Critical') score -= 15;
  
  return Math.max(0, Math.min(100, score));
};

export const generateRecommendations = (moisture: number, temp: number, n: number, p: number, k: number): { type: 'Action' | 'Monitor' | 'Info', message: string }[] => {
  const recs: { type: 'Action' | 'Monitor' | 'Info', message: string }[] = [];
  
  const mStatus = getMoistureStatus(moisture);
  if (mStatus === 'Critical' && moisture < 20) recs.push({ type: 'Action', message: 'Immediate irrigation required. Moisture is critically low.' });
  else if (mStatus === 'Warning' && moisture < 30) recs.push({ type: 'Monitor', message: 'Plan irrigation within 48 hours.' });
  else if (mStatus === 'Healthy') recs.push({ type: 'Info', message: 'Soil moisture is optimal.' });

  const tStatus = getTemperatureStatus(temp);
  if (tStatus === 'Critical' && temp > 38) recs.push({ type: 'Action', message: 'Extreme heat warning. Consider deploying shade nets.' });
  
  if (getNStatus(n) === 'Critical' || getPStatus(p) === 'Critical' || getKStatus(k) === 'Critical') {
    recs.push({ type: 'Action', message: 'Severe nutrient deficiency detected. Apply specialized fertilizer immediately.' });
  } else if (getNStatus(n) === 'Warning') {
    recs.push({ type: 'Monitor', message: 'Nitrogen levels are slightly below optimal. Monitor closely.' });
  } else if (mStatus === 'Healthy' && tStatus === 'Healthy' && getNStatus(n) === 'Healthy' && getPStatus(p) === 'Healthy' && getKStatus(k) === 'Healthy') {
    recs.push({ type: 'Info', message: 'All systems are operating within optimal parameters.' });
  }

  return recs;
};
