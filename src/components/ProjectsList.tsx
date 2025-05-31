
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectCard from './ProjectCard';

const ProjectsList = () => {
  const projects = [
    {
      name: 'E-commerce Site',
      path: '/Users/dev/htdocs/ecommerce',
      type: 'WordPress',
      status: 'active' as const,
      url: 'http://localhost/ecommerce'
    },
    {
      name: 'Portfolio Website',
      path: '/Users/dev/htdocs/portfolio',
      type: 'React',
      status: 'inactive' as const,
      url: 'http://localhost/portfolio'
    },
    {
      name: 'API Backend',
      path: '/Users/dev/htdocs/api',
      type: 'Laravel',
      status: 'active' as const,
      url: 'http://localhost/api'
    }
  ];

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white">Your Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsList;
