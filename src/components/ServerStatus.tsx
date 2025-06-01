
import React, { useState } from 'react';
import { Activity, Database, Globe, Code, Play, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ServerStatus = () => {
  const { toast } = useToast();
  const [services, setServices] = useState([
    { name: 'Apache', icon: Globe, status: 'running', port: '80', color: 'bg-emerald-500' },
    { name: 'MySQL', icon: Database, status: 'running', port: '3306', color: 'bg-emerald-500' },
    { name: 'PHP', icon: Code, status: 'running', version: '8.2', color: 'bg-emerald-500' },
  ]);

  const toggleService = (serviceName: string) => {
    setServices(prev => prev.map(service => {
      if (service.name === serviceName) {
        const newStatus = service.status === 'running' ? 'stopped' : 'running';
        const newColor = newStatus === 'running' ? 'bg-emerald-500' : 'bg-red-500';
        
        toast({
          title: `Service ${serviceName}`,
          description: `${serviceName} ${newStatus === 'running' ? 'démarré' : 'arrêté'} avec succès`,
          duration: 3000,
        });
        
        return { ...service, status: newStatus, color: newColor };
      }
      return service;
    }));
  };

  return (
    <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
      <CardHeader className="pb-3 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-t-lg border-b border-slate-700/30">
        <CardTitle className="text-white flex items-center">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-3"></div>
          <Activity className="w-5 h-5 mr-2 text-emerald-400" />
          Statut des Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.name} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 group/item">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${service.color} animate-pulse shadow-lg`}></div>
                <Icon className="w-5 h-5 text-slate-300 group-hover/item:text-white transition-colors duration-200" />
                <span className="text-white font-medium group-hover/item:text-blue-300 transition-colors duration-200">{service.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="secondary" 
                  className={service.status === 'running' ? 
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 
                    'bg-red-500/20 text-red-300 border border-red-500/30'
                  }
                >
                  {service.status === 'running' ? 'Actif' : 'Arrêté'}
                </Badge>
                <span className="text-sm text-slate-400 min-w-[40px] font-mono">
                  {service.port || service.version}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleService(service.name)}
                  className="p-1 h-8 w-8 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200"
                >
                  {service.status === 'running' ? 
                    <Square className="w-3 h-3 text-red-400" /> : 
                    <Play className="w-3 h-3 text-emerald-400" />
                  }
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ServerStatus;
