
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, Phone, Star, CheckCircle } from 'lucide-react';

const BookingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { providerId, condition } = location.state || {};
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Mock provider data
  const provider = {
    id: providerId,
    name: 'Dr. Sarah Johnson',
    type: 'General Practice',
    specialty: 'Internal Medicine',
    address: '456 Health Ave, Medical District',
    phone: '+1-555-0456',
    rating: 4.9,
    languages: ['English', 'Spanish'],
    consultationFee: 'Covered by insurance'
  };

  const availableDates = [
    '2024-06-06',
    '2024-06-07',
    '2024-06-08',
    '2024-06-10',
    '2024-06-11'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooked(true);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileHeader title="Booking Confirmed" showBack={false} />
        
        <div className="p-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
              <p className="text-green-700 mb-4">
                Your appointment has been successfully scheduled.
              </p>
              
              <div className="bg-white p-4 rounded-lg mb-4 text-left">
                <h3 className="font-semibold mb-2">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{provider.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{provider.address}</span>
                  </div>
                  {condition && (
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-500">📋</span>
                      <span>For: {condition}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full bg-travel-teal hover:bg-travel-teal/90"
                  onClick={() => navigate('/dashboard')}
                >
                  Back to Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/providers')}
                >
                  View All Appointments
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
      <MobileHeader title="Book Appointment" showBack={true} />

      <div className="p-4 space-y-6">
        {/* Provider Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{provider.name}</h3>
                <p className="text-sm text-gray-600">{provider.type}</p>
                <p className="text-sm text-gray-600">{provider.specialty}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{provider.rating}</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{provider.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{provider.phone}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs text-gray-500">Languages:</span>
              <div className="flex space-x-1">
                {provider.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            {condition && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Booking for:</strong> {condition}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-travel-teal" />
              <span>Select Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {availableDates.map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? "default" : "outline"}
                  className="h-auto p-3 text-left flex flex-col items-start"
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="font-medium">{formatDate(date)}</span>
                  <span className="text-xs text-gray-600">Available</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <Clock className="w-5 h-5 text-travel-teal" />
                <span>Select Time</span>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Notes (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Describe your symptoms or concerns..."
              value={patientNotes}
              onChange={(e) => setPatientNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Fee:</strong> {provider.consultationFee}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Book Button */}
        <Button
          className="w-full bg-travel-teal hover:bg-travel-teal/90 h-12"
          onClick={handleBooking}
          disabled={!selectedDate || !selectedTime}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingPage;
