
import React from 'react';
import { Activity, Database, Globe, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ServerStatus = () => {
  const services = [
    { name: 'Apache', icon: Globe, status: 'running', port: '80', color: 'bg-green-500' },
    { name: 'MySQL', icon: Database, status: 'running', port: '3306', color: 'bg-green-500' },
    { name: 'PHP', icon: Code, status: 'running', version: '8.2', color: 'bg-green-500' },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <Activity className="w-5 h-5 mr-2 text-green-500" />
          Server Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div key={service.name} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${service.color}`}></div>
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium">{service.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {service.status}
                </Badge>
                <span className="text-sm text-gray-400">
                  {service.port || service.version}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ServerStatus;
