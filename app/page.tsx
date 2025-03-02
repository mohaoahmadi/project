"use client";

import dynamic from 'next/dynamic';
import { MetricsPanel } from '@/components/metrics-panel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeSlider } from '@/components/time-slider';

const MapComponent = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-muted rounded-lg">
      Loading map...
    </div>
  ),
});

export default function Home() {
  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="h-full">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="max-w-[1080px] mx-auto w-full p-3">
              <div className="space-y-3">
                <Card className="border-border/40 relative">
                  <CardHeader className="border-b py-1.5 px-3 relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <Tabs defaultValue="overview" className="flex-shrink-0">
                        <TabsList className="h-7">
                          <TabsTrigger value="overview" className="text-[13px]">Overview</TabsTrigger>
                          <TabsTrigger value="analytics" className="text-[13px]">Analytics</TabsTrigger>
                          <TabsTrigger value="reports" className="text-[13px]">Reports</TabsTrigger>
                          <TabsTrigger value="notifications" className="text-[13px]">Notifications</TabsTrigger>
                        </TabsList>
                      </Tabs>
                      <TimeSlider />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 relative">
                    <div className="h-[450px] w-full relative">
                      <MapComponent />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border/40 relative z-10">
                  <CardContent className="p-3">
                    <MetricsPanel />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}