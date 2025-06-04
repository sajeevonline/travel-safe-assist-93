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
      {/* Mobile Header - only show on mobile */}
      <div className="lg:hidden">
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
      </div>

      {/* Main Content */}
      <div className="lg:p-8 p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Desktop Header */}
          <div className="hidden lg:block">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard')}</h1>
            <p className="text-gray-600">Welcome back, {user?.name}! Manage your travel insurance coverage.</p>
          </div>

          {/* Welcome Section */}
          <div className="travel-gradient rounded-xl p-6 text-white lg:p-8">
            <div className="flex items-center space-x-4 mb-6">
              <Globe className="w-10 h-10 lg:w-12 lg:h-12" />
              <div>
                <h2 className="text-xl lg:text-2xl font-bold">{t('welcome')}, {user?.name}!</h2>
                <p className="text-white/90 text-sm lg:text-base">Your health coverage abroad</p>
              </div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 lg:p-6 backdrop-blur-sm">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-white/80 text-xs uppercase tracking-wide">Policy Active</p>
                  <p className="text-lg font-semibold">{formatDate(user?.policyStartDate || '')}</p>
                </div>
                <div>
                  <p className="text-white/80 text-xs uppercase tracking-wide">Valid Until</p>
                  <p className="text-lg font-semibold">{formatDate(user?.policyEndDate || '')}</p>
                </div>
                <div className="hidden lg:block">
                  <p className="text-white/80 text-xs uppercase tracking-wide">Policy Number</p>
                  <p className="text-lg font-semibold">{user?.policyNumber}</p>
                </div>
                <div className="hidden lg:block">
                  <p className="text-white/80 text-xs uppercase tracking-wide">Coverage Period</p>
                  <p className="text-lg font-semibold">365 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Policy Overview */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-travel-teal" />
                  <span>Policy Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
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
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Coverage Period
                      </span>
                      <span className="font-medium">365 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Policy Type</span>
                      <span className="font-medium">Individual + Family</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xl">!</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800">24/7 Support</h4>
                    <p className="text-red-700 text-sm">+1-800-TRAVEL</p>
                    <p className="text-red-600 text-xs mt-1">Always available worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions - Mobile Only */}
          <div className="lg:hidden">
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

          {/* Recent Activity - Desktop Only */}
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-travel-teal" />
                    <div className="flex-1">
                      <p className="font-medium">Policy Downloaded</p>
                      <p className="text-sm text-gray-600">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Search className="w-5 h-5 text-travel-teal" />
                    <div className="flex-1">
                      <p className="font-medium">Coverage Search: "Dental Emergency"</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-travel-teal" />
                    <div className="flex-1">
                      <p className="font-medium">Provider Search in Paris</p>
                      <p className="text-sm text-gray-600">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
