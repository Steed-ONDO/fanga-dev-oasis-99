
import React, { useState, useEffect } from 'react';
import { Monitor, HardDrive, Cpu, MemoryStick } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const SystemInfo = () => {
  const [systemStats, setSystemStats] = useState([
    { icon: Cpu, label: 'Utilisation CPU', value: 45, unit: '%', color: 'text-blue-600' },
    { icon: MemoryStick, label: 'Mémoire', value: 62, unit: '%', color: 'text-purple-600' },
    { icon: HardDrive, label: 'Espace Disque', value: 78, unit: '%', color: 'text-orange-600' },
  ]);

  // Simulation de mise à jour des statistiques
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => prev.map(stat => ({
        ...stat,
        value: Math.max(10, Math.min(90, stat.value + (Math.random() - 0.5) * 10))
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <CardTitle className="text-blue-800 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-blue-600" />
          Informations Système
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          const progressColor = stat.value > 80 ? 'bg-red-500' : stat.value > 60 ? 'bg-orange-500' : 'bg-emerald-500';
          
          return (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-blue-800 font-medium">{stat.label}</span>
                </div>
                <span className="text-sm text-blue-900 font-bold">{Math.round(stat.value)}{stat.unit}</span>
              </div>
              <div className="relative">
                <Progress 
                  value={stat.value} 
                  className="h-3 bg-blue-100 rounded-full overflow-hidden"
                />
                <div 
                  className={`absolute top-0 left-0 h-full ${progressColor} rounded-full transition-all duration-500`}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SystemInfo;
