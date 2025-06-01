
import React from 'react';
import { ExternalLink, Settings, Trash2, Folder, Play, Square } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import EditProjectName from './EditProjectName';

interface ProjectCardProps {
  id: number;
  name: string;
  path: string;
  type: string;
  status: 'active' | 'inactive';
  url: string;
  onStatusChange: (id: number, status: 'active' | 'inactive') => void;
  onDelete: (id: number) => void;
  onNameChange: (id: number, newName: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, name, path, type, status, url, onStatusChange, onDelete, onNameChange 
}) => {
  const { toast } = useToast();

  const handleOpen = () => {
    if (status === 'active') {
      window.open(url, '_blank');
      toast({
        title: "✅ Projet Ouvert",
        description: `${name} a été ouvert dans un nouvel onglet`,
        duration: 3000,
      });
    } else {
      toast({
        title: "⚠️ Projet Inactif",
        description: "Veuillez d'abord activer le projet pour l'ouvrir",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleConfig = () => {
    toast({
      title: "🔧 Configuration",
      description: `Ouverture des paramètres de ${name}...`,
      duration: 3000,
    });
  };

  const handleStatusToggle = () => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    onStatusChange(id, newStatus);
    
    toast({
      title: newStatus === 'active' ? "✅ Projet Activé" : "⏹️ Projet Désactivé",
      description: `${name} est maintenant ${newStatus === 'active' ? 'actif et prêt à être utilisé' : 'inactif'}`,
      duration: 3000,
    });
  };

  const handleDelete = () => {
    if (window.confirm(`⚠️ Êtes-vous sûr de vouloir supprimer "${name}" ?\n\nCette action est irréversible.`)) {
      onDelete(id);
      toast({
        title: "🗑️ Projet Supprimé",
        description: `${name} a été supprimé définitivement`,
        duration: 4000,
      });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'wordpress': return 'bg-blue-100 text-blue-800';
      case 'react': return 'bg-cyan-100 text-cyan-800';
      case 'laravel': return 'bg-red-100 text-red-800';
      case 'vue': return 'bg-emerald-100 text-emerald-800';
      case 'nodejs': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Folder className="w-5 h-5 text-blue-400" />
            </div>
            <EditProjectName 
              projectId={id} 
              currentName={name} 
              onNameChange={onNameChange} 
            />
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <Badge 
              variant="secondary"
              className={`${getTypeColor(type)} border border-current/30 font-medium`}
            >
              {type}
            </Badge>
            <Badge 
              variant={status === 'active' ? 'default' : 'secondary'} 
              className={status === 'active' ? 
                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 
                'bg-slate-600/20 text-slate-400 border border-slate-600/30'
              }
            >
              {status === 'active' ? 'Actif' : 'Inactif'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <p className="text-slate-400"><strong className="text-slate-300">Chemin:</strong> <span className="font-mono text-blue-300">{path}</span></p>
          <p className="text-slate-400"><strong className="text-slate-300">URL:</strong> <span className="font-mono text-blue-300">{url}</span></p>
        </div>
        
        <div className="flex space-x-2 flex-wrap">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
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
              ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transform hover:scale-105 transition-all duration-200" 
              : "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white transform hover:scale-105 transition-all duration-200"
            }
          >
            {status === 'active' ? <Square className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
            {status === 'active' ? 'Arrêter' : 'Démarrer'}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-slate-500/50 transition-all duration-200"
            onClick={handleConfig}
          >
            <Settings className="w-3 h-3 mr-1" />
            Config
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/50 transition-all duration-200"
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
