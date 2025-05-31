
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { useToast } from '@/hooks/use-toast';

const ProjectsList = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Site E-commerce',
      path: '/Users/dev/htdocs/ecommerce',
      type: 'WordPress',
      status: 'active' as const,
      url: 'http://localhost/ecommerce'
    },
    {
      id: 2,
      name: 'Site Portfolio',
      path: '/Users/dev/htdocs/portfolio',
      type: 'React',
      status: 'inactive' as const,
      url: 'http://localhost/portfolio'
    },
    {
      id: 3,
      name: 'API Backend',
      path: '/Users/dev/htdocs/api',
      type: 'Laravel',
      status: 'active' as const,
      url: 'http://localhost/api'
    }
  ]);

  const addNewProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `Nouveau Projet ${projects.length + 1}`,
      path: `/Users/dev/htdocs/projet${projects.length + 1}`,
      type: 'React',
      status: 'inactive' as const,
      url: `http://localhost/projet${projects.length + 1}`
    };
    
    setProjects([...projects, newProject]);
    toast({
      title: "Nouveau Projet Créé",
      description: `${newProject.name} a été ajouté avec succès`,
      duration: 3000,
    });
  };

  const updateProjectStatus = (projectId: number, newStatus: 'active' | 'inactive') => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    ));
  };

  const deleteProject = (projectId: number) => {
    const projectName = projects.find(p => p.id === projectId)?.name;
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast({
      title: "Projet Supprimé",
      description: `${projectName} a été supprimé avec succès`,
      duration: 3000,
    });
  };

  return (
    <Card className="bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-800">Vos Projets</CardTitle>
          <Button
            onClick={addNewProject}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Projet
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project} 
              onStatusChange={updateProjectStatus}
              onDelete={deleteProject}
            />
          ))}
        </div>
        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-blue-600 mb-4">Aucun projet trouvé</p>
            <Button onClick={addNewProject} className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Créer votre premier projet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsList;
