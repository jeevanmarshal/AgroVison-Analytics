import React from 'react';
import { cn } from '@/utils/cn';

export interface MainContainerProps extends React.HTMLAttributes<HTMLElement> {}

export const MainContainer = React.forwardRef<HTMLElement, MainContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn('flex-1 w-full flex flex-col', className)}
        {...props}
      >
        {children}
      </main>
    );
  }
);
MainContainer.displayName = 'MainContainer';
