
import React from 'react';
import { Server, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const handleHelp = () => {
    alert('Aide : Utilisez le panneau de gauche pour gérer vos services et le panneau principal pour vos projets. Cliquez sur les boutons d\'action rapide pour commencer !');
  };

  const handleSettings = () => {
    alert('Paramètres : Configuration des services, ports et répertoires de travail (fonctionnalité en développement)');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-700 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl shadow-lg">
            <Server className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Fangal Local Server</h1>
            <p className="text-blue-200">Environnement de Développement</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-100 hover:text-white hover:bg-blue-700 transition-all duration-200"
            onClick={handleHelp}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Aide
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-100 hover:text-white hover:bg-blue-700 transition-all duration-200"
            onClick={handleSettings}
          >
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
