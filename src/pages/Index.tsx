
import React from 'react';
import Header from '@/components/Header';
import ServerStatus from '@/components/ServerStatus';
import QuickActions from '@/components/QuickActions';
import ProjectsList from '@/components/ProjectsList';
import SystemInfo from '@/components/SystemInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-blue-900">Bienvenue sur Fangal Local Server</h2>
            <p className="text-blue-700 max-w-2xl mx-auto text-lg">
              Un environnement de développement local moderne et intuitif conçu pour les développeurs. 
              Gérez vos projets, services et configurations en toute simplicité.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Status & Actions */}
            <div className="lg:col-span-1 space-y-6">
              <ServerStatus />
              <QuickActions />
              <SystemInfo />
            </div>

            {/* Right Column - Projects */}
            <div className="lg:col-span-3">
              <ProjectsList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
