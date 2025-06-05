
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
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
              <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/policy" element={<Layout><ViewPolicy /></Layout>} />
                <Route path="/coverage" element={<Layout><SearchCoverage /></Layout>} />
                <Route path="/providers" element={<Layout><ProviderNetwork /></Layout>} />
                <Route path="/telemedicine" element={<Layout><Telemedicine /></Layout>} />
                <Route path="/prescriptions" element={<Layout><Prescriptions /></Layout>} />
                <Route path="/support" element={<Layout><Support /></Layout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
