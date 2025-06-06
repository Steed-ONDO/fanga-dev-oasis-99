
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { useToast } from '@/hooks/use-toast';
import { useProjects } from '@/hooks/useProjects';

const ProjectsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projects, updateProjectStatus, updateProjectName, deleteProject } = useProjects();

  const handleCreateProject = () => {
    toast({
      title: "🚀 Redirection",
      description: "Ouverture de la page de création de projet...",
      duration: 2000,
    });
    navigate('/create-project');
  };

  return (
    <Card className="bg-white border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-800">Vos Projets</CardTitle>
          <Button
            onClick={handleCreateProject}
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
              onNameChange={updateProjectName}
            />
          ))}
        </div>
        {projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-blue-600 mb-4">Aucun projet trouvé</p>
            <Button onClick={handleCreateProject} className="bg-blue-500 hover:bg-blue-600 text-white">
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
