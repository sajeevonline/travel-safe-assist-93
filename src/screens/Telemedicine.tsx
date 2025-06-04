
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Calendar, 
  Clock, 
  User, 
  FileText,
  Upload,
  Camera
} from 'lucide-react';

const Telemedicine = () => {
  const { t } = useLanguage();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Emily Chen',
      specialty: 'General Practice',
      languages: ['English', 'Mandarin'],
      rating: 4.9,
      nextAvailable: 'Today 2:30 PM',
      consultationFee: 'Covered by insurance'
    },
    {
      id: 2,
      name: 'Dr. Ahmed Hassan',
      specialty: 'Internal Medicine',
      languages: ['English', 'Arabic'],
      rating: 4.8,
      nextAvailable: 'Today 4:00 PM',
      consultationFee: 'Covered by insurance'
    },
    {
      id: 3,
      name: 'Dr. Maria Rodriguez',
      specialty: 'Pediatrics',
      languages: ['English', 'Spanish'],
      rating: 4.9,
      nextAvailable: 'Tomorrow 9:00 AM',
      consultationFee: 'Covered by insurance'
    }
  ];

  const upcomingConsultations = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Practice',
      date: '2024-06-05',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'Follow-up'
    }
  ];

  const pastConsultations = [
    {
      id: 1,
      doctor: 'Dr. Michael Brown',
      specialty: 'Dermatology',
      date: '2024-05-28',
      time: '3:00 PM',
      duration: '25 mins',
      prescription: 'Topical cream prescribed'
    },
    {
      id: 2,
      doctor: 'Dr. Lisa Wang',
      specialty: 'General Practice',
      date: '2024-05-15',
      time: '11:30 AM',
      duration: '20 mins',
      prescription: 'Blood test recommended'
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title={t('telemedicine')} showBack={true} />

      <div className="p-4">
        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Schedule New Consultation */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-travel-teal" />
                  <span>{t('scheduleConsultation')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect with certified doctors through secure video calls. 
                  Your insurance covers telemedicine consultations.
                </p>
                
                <div className="bg-green-50 p-3 rounded-lg mb-4">
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
                <Card key={doctor.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex space-x-1">
                            {doctor.languages.map((lang, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="mb-1">★ {doctor.rating}</Badge>
                        <p className="text-xs text-green-600 font-medium">{doctor.nextAvailable}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{doctor.consultationFee}</span>
                      <Button size="sm" className="bg-travel-teal hover:bg-travel-teal/90">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Time Slot Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Time Slot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={selectedTimeSlot === slot ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Consultations */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upcoming Consultations</h3>
              {upcomingConsultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{consultation.doctor}</h4>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        <p className="text-sm text-gray-600">{consultation.type}</p>
                      </div>
                      <Badge variant="default">Confirmed</Badge>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{consultation.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{consultation.time}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-travel-teal hover:bg-travel-teal/90">
                        <Video className="w-4 h-4 mr-1" />
                        Join Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {upcomingConsultations.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Upcoming Consultations</h3>
                    <p className="text-gray-600">Schedule a consultation to get started</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Consultation History */}
          <TabsContent value="history" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Past Consultations</h3>
              {pastConsultations.map((consultation) => (
                <Card key={consultation.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{consultation.doctor}</h4>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                      </div>
                      <Badge variant="outline">{consultation.duration}</Badge>
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{consultation.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{consultation.time}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-700">{consultation.prescription}</p>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Telemedicine;
