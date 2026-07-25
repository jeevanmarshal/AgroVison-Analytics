import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MainContainer } from './MainContainer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-canvas">
      <div className="flex-1 flex flex-col min-h-screen relative w-full overflow-hidden">
        <Header />
        <MainContainer>
          {children}
        </MainContainer>
        <Footer />
      </div>
    </div>
  );
};
