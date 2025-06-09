
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Phone, Calendar, Clock, User, CheckCircle } from 'lucide-react';

interface InlineTelemedicineWidgetProps {
  onConnect: () => void;
}

const InlineTelemedicineWidget: React.FC<InlineTelemedicineWidgetProps> = ({ onConnect }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Emily Johnson',
      specialty: 'General Practice',
      availability: 'Available Now',
      price: '€25',
      rating: 4.9,
      languages: ['English', 'Spanish'],
      waitTime: '< 5 min'
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      specialty: 'Travel Medicine',
      availability: 'Available in 10 min',
      price: '€35',
      rating: 4.8,
      languages: ['English', 'French'],
      waitTime: '10 min'
    },
    {
      id: 3,
      name: 'Dr. Lisa Zhang',
      specialty: 'Emergency Care',
      availability: 'Available Now',
      price: '€40',
      rating: 4.7,
      languages: ['English', 'Mandarin'],
      waitTime: '< 2 min'
    }
  ];

  const handleConnect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);
  };

  if (isConnected) {
    return (
      <div className="p-6 text-center space-y-4">
        <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center relative">
          <div className="text-white text-center">
            <Video className="w-12 h-12 mx-auto mb-2" />
            <p>Connected to {selectedDoctor.name}</p>
          </div>
          <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-xs">
            Live
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={onConnect}>
            End Call
          </Button>
        </div>
        
        <p className="text-xs text-gray-600">
          Call duration: 00:02:15 • No additional charges
        </p>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-travel-teal rounded-full flex items-center justify-center mx-auto mb-4">
          <Video className="w-8 h-8 text-white animate-pulse" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connecting to {selectedDoctor.name}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please wait while we establish a secure connection...
        </p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-travel-teal rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-travel-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-travel-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold">Telemedicine Consultation</h3>
      <p className="text-sm text-gray-600">Connect with a doctor via video call instantly</p>

      {/* Available Doctors */}
      <div className="space-y-3">
        {availableDoctors.map((doctor) => (
          <Card key={doctor.id} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{doctor.name}</h4>
                  <p className="text-xs text-gray-600">{doctor.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{doctor.price}</p>
                  <p className="text-xs text-gray-600">⭐ {doctor.rating}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <Badge 
                    variant={doctor.waitTime.includes('<') ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {doctor.availability}
                  </Badge>
                </div>
                <span className="text-xs text-gray-600">Wait: {doctor.waitTime}</span>
              </div>

              {/* Languages */}
              <div className="flex items-center space-x-1 mb-3">
                <span className="text-xs text-gray-500">Languages:</span>
                {doctor.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>

              {/* Connect Button */}
              <Button 
                onClick={() => handleConnect(doctor)}
                className="w-full bg-travel-teal hover:bg-travel-teal/90"
                size="sm"
              >
                <Video className="w-4 h-4 mr-2" />
                Start Video Call - {doctor.price}
              </Button>

              {/* Insurance Note */}
              <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                ✓ Covered by your policy - You pay €0
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-3">
          <h4 className="font-semibold text-sm text-blue-800 mb-2">How it works:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Select a doctor and click "Start Video Call"</li>
            <li>• You'll be connected within minutes</li>
            <li>• Consultation is fully covered by your insurance</li>
            <li>• Get prescriptions sent to nearby pharmacies</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InlineTelemedicineWidget;
