
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import CreateProject from "./pages/CreateProject";
import Installation from "./pages/Installation";
import Configuration from "./pages/Configuration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null);

  useEffect(() => {
    // Vérifier si l'installation a été effectuée
    const installed = localStorage.getItem('fanga_installed');
    setIsInstalled(installed === 'true');
  }, []);

  // Afficher un écran de chargement pendant la vérification
  if (isInstalled === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Si pas installé, rediriger vers l'installation */}
            {!isInstalled ? (
              <>
                <Route path="/installation" element={<Installation />} />
                <Route path="*" element={<Navigate to="/installation" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Index />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/installation" element={<Installation />} />
                <Route path="/configuration" element={<Configuration />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
