"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  Layers,
  Upload,
  Calculator,
  Download,
  Settings2,
  Satellite,
  Map,
  CloudRain,
  TreePine,
  Mountain,
  Ruler,
  Brain,
  Leaf,
  Box
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Analysis",
    href: "/analysis",
    icon: LineChart,
  },
  {
    title: "Satellite Data",
    href: "/satellite",
    icon: Satellite,
  },
  {
    title: "Classification",
    href: "/classification",
    icon: Brain,
  },
  {
    title: "Land Cover",
    href: "/land-cover",
    icon: TreePine,
  },
  {
    title: "Carbon Analysis",
    href: "/carbon",
    icon: Leaf,
  },
  {
    title: "LiDAR Viewer",
    href: "/lidar",
    icon: Box,
  },
  {
    title: "Terrain Analysis",
    href: "/terrain",
    icon: Mountain,
  },
  {
    title: "Weather Data",
    href: "/weather",
    icon: CloudRain,
  },
  {
    title: "Vector Layers",
    href: "/vectors",
    icon: Layers,
  },
  {
    title: "Measurements",
    href: "/measurements",
    icon: Ruler,
  },
];

const bottomNavItems = [
  {
    title: "Data Import",
    href: "/import",
    icon: Upload,
  },
  {
    title: "Export Results",
    href: "/export",
    icon: Download,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings2,
  },
];

export function SideNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn(
        "fixed left-0 z-30 h-[calc(100vh-3.5rem)] w-[60px] border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        isExpanded && "w-[200px]"
      )}
    >
      <div className="flex h-full flex-col justify-between py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap opacity-0 transition-opacity duration-300",
                  isExpanded && "opacity-100"
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </nav>

        <nav className="space-y-1 border-t border-border/40 px-2 pt-4">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap opacity-0 transition-opacity duration-300",
                  isExpanded && "opacity-100"
                )}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}