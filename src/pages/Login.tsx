
import React, { useState } from 'react';
import { Server, User, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    serveur: '',
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setLoginForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.serveur || !loginForm.username || !loginForm.password) {
      toast({
        title: "❌ Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    // Simulation de la connexion au serveur
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "✅ Connexion réussie",
        description: `Connecté au serveur Fanga : ${loginForm.serveur}`,
        duration: 3000,
      });

      // Redirection vers la page principale
      navigate('/');
    } catch (error) {
      toast({
        title: "❌ Erreur de connexion",
        description: "Impossible de se connecter au serveur. Vérifiez vos identifiants.",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-lg mx-auto mb-4">
            <Server className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Fanga Local Server</h1>
          <p className="text-blue-700">Connexion au serveur de développement</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="serveur" className="text-blue-700 font-medium">
                Adresse du serveur <span className="text-red-500">*</span>
              </Label>
              <Input
                id="serveur"
                type="text"
                value={loginForm.serveur}
                onChange={(e) => handleInputChange('serveur', e.target.value)}
                placeholder="localhost:3000 ou 192.168.1.100:8080"
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-blue-700 font-medium">
                Nom d'utilisateur <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Votre nom d'utilisateur"
                  className="border-blue-200 focus:border-blue-500 pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-700 font-medium">
                Mot de passe <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Votre mot de passe"
                  className="border-blue-200 focus:border-blue-500 pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-lg font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connexion en cours...
                </div>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Environnement de développement local sécurisé
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
