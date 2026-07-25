import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export type AlertType = 'success' | 'warning' | 'critical' | 'info';

export interface AlertBannerProps {
  type: AlertType;
  title: string;
  message?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  title,
  message,
  dismissible = true,
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  const styles = {
    success: 'border-l-success',
    warning: 'border-l-warning',
    critical: 'border-l-critical',
    info: 'border-l-info',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
    critical: <XCircle className="w-5 h-5 text-critical" />,
    info: <Info className="w-5 h-5 text-info" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cn("p-5 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start space-x-3 border-l-4", styles[type])}
        >
          <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-neutral-900">{title}</h4>
            {message && <p className="text-sm mt-1 text-neutral-600 font-medium leading-relaxed">{message}</p>}
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 rounded-md text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus-visible:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
