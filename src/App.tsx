
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import AuthScreen from "./screens/AuthScreen";
import Dashboard from "./screens/Dashboard";
import ViewPolicy from "./screens/ViewPolicy";
import SearchCoverage from "./screens/SearchCoverage";
import ProviderNetwork from "./screens/ProviderNetwork";
import Telemedicine from "./screens/Telemedicine";
import Prescriptions from "./screens/Prescriptions";
import Support from "./screens/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-travel-teal border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-travel-teal border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/auth" replace />} />
    <Route path="/auth" element={
      <PublicRoute>
        <AuthScreen />
      </PublicRoute>
    } />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Layout><Dashboard /></Layout>
      </ProtectedRoute>
    } />
    <Route path="/policy" element={
      <ProtectedRoute>
        <Layout><ViewPolicy /></Layout>
      </ProtectedRoute>
    } />
    <Route path="/coverage" element={
      <ProtectedRoute>
        <Layout><SearchCoverage /></Layout>
      </ProtectedRoute>
    } />
    <Route path="/providers" element={
      <ProtectedRoute>
        <Layout><ProviderNetwork /></Layout>
      </ProtectedRoute>
    } />
    <Route path="/telemedicine" element={
      <ProtectedRoute>
        <Layout><Telemedicine /></Layout>
      </ProtectedRoute>
    } />
    <Route path="/prescriptions" element={
      <ProtectedRoute>
        <Layout><Prescriptions /></Layout>
      </ProtectedRoute>
    } />
    <Route path="/support" element={
      <ProtectedRoute>
        <Layout><Support /></Layout>
      </ProtectedRoute>
    } />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-gray-50">
              <AppRoutes />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
