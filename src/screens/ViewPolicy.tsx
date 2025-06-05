
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Users, 
  Calendar,
  Shield,
  Check
} from 'lucide-react';

const ViewPolicy = () => {
  const { profile } = useAuth();
  const { t } = useLanguage();

  const coverageItems = [
    { name: 'Emergency Medical Treatment', covered: true, limit: `AED 367,000` },
    { name: 'Hospital Accommodation', covered: true, limit: `AED 735/day` },
    { name: 'Emergency Dental', covered: true, limit: `AED 7,350` },
    { name: 'Prescription Medicines', covered: true, limit: `AED 1,835` },
    { name: 'Medical Evacuation', covered: true, limit: `AED 1,835,000` },
    { name: 'Repatriation', covered: true, limit: 'Unlimited' },
    { name: 'Pre-existing Conditions', covered: false, limit: 'N/A' },
    { name: 'Routine Check-ups', covered: false, limit: 'N/A' },
  ];

  const dependents = [
    { name: 'Fatima Al-Zahra', relationship: 'Spouse', age: 34 },
    { name: 'Omar Al-Mansouri', relationship: 'Child', age: 8 },
  ];

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-travel-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading policy details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - only show on mobile */}
      <div className="lg:hidden">
        <MobileHeader 
          title={t('policyDetails')} 
          showBack={true}
          rightContent={
            <Button size="sm" className="bg-travel-teal hover:bg-travel-teal/90">
              <Download className="w-4 h-4 mr-1" />
              {t('downloadPdf')}
            </Button>
          }
        />
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block lg:p-8 lg:pb-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('policyDetails')}</h1>
            <p className="text-gray-600 mt-2">View and manage your insurance policy details</p>
          </div>
          <Button className="bg-travel-teal hover:bg-travel-teal/90">
            <Download className="w-4 h-4 mr-2" />
            {t('downloadPdf')}
          </Button>
        </div>
      </div>

      <div className="lg:p-8 p-4 space-y-6">
        {/* Policy Header */}
        <Card className="travel-gradient text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">International Travel Insurance - UAE</h2>
                <p className="text-white/90">Policy Number: {profile.policy_number}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-sm">Start Date</p>
                <p className="font-semibold">{new Date(profile.policy_start_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">End Date</p>
                <p className="font-semibold">{new Date(profile.policy_end_date).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policyholder Details */}
        <Card>
          <CardHeader>
            <CardTitle>Policyholder Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name</span>
              <span className="font-medium">{profile.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{profile.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Policy Type</span>
              <span className="font-medium">Individual + Family</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Coverage Region</span>
              <span className="font-medium">UAE & Worldwide</span>
            </div>
          </CardContent>
        </Card>

        {/* Dependents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-travel-teal" />
              <span>{t('dependents')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dependents.map((dependent, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{dependent.name}</p>
                    <p className="text-sm text-gray-600">{dependent.relationship} • Age {dependent.age}</p>
                  </div>
                  <Badge variant="secondary">Covered</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coverage Details */}
        <Card>
          <CardHeader>
            <CardTitle>{t('coverage')} Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {coverageItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.covered ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {item.covered ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <span className="text-red-600 text-xs">✕</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-600">Limit: {item.limit}</p>
                    </div>
                  </div>
                  <Badge variant={item.covered ? "default" : "secondary"}>
                    {item.covered ? "Covered" : "Not Covered"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-amber-700 space-y-2">
              <li>• Always carry your policy card when traveling</li>
              <li>• Contact emergency assistance +971-800-HELP before seeking treatment</li>
              <li>• Keep all medical receipts for reimbursement</li>
              <li>• Pre-authorization required for treatments over AED 3,670</li>
              <li>• Coverage valid in UAE and worldwide destinations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewPolicy;
