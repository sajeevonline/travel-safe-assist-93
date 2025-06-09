
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
    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
      {/* Policy Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Your Policy Details</h3>
        <Badge className="bg-green-100 text-green-800">Active</Badge>
      </div>

      {/* Policy Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-travel-teal" />
              <div>
                <p className="text-xs text-gray-600">Policy Number</p>
                <p className="font-semibold text-sm">{user?.policyNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-travel-teal" />
              <div>
                <p className="text-xs text-gray-600">Valid Until</p>
                <p className="font-semibold text-sm">{formatDate(user?.policyEndDate || '')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-travel-teal" />
              <div>
                <p className="text-xs text-gray-600">Coverage Area</p>
                <p className="font-semibold text-sm">Worldwide</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-travel-teal" />
              <div>
                <p className="text-xs text-gray-600">Emergency Line</p>
                <p className="font-semibold text-sm">+1-800-CARE</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Details */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Shield className="w-4 h-4 mr-2 text-travel-teal" />
            Coverage Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {coverageDetails.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-700">{item.item}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.limit}</span>
                <Badge 
                  variant={item.covered ? "default" : "secondary"}
                  className={item.covered ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                >
                  {item.covered ? "✓" : "✗"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Phone className="w-4 h-4 mr-2" />
          Call Support
        </Button>
      </div>
    </div>
  );
};

export default InlinePolicyView;
