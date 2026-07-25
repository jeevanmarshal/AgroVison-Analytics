export type SensorStatus = 'Healthy' | 'Warning' | 'Critical';

export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface SoilMoisture {
  currentValue: number; // percentage
  status: SensorStatus;
  history: DataPoint[];
  lastUpdated: string;
}

export interface Temperature {
  currentValue: number; // Celsius
  status: SensorStatus;
  history: DataPoint[];
  lastUpdated: string;
}

export interface NPKValue {
  value: number; // ppm
  status: SensorStatus;
  lastUpdated: string;
}

export interface NPK {
  nitrogen: NPKValue;
  phosphorus: NPKValue;
  potassium: NPKValue;
}

export interface Weather {
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Clear';
  temperature: number; // Celsius
}

export interface Alert {
  id: string;
  type: SensorStatus;
  message: string;
  timestamp: string;
}

export interface Recommendation {
  id: string;
  type: 'Action' | 'Monitor' | 'Info';
  message: string;
}

export interface Field {
  id: string;
  name: string;
  healthScore: number;
  soilMoisture: SoilMoisture;
  temperature: Temperature;
  npk: NPK;
  alerts: Alert[];
  recommendations: Recommendation[];
}

export interface Farm {
  id: string;
  name: string;
  overallHealthScore: number;
  weather: Weather;
  fields: Field[];
}

export interface KPICardData {
  title: string;
  value: string | number;
  status: SensorStatus;
  trend?: 'up' | 'down' | 'stable';
  icon: string;
}
