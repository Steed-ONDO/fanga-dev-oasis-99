
import React from 'react';
import { Plus, Download, Upload, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
  const actions = [
    { icon: Plus, label: 'New Project', color: 'bg-blue-600 hover:bg-blue-700' },
    { icon: Download, label: 'Import Project', color: 'bg-green-600 hover:bg-green-700' },
    { icon: Upload, label: 'Export Backup', color: 'bg-purple-600 hover:bg-purple-700' },
    { icon: RefreshCw, label: 'Restart Services', color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              className={`w-full justify-start text-white ${action.color}`}
              size="sm"
            >
              <Icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
