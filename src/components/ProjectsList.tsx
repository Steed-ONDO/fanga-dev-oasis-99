
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
    <Card className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-lg border-b border-slate-700/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-xl">Vos Projets</CardTitle>
          <Button
            onClick={handleCreateProject}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Projet
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
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
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-slate-400" />
            </div>
            <p className="text-slate-400 mb-6 text-lg">Aucun projet trouvé</p>
            <Button 
              onClick={handleCreateProject} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
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
