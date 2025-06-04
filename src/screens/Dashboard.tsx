
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import QuickActionCard from '@/components/QuickActionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Search, 
  MapPin, 
  Video, 
  Pill, 
  HelpCircle,
  Users,
  Calendar,
  Globe
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const quickActions = [
    { title: t('viewPolicy'), icon: FileText, path: '/policy' },
    { title: t('searchCoverage'), icon: Search, path: '/coverage' },
    { title: t('findDoctor'), icon: MapPin, path: '/providers' },
    { title: t('telemedicine'), icon: Video, path: '/telemedicine' },
    { title: t('prescriptions'), icon: Pill, path: '/prescriptions' },
    { title: t('support'), icon: HelpCircle, path: '/support' },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader 
        title={t('dashboard')}
        rightContent={
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="text-xs"
          >
            {t('logout')}
          </Button>
        }
      />

      <div className="p-4 space-y-6 max-w-full">
        {/* Welcome Section */}
        <div className="travel-gradient rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-8 h-8" />
            <div>
              <h2 className="text-xl font-bold">{t('welcome')}, {user?.name}!</h2>
              <p className="text-white/90 text-sm">Your health coverage abroad</p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide">Policy Active</p>
                <p className="text-lg font-semibold">{formatDate(user?.policyStartDate || '')}</p>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wide">Valid Until</p>
                <p className="text-lg font-semibold">{formatDate(user?.policyEndDate || '')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-travel-teal" />
              <span>Policy Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Policy Number</span>
              <span className="font-medium">{user?.policyNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {t('dependents')}
              </span>
              <span className="font-medium">{user?.dependents}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Coverage Period
              </span>
              <span className="font-medium">365 days</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                icon={action.icon}
                onClick={() => navigate(action.path)}
              />
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-red-800">Emergency Assistance</h4>
                <p className="text-red-700 text-sm">24/7 support: +1-800-TRAVEL</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
