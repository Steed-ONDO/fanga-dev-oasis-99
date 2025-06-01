
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
    <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-t-lg border-b border-slate-700/30">
        <CardTitle className="text-white flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-cyan-400" />
          Informations Système
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {systemStats.map((stat) => {
          const Icon = stat.icon;
          const progressColor = stat.value > 80 ? 'from-red-500 to-red-600' : stat.value > 60 ? 'from-orange-500 to-orange-600' : 'from-emerald-500 to-emerald-600';
          
          return (
            <div key={stat.label} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm text-slate-300 font-medium">{stat.label}</span>
                </div>
                <span className="text-sm text-white font-bold bg-slate-800/50 px-2 py-1 rounded-lg">
                  {Math.round(stat.value)}{stat.unit}
                </span>
              </div>
              <div className="relative">
                <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SystemInfo;
