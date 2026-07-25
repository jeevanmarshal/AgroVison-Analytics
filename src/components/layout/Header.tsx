import React from 'react';
import { Bell, CloudSun } from 'lucide-react';
import { Container } from '../ui/Container';
import { Dropdown } from '../ui/Dropdown';
import { useDashboard } from '../../features/dashboard/context/DashboardContext';

export const Header: React.FC = () => {
  const { farms, currentFarm, currentField, setFarm, setField } = useDashboard();

  return (
    <header className="sticky top-0 z-50 w-full h-[72px] bg-[var(--background)]/80 backdrop-blur-md border-b border-black/5 flex items-center">
      <Container className="w-full">
        <div className="flex items-center justify-between w-full">
          
          {/* Left: Selectors */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1 lg:space-x-2">
              <Dropdown 
                value={currentFarm.id}
                onChange={(val: string) => setFarm(val)}
                options={farms.map((f: any) => ({ value: f.id, label: f.name }))}
                isPrimary={true}
              />
              <span className="text-neutral-300 font-light">/</span>
              <Dropdown 
                value={currentField?.id || ''}
                onChange={(val: string) => setField(val || null)}
                options={[
                  { value: '', label: 'Sector Alpha' },
                  ...currentFarm.fields.map((f: any) => ({ value: f.id, label: f.name }))
                ]}
                isPrimary={false}
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 hover:bg-neutral-100 rounded-lg transition-colors cursor-default">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-neutral-900">{currentFarm.weather.temperature}°C</span>
            </div>
            
            <div className="w-px h-6 bg-neutral-200 hidden sm:block mx-2"></div>

            <button aria-label="Notifications" className="relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors focus-visible:outline-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-critical rounded-full border-2 border-[var(--background)]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity ml-2">
              <img src="https://i.pravatar.cc/150?u=jd" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
          </div>
          
        </div>
      </Container>
    </header>
  );
};
