"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const dates = [
  new Date('2024-01-01'),
  new Date('2024-01-15'),
  new Date('2024-02-01'),
  new Date('2024-02-15'),
  new Date('2024-03-01'),
  new Date('2024-03-15'),
  new Date('2024-04-01'),
];

export function TimeSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedDate = dates[selectedIndex];

  return (
    <div className="flex items-center gap-3 min-w-[280px] bg-card border rounded-md px-3 py-1.5">
      <button 
        type="button" 
        className="p-1 hover:bg-accent hover:text-accent-foreground rounded-md"
      >
        <Calendar className="h-3.5 w-3.5" />
        <span className="sr-only">Calendar</span>
      </button>
      <div className="flex-1">
        <Slider
          value={[selectedIndex]}
          max={dates.length - 1}
          step={1}
          onValueChange={([value]) => setSelectedIndex(value)}
        />
      </div>
      <div className="min-w-[90px] text-sm font-medium">
        {format(selectedDate, 'MMM d, yyyy')}
      </div>
    </div>
  );
}