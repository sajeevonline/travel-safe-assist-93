
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import { 
  FileText, 
  Search, 
  MapPin, 
  Video, 
  Pill, 
  HelpCircle,
  Globe,
  Home,
  MessageSquare
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const quickActions = [
    { title: 'AI Chat', icon: MessageSquare, path: '/chat' },
    { title: t('dashboard'), icon: Home, path: '/dashboard' },
    { title: t('viewPolicy'), icon: FileText, path: '/policy' },
    { title: t('searchCoverage'), icon: Search, path: '/coverage' },
    { title: t('findDoctor'), icon: MapPin, path: '/providers' },
    { title: t('telemedicine'), icon: Video, path: '/telemedicine' },
    { title: t('prescriptions'), icon: Pill, path: '/prescriptions' },
    { title: t('support'), icon: HelpCircle, path: '/support' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <Globe className="w-8 h-8 text-travel-teal" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">TravelCare AI</h1>
              <p className="text-sm text-gray-600">Intelligent Assistant</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors group ${
                  isActivePath(action.path) 
                    ? 'bg-travel-teal text-white' 
                    : 'hover:bg-travel-teal/10 text-gray-700 hover:text-travel-teal'
                }`}
              >
                <action.icon className={`w-5 h-5 ${
                  isActivePath(action.path) ? 'text-white' : 'text-gray-600 group-hover:text-travel-teal'
                }`} />
                <span className={isActivePath(action.path) ? 'text-white' : 'group-hover:text-travel-teal'}>
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t space-y-3">
          <LanguageSelector />
          <div className="text-sm text-gray-600">
            Welcome, {user?.name}
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="w-full"
          >
            {t('logout')}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default Layout;
