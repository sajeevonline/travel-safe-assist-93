
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import ViewPolicy from "./screens/ViewPolicy";
import SearchCoverage from "./screens/SearchCoverage";
import ProviderNetwork from "./screens/ProviderNetwork";
import Telemedicine from "./screens/Telemedicine";
import Prescriptions from "./screens/Prescriptions";
import Support from "./screens/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-gray-50">
              <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
                <Routes>
                  <Route path="/" element={<LoginScreen />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/policy" element={<ViewPolicy />} />
                  <Route path="/coverage" element={<SearchCoverage />} />
                  <Route path="/providers" element={<ProviderNetwork />} />
                  <Route path="/telemedicine" element={<Telemedicine />} />
                  <Route path="/prescriptions" element={<Prescriptions />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
