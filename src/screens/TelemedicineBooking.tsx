
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Video, Calendar, Clock, User, Star, CheckCircle } from 'lucide-react';

const TelemedicineBooking = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { condition } = location.state || {};
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Emily Chen',
      specialty: 'General Practice',
      languages: ['English', 'Mandarin'],
      rating: 4.9,
      nextAvailable: 'Today 2:30 PM',
      consultationFee: 'Covered by insurance',
      experience: '15 years'
    },
    {
      id: 2,
      name: 'Dr. Ahmed Hassan',
      specialty: 'Internal Medicine',
      languages: ['English', 'Arabic'],
      rating: 4.8,
      nextAvailable: 'Today 4:00 PM',
      consultationFee: 'Covered by insurance',
      experience: '12 years'
    },
    {
      id: 3,
      name: 'Dr. Maria Rodriguez',
      specialty: 'Emergency Medicine',
      languages: ['English', 'Spanish'],
      rating: 4.9,
      nextAvailable: 'Tomorrow 9:00 AM',
      consultationFee: 'Covered by insurance',
      experience: '18 years'
    }
  ];

  const timeSlots = [
    '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleBooking = () => {
    if (!selectedDoctor || !selectedTime) {
      alert('Please select both doctor and time');
      return;
    }
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooked(true);
    }, 1000);
  };

  const handleJoinCall = () => {
    navigate('/telemedicine-call', { 
      state: { 
        doctor: selectedDoctor, 
        time: selectedTime, 
        condition 
      } 
    });
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileHeader title="Telemedicine Booked" showBack={false} />
        
        <div className="p-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-800 mb-2">Telemedicine Session Booked!</h2>
              <p className="text-green-700 mb-4">
                Your video consultation has been successfully scheduled.
              </p>
              
              <div className="bg-white p-4 rounded-lg mb-4 text-left">
                <h3 className="font-semibold mb-2">Session Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{selectedDoctor.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Today at {selectedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-gray-500" />
                    <span>Video Consultation</span>
                  </div>
                  {condition && (
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-500">📋</span>
                      <span>For: {condition}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-blue-800 text-sm">
                  You'll receive a notification 5 minutes before your consultation starts.
                </p>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full bg-travel-teal hover:bg-travel-teal/90"
                  onClick={handleJoinCall}
                >
                  <Video className="w-4 h-4 mr-1" />
                  Join Video Call Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/telemedicine')}
                >
                  View All Consultations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Book Telemedicine" showBack={true} />

      <div className="p-4 space-y-6">
        {/* Header Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Video className="w-8 h-8 text-travel-teal" />
              <div>
                <h3 className="font-semibold">Video Consultation</h3>
                <p className="text-sm text-gray-600">Connect with certified doctors instantly</p>
              </div>
            </div>
            
            {condition && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Consultation for:</strong> {condition}
                </p>
              </div>
            )}

            <div className="bg-green-50 p-3 rounded-lg mt-3">
              <p className="text-green-800 text-sm font-medium">
                ✓ No additional cost - Covered by your travel insurance
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Available Doctors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Doctors</h3>
          {availableDoctors.map((doctor) => (
            <Card 
              key={doctor.id} 
              className={`cursor-pointer transition-all ${
                selectedDoctor?.id === doctor.id ? 'border-travel-teal bg-travel-teal/5' : ''
              }`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500">{doctor.experience} experience</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">{doctor.nextAvailable}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs text-gray-500">Languages:</span>
                  <div className="flex space-x-1">
                    {doctor.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{doctor.consultationFee}</span>
                  {selectedDoctor?.id === doctor.id && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Time Selection */}
        {selectedDoctor && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Clock className="w-5 h-5 text-travel-teal" />
                <span>Select Time (Today)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Patient Notes */}
        {selectedDoctor && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Describe Your Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Please describe your symptoms, concerns, or questions..."
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </CardContent>
          </Card>
        )}

        {/* Booking Summary */}
        {selectedDoctor && selectedTime && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Consultation Summary</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                <p><strong>Time:</strong> Today at {selectedTime}</p>
                <p><strong>Type:</strong> Video Consultation</p>
                <p><strong>Fee:</strong> {selectedDoctor.consultationFee}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Book Button */}
        <Button
          className="w-full bg-travel-teal hover:bg-travel-teal/90 h-12"
          onClick={handleBooking}
          disabled={!selectedDoctor || !selectedTime}
        >
          <Video className="w-4 h-4 mr-1" />
          Book Video Consultation
        </Button>
      </div>
    </div>
  );
};

export default TelemedicineBooking;
