import { Farm, Field, DataPoint } from '../types/dashboard.types';
import { getMoistureStatus, getTemperatureStatus, getNStatus, getPStatus, getKStatus, calculateHealthScore, generateRecommendations } from '../utils/sensorUtils';

// Helper to generate time series data
const generateTimeSeries = (baseVal: number, variance: number, hours: number, isTemp: boolean = false): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    let val = baseVal;
    
    if (isTemp) {
      // Simulate diurnal cycle with a sine wave
      const hour = time.getHours();
      val = baseVal + Math.sin((hour - 6) * (Math.PI / 12)) * variance;
    } else {
      // Random walk with mean reversion
      val = baseVal + (Math.random() - 0.5) * variance;
    }
    
    data.push({
      timestamp: time.toISOString(),
      value: Math.round(val * 10) / 10
    });
  }
  return data;
};

const createField = (id: string, name: string, mBase: number, tBase: number, n: number, p: number, k: number): Field => {
  const currentM = mBase + (Math.random() - 0.5) * 5;
  const currentT = tBase + (Math.random() - 0.5) * 3;
  
  const mHistory = generateTimeSeries(mBase, 8, 24 * 7); // 7 days
  const tHistory = generateTimeSeries(tBase, 6, 24 * 7, true);
  
  // Ensure the latest history point matches current exactly
  mHistory[mHistory.length - 1].value = Math.round(currentM * 10) / 10;
  tHistory[tHistory.length - 1].value = Math.round(currentT * 10) / 10;

  const healthScore = calculateHealthScore(currentM, currentT, n, p, k);
  
  const rawRecs = generateRecommendations(currentM, currentT, n, p, k);
  const recommendations = rawRecs.map((r, i) => ({ id: `rec-${id}-${i}`, ...r }));
  
  return {
    id,
    name,
    healthScore,
    soilMoisture: {
      currentValue: Math.round(currentM * 10) / 10,
      status: getMoistureStatus(currentM),
      history: mHistory,
      lastUpdated: new Date().toISOString()
    },
    temperature: {
      currentValue: Math.round(currentT * 10) / 10,
      status: getTemperatureStatus(currentT),
      history: tHistory,
      lastUpdated: new Date().toISOString()
    },
    npk: {
      nitrogen: { value: n, status: getNStatus(n), lastUpdated: new Date().toISOString() },
      phosphorus: { value: p, status: getPStatus(p), lastUpdated: new Date().toISOString() },
      potassium: { value: k, status: getKStatus(k), lastUpdated: new Date().toISOString() }
    },
    alerts: [],
    recommendations
  };
};

export const MOCK_FARMS: Farm[] = [
  {
    id: 'farm-1',
    name: 'North Block Farm',
    overallHealthScore: 87,
    weather: { condition: 'Sunny', temperature: 24 },
    fields: [
      createField('f1-1', 'Sector Alpha', 45, 24, 60, 30, 150),
      createField('f1-2', 'Sector Beta', 28, 26, 45, 25, 120), // Needs water
      createField('f1-3', 'Sector Gamma', 50, 23, 70, 35, 180)
    ]
  },
  {
    id: 'farm-2',
    name: 'East Riverside',
    overallHealthScore: 92,
    weather: { condition: 'Cloudy', temperature: 21 },
    fields: [
      createField('f2-1', 'River Plot 1', 55, 21, 65, 30, 160),
      createField('f2-2', 'River Plot 2', 52, 22, 60, 32, 155)
    ]
  },
  {
    id: 'farm-3',
    name: 'Highland Estates',
    overallHealthScore: 74,
    weather: { condition: 'Clear', temperature: 31 },
    fields: [
      createField('f3-1', 'Hill Top', 18, 33, 30, 15, 90), // Very dry and hot
      createField('f3-2', 'Valley Plot', 35, 28, 55, 25, 140)
    ]
  }
];
