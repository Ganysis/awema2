'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { DeviceType, DeviceSwitcherProps } from '@/types/client-selection.types';

const DEVICES = [
  {
    type: 'desktop' as DeviceType,
    label: 'Desktop',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <path d="M2 16h20M8 20h8" />
      </svg>
    )
  },
  {
    type: 'tablet' as DeviceType,
    label: 'Tablet',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    )
  },
  {
    type: 'mobile' as DeviceType,
    label: 'Mobile',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    )
  }
];

export const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  currentDevice,
  onDeviceChange,
  className
}) => {
  return (
    <div className={cn(
      "inline-flex items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
      className
    )}>
      {DEVICES.map(device => (
        <button
          key={device.type}
          onClick={() => onDeviceChange(device.type)}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            currentDevice === device.type
              ? "bg-white text-gray-950 shadow-sm dark:bg-gray-950 dark:text-gray-50"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          )}
          type="button"
          title={`Voir en mode ${device.label}`}
        >
          <span className="mr-2">
            {device.icon}
          </span>
          <span className="hidden sm:inline">
            {device.label}
          </span>
        </button>
      ))}
    </div>
  );
};