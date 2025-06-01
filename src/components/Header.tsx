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
      description: "Déconnexion du serveur Fanga en cours...",
      duration: 3000,
    });
    
    // Simulation de la déconnexion du serveur
    setTimeout(() => {
      toast({
        title: "✅ Déconnecté",
        description: "Vous avez été déconnecté du serveur avec succès",
        duration: 2000,
      });
      
      // Redirection vers la page de connexion
      navigate('/login');
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
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 border-b border-blue-700 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl shadow-lg">
            <Server className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Fanga Local Server</h1>
            <p className="text-blue-200">Environnement de Développement</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-100 hover:text-white hover:bg-blue-700 transition-all duration-200"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Aide
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
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
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-100 hover:text-white hover:bg-blue-700 transition-all duration-200"
            onClick={handleSettings}
          >
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-100 hover:text-white hover:bg-red-600 transition-all duration-200"
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
