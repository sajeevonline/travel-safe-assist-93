
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Calendar, MapPin, Phone, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InlinePolicyView = () => {
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const coverageDetails = [
    { item: 'Emergency Medical Care', limit: '€100,000', covered: true },
    { item: 'Hospitalization', limit: '€100,000', covered: true },
    { item: 'Emergency Dental', limit: '€1,500', covered: true },
    { item: 'Prescription Medications', limit: '€5,000', covered: true },
    { item: 'Medical Evacuation', limit: '€1,000,000', covered: true },
    { item: 'Telemedicine Consultations', limit: 'Unlimited', covered: true },
    { item: 'Pre-existing Conditions', limit: 'Not Covered', covered: false },
  ];

  return (
    <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto">
      {/* Policy Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900">Your Policy Details</h3>
        <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
      </div>

      {/* Policy Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
        <Card>
          <CardContent className="p-2 lg:p-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-3 h-3 lg:w-4 lg:h-4 text-travel-teal" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600">Policy Number</p>
                <p className="font-semibold text-xs lg:text-sm truncate">{user?.policyNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2 lg:p-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-travel-teal" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600">Valid Until</p>
                <p className="font-semibold text-xs lg:text-sm">{formatDate(user?.policyEndDate || '')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2 lg:p-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-travel-teal" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600">Coverage Area</p>
                <p className="font-semibold text-xs lg:text-sm">Worldwide</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2 lg:p-3">
            <div className="flex items-center space-x-2">
              <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-travel-teal" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600">Emergency Line</p>
                <p className="font-semibold text-xs lg:text-sm">+1-800-CARE</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm lg:text-base flex items-center">
            <Shield className="w-3 h-3 lg:w-4 lg:h-4 mr-2 text-travel-teal" />
            Coverage Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 lg:space-y-2">
          {coverageDetails.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <span className="text-xs lg:text-sm text-gray-700 truncate flex-1 mr-2">{item.item}</span>
              <div className="flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
                <span className="text-xs lg:text-sm font-medium">{item.limit}</span>
                <Badge 
                  variant={item.covered ? "default" : "secondary"}
                  className={`${item.covered ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"} text-xs`}
                >
                  {item.covered ? "✓" : "✗"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
          <Download className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
          <Phone className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
          Call Support
        </Button>
      </div>
    </div>
  );
};

export default InlinePolicyView;
