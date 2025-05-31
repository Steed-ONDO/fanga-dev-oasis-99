
import React from 'react';
import { ExternalLink, Settings, Trash2, Folder } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  name: string;
  path: string;
  type: string;
  status: 'active' | 'inactive';
  url: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, path, type, status, url }) => {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Folder className="w-4 h-4 mr-2 text-blue-400" />
            {name}
          </CardTitle>
          <Badge 
            variant={status === 'active' ? 'default' : 'secondary'} 
            className={status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Type: {type}</p>
          <p className="text-sm text-gray-400 truncate">Path: {path}</p>
          <p className="text-sm text-gray-400">URL: {url}</p>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            <ExternalLink className="w-3 h-3 mr-1" />
            Open
          </Button>
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Settings className="w-3 h-3 mr-1" />
            Config
          </Button>
          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
