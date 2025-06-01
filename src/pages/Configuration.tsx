import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Server, Database, Folder, Shield, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Configuration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [config, setConfig] = useState({
    server: {
      httpPort: '80',
      httpsPort: '443',
      phpVersion: '8.2',
      autoStart: true,
      enableSSL: false
    },
    database: {
      mysqlRoot: 'root',
      mysqlPassword: '',
      autoStart: true,
      port: '3306'
    },
    projects: {
      defaultPath: '/Users/dev/htdocs',
      autoBackup: true,
      backupInterval: '24'
    },
    security: {
      enableFirewall: false,
      allowRemoteAccess: false,
      logLevel: 'info'
    }
  });

  useEffect(() => {
    // Charger la configuration existante
    const savedConfig = localStorage.getItem('fangal_config');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(prevConfig => ({
        ...prevConfig,
        server: { ...prevConfig.server, ...parsedConfig },
        projects: { ...prevConfig.projects, projectsPath: parsedConfig.projectsPath }
      }));
    }
  }, []);

  const handleSave = () => {
    // Sauvegarder la configuration
    localStorage.setItem('fangal_config', JSON.stringify({
      ...config.server,
      ...config.database,
      projectsPath: config.projects.defaultPath
    }));

    toast({
      title: "✅ Configuration Sauvegardée",
      description: "Les paramètres ont été mis à jour avec succès",
      duration: 3000,
    });

    // Rediriger vers la page d'accueil après 1 seconde
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-700 px-6 py-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-blue-100 hover:text-white hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg">
              <Server className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Configuration</h1>
              <p className="text-blue-200 text-sm">Paramètres du serveur Fangal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="server" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white border-blue-200">
              <TabsTrigger value="server" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                <Server className="w-4 h-4 mr-2" />
                Serveur
              </TabsTrigger>
              <TabsTrigger value="database" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                <Database className="w-4 h-4 mr-2" />
                Base de Données
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                <Folder className="w-4 h-4 mr-2" />
                Projets
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                <Shield className="w-4 h-4 mr-2" />
                Sécurité
              </TabsTrigger>
            </TabsList>

            {/* Server Configuration */}
            <TabsContent value="server">
              <Card className="bg-white border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-blue-800">Configuration du Serveur Web</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="httpPort">Port HTTP</Label>
                      <Input
                        id="httpPort"
                        value={config.server.httpPort}
                        onChange={(e) => setConfig({
                          ...config,
                          server: { ...config.server, httpPort: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="httpsPort">Port HTTPS</Label>
                      <Input
                        id="httpsPort"
                        value={config.server.httpsPort}
                        onChange={(e) => setConfig({
                          ...config,
                          server: { ...config.server, httpsPort: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phpVersion">Version PHP</Label>
                      <select 
                        id="phpVersion"
                        value={config.server.phpVersion}
                        onChange={(e) => setConfig({
                          ...config,
                          server: { ...config.server, phpVersion: e.target.value }
                        })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="8.2">PHP 8.2</option>
                        <option value="8.1">PHP 8.1</option>
                        <option value="8.0">PHP 8.0</option>
                        <option value="7.4">PHP 7.4</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="autoStart"
                        checked={config.server.autoStart}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          server: { ...config.server, autoStart: checked }
                        })}
                      />
                      <Label htmlFor="autoStart">Démarrage automatique du serveur</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableSSL"
                        checked={config.server.enableSSL}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          server: { ...config.server, enableSSL: checked }
                        })}
                      />
                      <Label htmlFor="enableSSL">Activer SSL/HTTPS</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Database Configuration */}
            <TabsContent value="database">
              <Card className="bg-white border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-blue-800">Configuration Base de Données</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mysqlRoot">Utilisateur Root</Label>
                      <Input
                        id="mysqlRoot"
                        value={config.database.mysqlRoot}
                        onChange={(e) => setConfig({
                          ...config,
                          database: { ...config.database, mysqlRoot: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mysqlPassword">Mot de passe Root</Label>
                      <Input
                        id="mysqlPassword"
                        type="password"
                        value={config.database.mysqlPassword}
                        onChange={(e) => setConfig({
                          ...config,
                          database: { ...config.database, mysqlPassword: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mysqlPort">Port MySQL</Label>
                      <Input
                        id="mysqlPort"
                        value={config.database.port}
                        onChange={(e) => setConfig({
                          ...config,
                          database: { ...config.database, port: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dbAutoStart"
                      checked={config.database.autoStart}
                      onCheckedChange={(checked) => setConfig({
                        ...config,
                        database: { ...config.database, autoStart: checked }
                      })}
                    />
                    <Label htmlFor="dbAutoStart">Démarrage automatique de MySQL</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Configuration */}
            <TabsContent value="projects">
              <Card className="bg-white border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-blue-800">Gestion des Projets</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultPath">Dossier par défaut des projets</Label>
                    <Input
                      id="defaultPath"
                      value={config.projects.defaultPath}
                      onChange={(e) => setConfig({
                        ...config,
                        projects: { ...config.projects, defaultPath: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="autoBackup"
                        checked={config.projects.autoBackup}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          projects: { ...config.projects, autoBackup: checked }
                        })}
                      />
                      <Label htmlFor="autoBackup">Sauvegarde automatique des projets</Label>
                    </div>
                    
                    {config.projects.autoBackup && (
                      <div className="space-y-2 ml-6">
                        <Label htmlFor="backupInterval">Intervalle de sauvegarde (heures)</Label>
                        <Input
                          id="backupInterval"
                          type="number"
                          value={config.projects.backupInterval}
                          onChange={(e) => setConfig({
                            ...config,
                            projects: { ...config.projects, backupInterval: e.target.value }
                          })}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Configuration */}
            <TabsContent value="security">
              <Card className="bg-white border-blue-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-blue-800">Paramètres de Sécurité</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enableFirewall"
                        checked={config.security.enableFirewall}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          security: { ...config.security, enableFirewall: checked }
                        })}
                      />
                      <Label htmlFor="enableFirewall">Activer le pare-feu</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowRemoteAccess"
                        checked={config.security.allowRemoteAccess}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          security: { ...config.security, allowRemoteAccess: checked }
                        })}
                      />
                      <Label htmlFor="allowRemoteAccess">Autoriser l'accès distant</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logLevel">Niveau de logs</Label>
                    <select 
                      id="logLevel"
                      value={config.security.logLevel}
                      onChange={(e) => setConfig({
                        ...config,
                        security: { ...config.security, logLevel: e.target.value }
                      })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="error">Erreurs seulement</option>
                      <option value="warning">Avertissements</option>
                      <option value="info">Informations</option>
                      <option value="debug">Debug</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder la Configuration
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Configuration;
