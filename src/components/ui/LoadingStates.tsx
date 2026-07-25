import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-200/60", className)}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
    <Skeleton className="h-10 w-32" />
    <Skeleton className="h-4 w-48" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col min-h-[350px]">
    <Skeleton className="h-6 w-48 mb-2" />
    <Skeleton className="h-4 w-32 mb-6" />
    <Skeleton className="flex-1 w-full rounded-lg" />
  </div>
);

export const TableSkeleton = () => (
  <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col min-h-[300px]">
    <div className="p-6 border-b border-neutral-100">
      <Skeleton className="h-6 w-40" />
    </div>
    <div className="p-6 flex-1 space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
    <div className="flex-1 pr-8">
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-8 w-64 mb-4" />
      <Skeleton className="h-16 w-full max-w-2xl" />
    </div>
    <div className="mt-8 md:mt-0 flex flex-col items-center justify-center pl-8 md:border-l border-neutral-200">
      <Skeleton className="h-3 w-24 mb-2" />
      <Skeleton className="h-20 w-24" />
    </div>
  </div>
);
