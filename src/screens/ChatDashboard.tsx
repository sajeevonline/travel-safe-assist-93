
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatInterface from '@/components/ChatInterface';
import QuickActionPanel from '@/components/QuickActionPanel';
import { Button } from '@/components/ui/button';
import { Globe, Menu, Settings, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatDashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="lg:hidden"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <Globe className="w-6 h-6 lg:w-8 lg:h-8 text-travel-teal" />
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">TravelCare AI</h1>
                <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Your intelligent insurance assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="text-xs lg:text-sm text-gray-600 hidden sm:block max-w-32 lg:max-w-none truncate">
              {user?.name}
            </div>
            <Button variant="outline" size="sm" className="hidden lg:flex">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={logout} className="text-xs lg:text-sm">
              {t('logout')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Chat Interface - Takes most space on desktop */}
        <div className="flex-1 min-w-0 flex flex-col lg:min-w-[600px]">
          <ChatInterface />
        </div>
        
        {/* Quick Action Panel - Desktop Only, fixed width */}
        <div className="hidden xl:block w-80 flex-shrink-0 border-l border-gray-200">
          <QuickActionPanel />
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
