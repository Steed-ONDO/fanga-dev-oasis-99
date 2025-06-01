
import React from 'react';
import Header from '@/components/Header';
import ServerStatus from '@/components/ServerStatus';
import QuickActions from '@/components/QuickActions';
import ProjectsList from '@/components/ProjectsList';
import SystemInfo from '@/components/SystemInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      <Header />
      
      <main className="p-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl px-8 py-6">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  Bienvenue sur Fangal Local Server
                </h2>
                <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                  Un environnement de développement local moderne et intuitif conçu pour les développeurs. 
                  Gérez vos projets, services et configurations avec style et simplicité.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Services Actifs</p>
                  <p className="text-white text-xl font-semibold">Apache, MySQL, PHP</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">5</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Projets</p>
                  <p className="text-white text-xl font-semibold">En développement</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-400/40 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">98%</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Performance</p>
                  <p className="text-white text-xl font-semibold">Système optimal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
