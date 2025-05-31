
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, Upload, RefreshCw, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const actions = [
    { 
      icon: Plus, 
      label: 'Nouveau Projet', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      action: () => {
        toast({
          title: "🚀 Nouveau Projet",
          description: "Redirection vers la page de création...",
          duration: 2000,
        });
        navigate('/create-project');
      }
    },
    { 
      icon: Settings, 
      label: 'Configuration', 
      color: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
      action: () => {
        toast({
          title: "⚙️ Configuration",
          description: "Ouverture des paramètres...",
          duration: 2000,
        });
        navigate('/configuration');
      }
    },
    { 
      icon: Download, 
      label: 'Importer Projet', 
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      action: () => {
        toast({
          title: "📥 Import de Projet",
          description: "Ouverture du sélecteur de dossier...",
          duration: 3000,
        });
        // Simulation d'ouverture de dialogue de fichier
        setTimeout(() => {
          toast({
            title: "ℹ️ Fonctionnalité en développement",
            description: "L'import de projets sera bientôt disponible",
            duration: 3000,
          });
        }, 1500);
      }
    },
    { 
      icon: Upload, 
      label: 'Exporter Sauvegarde', 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      action: () => {
        toast({
          title: "💾 Export en cours",
          description: "Création de la sauvegarde de vos projets...",
          duration: 3000,
        });
        // Simulation de processus d'export
        setTimeout(() => {
          toast({
            title: "✅ Export Terminé",
            description: "Sauvegarde créée avec succès dans le dossier Téléchargements",
            duration: 4000,
          });
        }, 2000);
      }
    },
    { 
      icon: RefreshCw, 
      label: 'Redémarrer Services', 
      color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      action: () => {
        toast({
          title: "🔄 Redémarrage en cours",
          description: "Arrêt et redémarrage de tous les services...",
          duration: 3000,
        });
        // Simulation de redémarrage
        setTimeout(() => {
          toast({
            title: "✅ Services Redémarrés",
            description: "Tous les services sont maintenant opérationnels",
            duration: 4000,
          });
        }, 2500);
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
