
import React, { useState } from 'react';
import { Server, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setLoginForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.username || !loginForm.password) {
      toast({
        title: "❌ Erreur",
        description: "Veuillez remplir tous les champs",
        duration: 3000,
      });
      return;
    }

    toast({
      title: "🔐 Connexion en cours...",
      description: "Vérification des identifiants...",
      duration: 2000,
    });

    // Simulation de la connexion
    setTimeout(() => {
      toast({
        title: "✅ Connexion réussie",
        description: "Bienvenue sur le serveur Fanga !",
        duration: 2000,
      });
      
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl shadow-lg">
              <Server className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800">Fanga Local Server</CardTitle>
          <p className="text-blue-600">Connexion à votre environnement de développement</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-blue-700">
                Nom d'utilisateur
              </Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Votre nom d'utilisateur"
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-700">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Votre mot de passe"
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white mt-6"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Se connecter
            </Button>
          </form>
          
          <div className="text-center mt-6 text-sm text-blue-600">
            <p>Environnement de développement local</p>
            <p className="text-xs text-blue-500 mt-1">Version 1.0.0</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
