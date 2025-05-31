
import React from 'react';
import { Monitor, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SystemInfo = () => {
  const systemStats = [
    { icon: Cpu, label: 'CPU Usage', value: 45, unit: '%' },
    { icon: MemoryStick, label: 'Memory', value: 62, unit: '%' },
    { icon: HardDrive, label: 'Disk Space', value: 78, unit: '%' },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-blue-400" />
          System Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{stat.label}</span>
                </div>
                <span className="text-sm text-white">{stat.value}{stat.unit}</span>
              </div>
              <Progress 
                value={stat.value} 
                className="h-2 bg-gray-700"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SystemInfo;
