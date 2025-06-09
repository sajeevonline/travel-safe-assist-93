
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MapPin, 
  Heart, 
  Shield, 
  Globe, 
  Calendar,
  Users,
  AlertCircle
} from 'lucide-react';

const QuickActionPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 space-y-4 overflow-y-auto">
      {/* Emergency Section */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-800 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Emergency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            onClick={() => window.open('tel:112')}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call 112
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-200"
            onClick={() => navigate('/support')}
          >
            Emergency Chat
          </Button>
        </CardContent>
      </Card>

      {/* Policy Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Shield className="w-4 h-4 mr-2 text-travel-teal" />
            Policy Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Status</span>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Policy</span>
            <span className="text-xs font-medium">{user?.policyNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Coverage</span>
            <span className="text-xs font-medium">€100,000</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/policy')}
          >
            View Details
          </Button>
        </CardContent>
      </Card>

      {/* Location Coverage */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-travel-teal" />
            Current Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Location</span>
            <span className="text-xs font-medium">Paris, France</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Coverage</span>
            <Badge className="bg-green-100 text-green-800">Full</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Nearby Doctors</span>
            <span className="text-xs font-medium">12 available</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/providers')}
          >
            Find Doctors
          </Button>
        </CardContent>
      </Card>

      {/* Health Monitoring */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Heart className="w-4 h-4 mr-2 text-travel-teal" />
            Health Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Last Check</span>
            <span className="text-xs font-medium">2 days ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Status</span>
            <Badge className="bg-green-100 text-green-800">Good</Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/telemedicine')}
          >
            <Heart className="w-4 h-4 mr-1" />
            Health Check
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => navigate('/telemedicine-booking')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Telemedicine
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => navigate('/booking')}
          >
            <Users className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => navigate('/coverage')}
          >
            <Globe className="w-4 h-4 mr-2" />
            Check Coverage
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-xs text-gray-600 p-2 bg-gray-100 rounded">
            Telemedicine call completed - Dr. Sarah Chen
          </div>
          <div className="text-xs text-gray-600 p-2 bg-gray-100 rounded">
            Policy viewed - Coverage details
          </div>
          <div className="text-xs text-gray-600 p-2 bg-gray-100 rounded">
            Doctor search - Paris, France
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionPanel;
