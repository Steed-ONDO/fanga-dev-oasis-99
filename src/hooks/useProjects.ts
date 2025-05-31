
import { useState, useEffect } from 'react';

interface Project {
  id: number;
  name: string;
  path: string;
  type: string;
  status: 'active' | 'inactive';
  url: string;
  createdAt?: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Charger les projets depuis le localStorage au démarrage
  useEffect(() => {
    const savedProjects = localStorage.getItem('fangal_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Projets par défaut si aucun n'est sauvegardé
      const defaultProjects = [
        {
          id: 1,
          name: 'Site E-commerce',
          path: '/Users/dev/htdocs/ecommerce',
          type: 'WordPress',
          status: 'active' as const,
          url: 'http://localhost/ecommerce',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Site Portfolio',
          path: '/Users/dev/htdocs/portfolio',
          type: 'React',
          status: 'inactive' as const,
          url: 'http://localhost/portfolio',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'API Backend',
          path: '/Users/dev/htdocs/api',
          type: 'Laravel',
          status: 'active' as const,
          url: 'http://localhost/api',
          createdAt: new Date().toISOString()
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('fangal_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  // Sauvegarder les projets à chaque modification
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('fangal_projects', JSON.stringify(projects));
    }
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now(), // Simple ID basé sur le timestamp
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id: number, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const updateProjectStatus = (id: number, status: 'active' | 'inactive') => {
    updateProject(id, { status });
  };

  const updateProjectName = (id: number, name: string) => {
    updateProject(id, { name });
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    updateProjectStatus,
    updateProjectName
  };
};
