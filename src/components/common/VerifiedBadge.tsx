import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ label = 'Verified Co-op Member', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs ${sizeClasses[size]}`}
      title="Background checked, Aadhaar verified, and trade certified by GigGrid Cooperative Council"
    >
      <ShieldCheck className={`${iconSizes[size]} text-blue-600 shrink-0`} />
      <span>{label}</span>
    </span>
  );
};
