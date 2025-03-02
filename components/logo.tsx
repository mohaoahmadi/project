"use client";

import { Globe } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="relative flex items-center justify-center w-8 h-8">
        <Globe className="w-6 h-6 text-primary absolute" />
        <Globe className="w-6 h-6 text-primary/20 absolute rotate-45" />
      </div>
      <span className="font-semibold tracking-tight">GeoSense</span>
    </div>
  );
}