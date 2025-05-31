
import React from 'react';
import { Server, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
            <Server className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Fangal Local Server</h1>
            <p className="text-sm text-gray-400">Development Environment</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
