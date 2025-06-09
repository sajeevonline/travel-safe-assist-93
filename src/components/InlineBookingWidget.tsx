
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, MapPin, CheckCircle } from 'lucide-react';

interface InlineBookingWidgetProps {
  onComplete: () => void;
}

const InlineBookingWidget: React.FC<InlineBookingWidgetProps> = ({ onComplete }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      specialty: 'General Practice',
      nextAvailable: 'Today 2:30 PM',
      price: '€45',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Dr. Michael Ross',
      specialty: 'Internal Medicine',
      nextAvailable: 'Today 4:00 PM',
      price: '€50',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      specialty: 'Family Medicine',
      nextAvailable: 'Tomorrow 9:00 AM',
      price: '€45',
      rating: 4.8
    }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (isBooked) {
    return (
      <div className="p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your appointment with {selectedDoctor?.name} is confirmed for {selectedDate} at {selectedTime}
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-green-700">
            📧 Confirmation sent to your email<br/>
            📱 SMS reminder will be sent 1 hour before
          </p>
        </div>
        <Button onClick={onComplete} className="bg-travel-teal hover:bg-travel-teal/90">
          Continue Chatting
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold">Book an Appointment</h3>

      {/* Doctor Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Doctor</label>
        <div className="space-y-2">
          {availableDoctors.map((doctor) => (
            <Card 
              key={doctor.id} 
              className={`cursor-pointer transition-colors ${
                selectedDoctor?.id === doctor.id ? 'ring-2 ring-travel-teal bg-travel-teal/5' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm">{doctor.name}</h4>
                    <p className="text-xs text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{doctor.nextAvailable}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{doctor.price}</p>
                    <p className="text-xs text-gray-600">⭐ {doctor.rating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedDoctor && (
        <>
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Date</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="text-sm"
            />
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Reason for Visit */}
          {selectedTime && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Visit</label>
              <Input
                placeholder="e.g., General checkup, flu symptoms..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="text-sm"
              />
            </div>
          )}

          {/* Booking Summary */}
          {selectedTime && reason && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm text-blue-800 mb-2">Booking Summary</h4>
                <div className="space-y-1 text-xs text-blue-700">
                  <div className="flex justify-between">
                    <span>Doctor:</span>
                    <span>{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span>{selectedDoctor.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Your Cost:</span>
                    <span>€0 (Covered by insurance)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Book Button */}
          {selectedTime && reason && (
            <Button 
              onClick={handleBooking}
              className="w-full bg-travel-teal hover:bg-travel-teal/90"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default InlineBookingWidget;
