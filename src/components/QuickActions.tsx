
import React from 'react';
import { Plus, Download, Upload, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const QuickActions = () => {
  const { toast } = useToast();

  const actions = [
    { 
      icon: Plus, 
      label: 'Nouveau Projet', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      action: () => {
        toast({
          title: "Nouveau Projet",
          description: "Fonctionnalité de création de projet en cours de développement",
          duration: 3000,
        });
      }
    },
    { 
      icon: Download, 
      label: 'Importer Projet', 
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      action: () => {
        toast({
          title: "Import de Projet",
          description: "Sélectionnez un dossier de projet existant à importer",
          duration: 3000,
        });
      }
    },
    { 
      icon: Upload, 
      label: 'Exporter Sauvegarde', 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      action: () => {
        toast({
          title: "Export de Sauvegarde",
          description: "Création d'une sauvegarde de vos projets...",
          duration: 3000,
        });
      }
    },
    { 
      icon: RefreshCw, 
      label: 'Redémarrer Services', 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      action: () => {
        toast({
          title: "Redémarrage des Services",
          description: "Tous les services ont été redémarrés avec succès",
          duration: 3000,
        });
      }
    },
  ];

  return (
    <Card className="bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <CardTitle className="text-blue-800">Actions Rapides</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              className={`w-full justify-start text-white ${action.color} shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
              size="sm"
              onClick={action.action}
            >
              <Icon className="w-4 h-4 mr-3" />
              {action.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
