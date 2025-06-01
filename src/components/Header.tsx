import React, { useState } from 'react';
import { Server, Settings, HelpCircle, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpForm, setHelpForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    commentaire: ''
  });

  const handleSettings = () => {
    toast({
      title: "⚙️ Configuration",
      description: "Ouverture des paramètres du serveur...",
      duration: 2000,
    });
    navigate('/configuration');
  };

  const handleLogout = () => {
    toast({
      title: "🔌 Déconnexion",
      description: "Déconnexion du serveur Fangal en cours...",
      duration: 3000,
    });
    
    // Simulation de la déconnexion du serveur
    setTimeout(() => {
      toast({
        title: "✅ Déconnecté",
        description: "Vous avez été déconnecté du serveur avec succès",
        duration: 2000,
      });
      
      // Ici on pourrait rediriger vers une page de connexion ou fermer l'application
      // Pour l'instant on recharge la page pour simuler une déconnexion
      window.location.reload();
    }, 1500);
  };

  const handleHelpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!helpForm.nom || !helpForm.email || !helpForm.commentaire) {
      toast({
        title: "❌ Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        duration: 3000,
      });
      return;
    }

    // Simulation d'envoi de la demande d'aide
    toast({
      title: "📩 Demande d'aide envoyée",
      description: "Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.",
      duration: 4000,
    });

    // Réinitialiser le formulaire
    setHelpForm({
      nom: '',
      email: '',
      telephone: '',
      commentaire: ''
    });
    setIsHelpOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setHelpForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 px-6 py-4 shadow-2xl relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          {/* Enhanced Logo */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
              <Server className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Fangal Local Server
            </h1>
            <p className="text-slate-400 font-medium">Environnement de Développement Premium</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Enhanced Help Dialog */}
          <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50 backdrop-blur-sm"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Aide
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 text-white">
              <DialogHeader>
                <DialogTitle className="text-blue-800 text-xl">Demande d'Aide</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleHelpSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="text-blue-700">
                      Nom complet <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nom"
                      value={helpForm.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      placeholder="Votre nom et prénom"
                      className="border-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-700">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={helpForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre.email@exemple.com"
                      className="border-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telephone" className="text-blue-700">
                      Téléphone (optionnel)
                    </Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={helpForm.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder="+33 1 23 45 67 89"
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="commentaire" className="text-blue-700">
                      Description du problème <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="commentaire"
                      value={helpForm.commentaire}
                      onChange={(e) => handleInputChange('commentaire', e.target.value)}
                      placeholder="Décrivez en détail le problème rencontré ou l'aide dont vous avez besoin..."
                      className="border-blue-200 focus:border-blue-500 min-h-[120px]"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsHelpOpen(false)}
                    className="border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    Envoyer la demande
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
          {/* Enhanced Settings Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50 backdrop-blur-sm"
            onClick={handleSettings}
          >
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>

          {/* Enhanced Logout Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-300 hover:text-white hover:bg-red-600/70 transition-all duration-200 border border-slate-600/30 hover:border-red-500/50 backdrop-blur-sm"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
