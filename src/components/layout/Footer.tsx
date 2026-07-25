import React from 'react';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 py-6 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>© 2026 AgroVision Analytics. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-neutral-900 transition-colors">Support</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-neutral-900 transition-colors">Privacy</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
