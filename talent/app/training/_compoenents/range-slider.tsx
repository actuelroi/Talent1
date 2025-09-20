// src/components/ui/range-slider.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface RangeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function RangeSlider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  ...props
}: RangeSliderProps) {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minValue = parseInt(e.target.value);
    onValueChange([Math.min(minValue, value[1]), value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxValue = parseInt(e.target.value);
    onValueChange([value[0], Math.max(maxValue, value[0])]);
  };

  return (
    <div className={cn('space-y-4', className)} {...props}>
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="min-range" className="block text-sm font-medium text-gray-700 mb-1">
            Min: {value[0]} €
          </label>
          <input
            id="min-range"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={handleMinChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="max-range" className="block text-sm font-medium text-gray-700 mb-1">
            Max: {value[1]} €
          </label>
          <input
            id="max-range"
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={handleMaxChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{min} €</span>
        <span>{max} €</span>
      </div>
    </div>
  );
}