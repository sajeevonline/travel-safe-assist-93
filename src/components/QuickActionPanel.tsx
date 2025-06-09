
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Phone, 
  MapPin, 
  Heart, 
  Shield, 
  Globe, 
  Calendar,
  Users,
  AlertCircle,
  MessageSquare,
  Video,
  Clock
} from 'lucide-react';

const QuickActionPanel = () => {
  const { user } = useAuth();

  const sendChatMessage = (message: string) => {
    // This would integrate with the chat interface to send a message
    console.log('Sending message:', message);
  };

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
            onClick={() => sendChatMessage('Emergency help needed')}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
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
            onClick={() => sendChatMessage('Show my policy details')}
          >
            View in Chat
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
            onClick={() => sendChatMessage('Find doctors near me')}
          >
            Find in Chat
          </Button>
        </CardContent>
      </Card>

      {/* Quick Chat Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => sendChatMessage('I need telemedicine consultation')}
          >
            <Video className="w-4 h-4 mr-2" />
            Telemedicine
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => sendChatMessage('Book appointment with doctor')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => sendChatMessage('Check my coverage')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Check Coverage
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => sendChatMessage('Find doctors near me')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Find Doctors
          </Button>
        </CardContent>
      </Card>

      {/* Health Status */}
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
            onClick={() => sendChatMessage('I want a health checkup')}
          >
            <Heart className="w-4 h-4 mr-1" />
            Health Check
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Clock className="w-4 h-4 mr-2 text-travel-teal" />
            Recent Chat Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-xs h-auto p-2"
            onClick={() => sendChatMessage('Show my previous doctor search')}
          >
            <div className="text-left">
              <p className="font-medium">Doctor search</p>
              <p className="text-gray-500">2 hours ago</p>
            </div>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-xs h-auto p-2"
            onClick={() => sendChatMessage('Show my policy details again')}
          >
            <div className="text-left">
              <p className="font-medium">Policy details</p>
              <p className="text-gray-500">Yesterday</p>
            </div>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start text-xs h-auto p-2"
            onClick={() => sendChatMessage('Check coverage for dental')}
          >
            <div className="text-left">
              <p className="font-medium">Dental coverage</p>
              <p className="text-gray-500">3 days ago</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Chat Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-blue-800">💡 Chat Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-blue-700 space-y-1">
            <p>• Say "Emergency" for immediate help</p>
            <p>• Ask "Find doctors in [city]"</p>
            <p>• Say "Book telemedicine call"</p>
            <p>• Ask "What's covered for [condition]"</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionPanel;
