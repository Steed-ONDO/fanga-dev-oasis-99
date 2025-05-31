
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
    <Card className="bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <CardTitle className="text-blue-800 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-emerald-500" />
          Statut des Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.name} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${service.color} animate-pulse`}></div>
                <Icon className="w-5 h-5 text-blue-600" />
                <span className="text-blue-900 font-medium">{service.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="secondary" 
                  className={service.status === 'running' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}
                >
                  {service.status === 'running' ? 'Actif' : 'Arrêté'}
                </Badge>
                <span className="text-sm text-blue-600 min-w-[40px]">
                  {service.port || service.version}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleService(service.name)}
                  className="p-1 h-8 w-8 border-blue-300 hover:bg-blue-100"
                >
                  {service.status === 'running' ? 
                    <Square className="w-3 h-3 text-red-600" /> : 
                    <Play className="w-3 h-3 text-emerald-600" />
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
