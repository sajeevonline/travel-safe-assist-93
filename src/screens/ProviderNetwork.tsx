
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  Star,
  Filter,
  Navigation
} from 'lucide-react';

const ProviderNetwork = () => {
  const { t } = useLanguage();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'General Practice', 'Emergency', 'Cardiology', 'Dentistry', 'Orthopedics', 'Pediatrics'];

  const providers = [
    {
      id: 1,
      name: 'City General Hospital',
      type: 'Hospital',
      specialty: 'Emergency',
      address: '123 Main St, Downtown',
      distance: '0.8 km',
      rating: 4.8,
      available: true,
      phone: '+1-555-0123',
      languages: ['English', 'Spanish'],
      acceptsInsurance: true
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      type: 'Doctor',
      specialty: 'General Practice',
      address: '456 Health Ave, Medical District',
      distance: '1.2 km',
      rating: 4.9,
      available: true,
      phone: '+1-555-0456',
      languages: ['English', 'French'],
      acceptsInsurance: true
    },
    {
      id: 3,
      name: 'Metro Dental Clinic',
      type: 'Clinic',
      specialty: 'Dentistry',
      address: '789 Smile Blvd, Central',
      distance: '2.1 km',
      rating: 4.6,
      available: false,
      phone: '+1-555-0789',
      languages: ['English'],
      acceptsInsurance: true
    },
    {
      id: 4,
      name: 'Heart Care Center',
      type: 'Specialist',
      specialty: 'Cardiology',
      address: '321 Cardiac Way, Uptown',
      distance: '3.5 km',
      rating: 4.7,
      available: true,
      phone: '+1-555-0321',
      languages: ['English', 'German'],
      acceptsInsurance: true
    }
  ];

  const filteredProviders = providers.filter(provider => 
    selectedSpecialty === 'All' || provider.specialty === selectedSpecialty
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title={t('findDoctor')} showBack={true} />

      <div className="p-4 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Location Search */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by location or use current location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Specialty</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map View Toggle */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Nearby Providers ({filteredProviders.length})</h3>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-1" />
            Map View
          </Button>
        </div>

        {/* Provider List */}
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{provider.name}</h4>
                    <p className="text-sm text-gray-600">{provider.type} • {provider.specialty}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.address}</span>
                    <Badge variant="outline" className="ml-auto">
                      {provider.distance}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{provider.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <Badge variant={provider.available ? "default" : "secondary"}>
                      {provider.available ? "Available Now" : "Busy"}
                    </Badge>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs text-gray-500">Languages:</span>
                  <div className="flex space-x-1">
                    {provider.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-travel-teal hover:bg-travel-teal/90"
                    disabled={!provider.available}
                  >
                    {t('bookAppointment')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>

                {provider.acceptsInsurance && (
                  <div className="mt-3 p-2 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-700 font-medium">
                      ✓ Accepts your insurance - No upfront payment required
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-red-800">Emergency Services</h4>
                <p className="text-red-700 text-sm">Call 911 for immediate medical emergency</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderNetwork;
