
import React from 'react';
import Header from '@/components/Header';
import ServerStatus from '@/components/ServerStatus';
import QuickActions from '@/components/QuickActions';
import ProjectsList from '@/components/ProjectsList';
import SystemInfo from '@/components/SystemInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome to Fangal Local Server</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A modern, intuitive local development environment designed for developers. 
              Manage your projects, services, and configurations with ease.
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
