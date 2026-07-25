import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  className?: string;
  isPrimary?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options, className, isPrimary }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none hover:bg-neutral-100",
          isOpen && "bg-neutral-100"
        )}
      >
        <span className={cn(
          "text-sm font-semibold text-neutral-900",
          !isPrimary && "text-neutral-600 font-medium"
        )}>
          {selectedOption?.label}
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-neutral-400 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 min-w-[200px] w-max bg-white rounded-xl shadow-[0_12px_40px_rgb(0,0,0,0.12)] border border-neutral-100 py-1.5 z-50 origin-top-left"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-neutral-50 transition-colors focus-visible:outline-none focus-visible:bg-neutral-50 group"
              >
                <span className={cn(
                  "text-sm font-medium",
                  opt.value === value ? "text-primary font-bold" : "text-neutral-700"
                )}>
                  {opt.label}
                </span>
                {opt.value === value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
