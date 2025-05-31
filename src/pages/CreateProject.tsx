
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Folder, Code, Globe, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useProjects';

const CreateProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProject } = useProjects();
  const [projectData, setProjectData] = useState({
    name: '',
    type: '',
    path: '',
    url: ''
  });

  const projectTypes = [
    { value: 'react', label: 'React', icon: Code, description: 'Application React moderne' },
    { value: 'wordpress', label: 'WordPress', icon: Globe, description: 'Site WordPress' },
    { value: 'laravel', label: 'Laravel', icon: Database, description: 'Application Laravel PHP' },
    { value: 'vue', label: 'Vue.js', icon: Code, description: 'Application Vue.js' },
    { value: 'nodejs', label: 'Node.js', icon: Database, description: 'Application Node.js' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectData.name || !projectData.type) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Récupérer la configuration pour le chemin par défaut
    const config = localStorage.getItem('fangal_config');
    const defaultPath = config ? JSON.parse(config).projectsPath || '/Users/dev/htdocs' : '/Users/dev/htdocs';

    // Générer automatiquement le chemin et l'URL si non spécifiés
    const projectSlug = projectData.name.toLowerCase().replace(/\s+/g, '-');
    const finalProjectData = {
      name: projectData.name,
      type: projectData.type,
      path: projectData.path || `${defaultPath}/${projectSlug}`,
      url: projectData.url || `http://localhost/${projectSlug}`,
      status: 'inactive' as const
    };

    // Ajouter le projet
    const newProject = addProject(finalProjectData);

    toast({
      title: "Projet Créé avec Succès!",
      description: `${finalProjectData.name} a été créé et ajouté à vos projets`,
      duration: 4000,
    });

    // Rediriger vers la page principale après 2 secondes
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleTypeSelect = (type: string) => {
    setProjectData({ ...projectData, type });
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
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Nouveau Projet</h1>
              <p className="text-blue-200 text-sm">Créez votre nouveau projet de développement</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-blue-200 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="text-blue-800 text-2xl">Configuration du Projet</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom du projet */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-800 font-medium">
                    Nom du Projet *
                  </Label>
                  <Input
                    id="name"
                    value={projectData.name}
                    onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                    placeholder="Mon Super Projet"
                    className="border-blue-200 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Type de projet */}
                <div className="space-y-2">
                  <Label className="text-blue-800 font-medium">Type de Projet *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {projectTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <Card 
                          key={type.value}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                            projectData.type === type.value 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          onClick={() => handleTypeSelect(type.value)}
                        >
                          <CardContent className="p-4 text-center">
                            <Icon className={`w-8 h-8 mx-auto mb-2 ${
                              projectData.type === type.value ? 'text-blue-600' : 'text-gray-500'
                            }`} />
                            <h3 className={`font-medium ${
                              projectData.type === type.value ? 'text-blue-800' : 'text-gray-700'
                            }`}>
                              {type.label}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Configuration avancée */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-medium text-blue-800">Configuration Avancée (Optionnel)</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="path" className="text-blue-700">Chemin du Projet</Label>
                      <Input
                        id="path"
                        value={projectData.path}
                        onChange={(e) => setProjectData({ ...projectData, path: e.target.value })}
                        placeholder="/Users/dev/htdocs/mon-projet"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="url" className="text-blue-700">URL du Projet</Label>
                      <Input
                        id="url"
                        value={projectData.url}
                        onChange={(e) => setProjectData({ ...projectData, url: e.target.value })}
                        placeholder="http://localhost/mon-projet"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex space-x-4 pt-6">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    Créer le Projet
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
