import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Settings, Database, Globe, Code, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Installation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [installationData, setInstallationData] = useState({
    serverPath: '/usr/local/fangal',
    httpPort: '80',
    httpsPort: '443',
    phpVersion: '8.2',
    mysqlRoot: 'root',
    mysqlPassword: '',
    projectsPath: '/Users/dev/htdocs'
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Bienvenue sur Fanga Local Server',
      icon: Settings,
      description: 'Configuration de votre environnement de développement local'
    },
    {
      id: 'server',
      title: 'Configuration Serveur',
      icon: Globe,
      description: 'Paramètres du serveur web et des ports'
    },
    {
      id: 'database',
      title: 'Base de Données',
      icon: Database,
      description: 'Configuration MySQL/MariaDB'
    },
    {
      id: 'projects',
      title: 'Dossier Projets',
      icon: Code,
      description: 'Emplacement de vos projets de développement'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleInstallation();
    }
  };

  const handleInstallation = () => {
    toast({
      title: "🚀 Installation Terminée",
      description: "Fangal Server a été configuré avec succès !",
      duration: 4000,
    });

    // Simulation de l'installation
    setTimeout(() => {
      localStorage.setItem('fanga_installed', 'true');
      localStorage.setItem('fanga_config', JSON.stringify(installationData));
      navigate('/');
    }, 2000);
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Settings className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                Bienvenue sur Fanga Local Server
              </h3>
              <p className="text-blue-600 text-lg">
                Nous allons configurer votre environnement de développement en quelques étapes simples.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                  <Globe className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="font-medium text-blue-800">Serveur Web</h4>
                <p className="text-sm text-blue-600">Apache/Nginx intégré</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Database className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-medium text-blue-800">Base de Données</h4>
                <p className="text-sm text-blue-600">MySQL/MariaDB</p>
              </div>
            </div>
          </div>
        );

      case 'server':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-800">Configuration du Serveur</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serverPath">Chemin d'installation</Label>
                <Input
                  id="serverPath"
                  value={installationData.serverPath}
                  onChange={(e) => setInstallationData({ ...installationData, serverPath: e.target.value })}
                  placeholder="/usr/local/fangal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="httpPort">Port HTTP</Label>
                <Input
                  id="httpPort"
                  value={installationData.httpPort}
                  onChange={(e) => setInstallationData({ ...installationData, httpPort: e.target.value })}
                  placeholder="80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="httpsPort">Port HTTPS</Label>
                <Input
                  id="httpsPort"
                  value={installationData.httpsPort}
                  onChange={(e) => setInstallationData({ ...installationData, httpsPort: e.target.value })}
                  placeholder="443"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phpVersion">Version PHP</Label>
                <select 
                  id="phpVersion"
                  value={installationData.phpVersion}
                  onChange={(e) => setInstallationData({ ...installationData, phpVersion: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="8.2">PHP 8.2</option>
                  <option value="8.1">PHP 8.1</option>
                  <option value="8.0">PHP 8.0</option>
                  <option value="7.4">PHP 7.4</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-800">Configuration Base de Données</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mysqlRoot">Utilisateur Root</Label>
                <Input
                  id="mysqlRoot"
                  value={installationData.mysqlRoot}
                  onChange={(e) => setInstallationData({ ...installationData, mysqlRoot: e.target.value })}
                  placeholder="root"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mysqlPassword">Mot de passe Root</Label>
                <Input
                  id="mysqlPassword"
                  type="password"
                  value={installationData.mysqlPassword}
                  onChange={(e) => setInstallationData({ ...installationData, mysqlPassword: e.target.value })}
                  placeholder="Mot de passe MySQL"
                />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Si vous laissez le mot de passe vide, nous utiliserons une installation MySQL sans mot de passe pour le développement local.
              </p>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-800">Dossier des Projets</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectsPath">Chemin du dossier projets</Label>
                <Input
                  id="projectsPath"
                  value={installationData.projectsPath}
                  onChange={(e) => setInstallationData({ ...installationData, projectsPath: e.target.value })}
                  placeholder="/Users/dev/htdocs"
                />
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-emerald-700">
                  <strong>Conseil:</strong> Choisissez un dossier facilement accessible où vous souhaitez créer vos projets de développement.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      index <= currentStep 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index < currentStep ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-1 w-24 mx-4 ${
                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4">
              {steps.map((step, index) => (
                <div key={step.id} className="text-center" style={{ width: '200px' }}>
                  <h4 className={`font-medium ${
                    index <= currentStep ? 'text-blue-800' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Card className="bg-white shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-blue-800">
                Étape {currentStep + 1} sur {steps.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {renderStepContent()}
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="border-blue-300 text-blue-700"
                >
                  Précédent
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  {currentStep === steps.length - 1 ? 'Terminer l\'installation' : 'Suivant'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Installation;
