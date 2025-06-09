
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Clock, Navigation, Calendar } from 'lucide-react';

interface Provider {
  id: number;
  name: string;
  type: string;
  specialty: string;
  address: string;
  distance: string;
  rating: number;
  available: boolean;
  phone: string;
  languages: string[];
  acceptsInsurance: boolean;
  nextAvailable?: string;
}

interface InlineProviderSearchProps {
  onBook: (provider: Provider) => void;
}

const InlineProviderSearch: React.FC<InlineProviderSearchProps> = ({ onBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const providers: Provider[] = [
    {
      id: 1,
      name: 'City General Hospital',
      type: 'Hospital',
      specialty: 'Emergency Care',
      address: '123 Main St, Downtown',
      distance: '0.8 km',
      rating: 4.8,
      available: true,
      phone: '+1-555-0123',
      languages: ['English', 'Spanish'],
      acceptsInsurance: true,
      nextAvailable: 'Now'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      type: 'Doctor',
      specialty: 'General Practice',
      address: 'Medical Center, Suite 201',
      distance: '1.2 km',
      rating: 4.9,
      available: true,
      phone: '+1-555-0456',
      languages: ['English', 'French'],
      acceptsInsurance: true,
      nextAvailable: 'In 30 min'
    },
    {
      id: 3,
      name: 'Metro Urgent Care',
      type: 'Clinic',
      specialty: 'Urgent Care',
      address: '789 Health Blvd',
      distance: '2.1 km',
      rating: 4.6,
      available: true,
      phone: '+1-555-0789',
      languages: ['English'],
      acceptsInsurance: true,
      nextAvailable: 'In 15 min'
    }
  ];

  const types = ['All', 'Hospital', 'Doctor', 'Clinic'];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || provider.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-3 lg:p-4 space-y-3 lg:space-y-4 max-h-80 lg:max-h-96 overflow-y-auto">
      {/* Search and Filter */}
      <div className="space-y-2 lg:space-y-3">
        <Input
          placeholder="Search by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-xs lg:text-sm h-8 lg:h-9"
        />
        
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {types.map((type) => (
            <Badge
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              className="cursor-pointer text-xs h-6 px-2"
              onClick={() => setSelectedType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Provider List */}
      <div className="space-y-2 lg:space-y-3">
        {filteredProviders.map((provider) => (
          <Card key={provider.id} className="border border-gray-200">
            <CardContent className="p-2 lg:p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0 mr-2">
                  <h4 className="font-semibold text-xs lg:text-sm truncate">{provider.name}</h4>
                  <p className="text-xs text-gray-600">{provider.type} • {provider.specialty}</p>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{provider.rating}</span>
                </div>
              </div>

              <div className="space-y-1 mb-2 lg:mb-3">
                <div className="flex items-center space-x-1 lg:space-x-2 text-xs text-gray-600">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate flex-1">{provider.address}</span>
                  <Badge variant="outline" className="text-xs h-5 px-1 flex-shrink-0">
                    {provider.distance}
                  </Badge>
                </div>

                <div className="flex items-center space-x-1 lg:space-x-2 text-xs">
                  <Clock className="w-3 h-3 text-gray-600 flex-shrink-0" />
                  <Badge variant={provider.available ? "default" : "secondary"} className="text-xs h-5 px-1">
                    {provider.nextAvailable}
                  </Badge>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center space-x-1 mb-2 lg:mb-3">
                <span className="text-xs text-gray-500 flex-shrink-0">Languages:</span>
                <div className="flex flex-wrap gap-1">
                  {provider.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs h-5 px-1">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-1 lg:space-x-2 mb-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-travel-teal hover:bg-travel-teal/90 text-xs h-7 lg:h-8"
                  onClick={() => onBook(provider)}
                  disabled={!provider.available}
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  Book
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7 lg:h-8 w-8 lg:w-9 p-0">
                  <Phone className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-7 lg:h-8 w-8 lg:w-9 p-0">
                  <Navigation className="w-3 h-3" />
                </Button>
              </div>

              {provider.acceptsInsurance && (
                <div className="p-1 lg:p-2 bg-green-50 rounded text-xs text-green-700">
                  ✓ Accepts your insurance - No upfront payment
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InlineProviderSearch;
