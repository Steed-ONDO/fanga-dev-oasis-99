
import React from 'react';
import { ExternalLink, Settings, Trash2, Folder, Play, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ProjectCardProps {
  id: number;
  name: string;
  path: string;
  type: string;
  status: 'active' | 'inactive';
  url: string;
  onStatusChange: (id: number, status: 'active' | 'inactive') => void;
  onDelete: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, name, path, type, status, url, onStatusChange, onDelete 
}) => {
  const { toast } = useToast();

  const handleOpen = () => {
    if (status === 'active') {
      window.open(url, '_blank');
      toast({
        title: "Projet Ouvert",
        description: `${name} ouvert dans un nouvel onglet`,
        duration: 2000,
      });
    } else {
      toast({
        title: "Projet Inactif",
        description: "Veuillez d'abord activer le projet",
        duration: 3000,
      });
    }
  };

  const handleConfig = () => {
    toast({
      title: "Configuration",
      description: `Configuration de ${name} (fonctionnalité en développement)`,
      duration: 3000,
    });
  };

  const handleStatusToggle = () => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    onStatusChange(id, newStatus);
    toast({
      title: `Projet ${newStatus === 'active' ? 'Activé' : 'Désactivé'}`,
      description: `${name} est maintenant ${newStatus === 'active' ? 'actif' : 'inactif'}`,
      duration: 3000,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      onDelete(id);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'wordpress': return 'bg-blue-100 text-blue-800';
      case 'react': return 'bg-cyan-100 text-cyan-800';
      case 'laravel': return 'bg-red-100 text-red-800';
      case 'vue': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-800 flex items-center">
            <Folder className="w-5 h-5 mr-2 text-blue-600" />
            {name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary"
              className={getTypeColor(type)}
            >
              {type}
            </Badge>
            <Badge 
              variant={status === 'active' ? 'default' : 'secondary'} 
              className={status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}
            >
              {status === 'active' ? 'Actif' : 'Inactif'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm text-blue-700"><strong>Chemin:</strong> {path}</p>
          <p className="text-sm text-blue-700"><strong>URL:</strong> {url}</p>
        </div>
        
        <div className="flex space-x-2 flex-wrap">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
            onClick={handleOpen}
            disabled={status === 'inactive'}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Ouvrir
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleStatusToggle}
            className={status === 'active' 
              ? "bg-orange-500 hover:bg-orange-600 text-white" 
              : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }
          >
            {status === 'active' ? <Square className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
            {status === 'active' ? 'Arrêter' : 'Démarrer'}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
            onClick={handleConfig}
          >
            <Settings className="w-3 h-3 mr-1" />
            Config
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="border-red-300 text-red-600 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
