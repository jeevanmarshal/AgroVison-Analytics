import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Farm, Field } from '../../../types/dashboard.types';
import { MOCK_FARMS } from '../../../data/mockData';

type TimeRange = '24H' | '7D' | '30D';

interface DashboardContextType {
  farms: Farm[];
  currentFarm: Farm;
  currentField: Field | null; // null means "All Fields" or Farm level view
  timeRange: TimeRange;
  setFarm: (farmId: string) => void;
  setField: (fieldId: string | null) => void;
  setTimeRange: (range: TimeRange) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farms] = useState<Farm[]>(MOCK_FARMS);
  const [currentFarm, setCurrentFarm] = useState<Farm>(farms[0]);
  const [currentField, setCurrentField] = useState<Field | null>(farms[0].fields[0]);
  const [timeRange, setTimeRange] = useState<TimeRange>('7D');

  const setFarm = (farmId: string) => {
    const farm = farms.find(f => f.id === farmId);
    if (farm) {
      setCurrentFarm(farm);
      setCurrentField(farm.fields[0]); // default to first field
    }
  };

  const setField = (fieldId: string | null) => {
    if (!fieldId) {
      setCurrentField(null);
      return;
    }
    const field = currentFarm.fields.find((f: Field) => f.id === fieldId);
    if (field) {
      setCurrentField(field);
    }
  };

  return (
    <DashboardContext.Provider value={{ farms, currentFarm, currentField, timeRange, setFarm, setField, setTimeRange }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
