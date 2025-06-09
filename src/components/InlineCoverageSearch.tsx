
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Shield, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

const InlineCoverageSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Emergency', 'General Care', 'Dental', 'Mental Health', 'Pharmacy'];

  const coverageItems = [
    {
      condition: 'Emergency Room Visit',
      category: 'Emergency',
      covered: true,
      coverageDescription: 'Full coverage for emergency medical treatment',
      limitAmount: '€100,000 per incident',
      notes: 'Available 24/7 worldwide'
    },
    {
      condition: 'General Practitioner Visit',
      category: 'General Care',
      covered: true,
      coverageDescription: 'Consultation with general practitioners',
      limitAmount: '€100 per visit',
      notes: 'Up to 10 visits per year'
    },
    {
      condition: 'Emergency Dental Treatment',
      category: 'Dental',
      covered: true,
      coverageDescription: 'Emergency dental care for accidents or severe pain',
      limitAmount: '€1,500 per year',
      notes: 'Does not include routine cleanings'
    },
    {
      condition: 'Prescription Medications',
      category: 'Pharmacy',
      covered: true,
      coverageDescription: 'Prescribed medications from licensed pharmacies',
      limitAmount: '€5,000 per year',
      notes: 'Generic drugs preferred'
    },
    {
      condition: 'Mental Health Counseling',
      category: 'Mental Health',
      covered: true,
      coverageDescription: 'Counseling and therapy sessions',
      limitAmount: '€2,000 per year',
      notes: 'Up to 20 sessions per year'
    },
    {
      condition: 'Cosmetic Surgery',
      category: 'General Care',
      covered: false,
      coverageDescription: 'Not covered unless medically necessary',
      limitAmount: 'Not covered',
      notes: 'Exceptions for accident-related reconstructive surgery'
    },
    {
      condition: 'Pre-existing Conditions',
      category: 'General Care',
      covered: false,
      coverageDescription: 'Conditions diagnosed before policy start date',
      limitAmount: 'Not covered',
      notes: 'Check policy for specific exclusions'
    }
  ];

  const filteredItems = coverageItems.filter(item => {
    const matchesSearch = item.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.coverageDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold">Coverage Search</h3>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search for conditions, treatments, or services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 text-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer text-xs"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Coverage Results */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => (
          <Card key={index} className={`border ${item.covered ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm">{item.condition}</h4>
                <div className="flex items-center space-x-1">
                  {item.covered ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <Badge 
                    variant={item.covered ? "default" : "secondary"}
                    className={`text-xs ${item.covered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {item.covered ? 'Covered' : 'Not Covered'}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-2">{item.coverageDescription}</p>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Coverage Limit:</span>
                  <span className={`text-xs font-medium ${item.covered ? 'text-green-700' : 'text-red-700'}`}>
                    {item.limitAmount}
                  </span>
                </div>
                
                {item.notes && (
                  <p className="text-xs text-gray-600 italic">
                    📝 {item.notes}
                  </p>
                )}
              </div>

              {item.covered && (
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs flex-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    Find Providers
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs flex-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Get Pre-approval
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-sm">No coverage items found matching your search.</p>
          <p className="text-xs">Try different keywords or browse all categories.</p>
        </div>
      )}

      {/* Quick Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-3">
          <h4 className="font-semibold text-sm text-blue-800 mb-2">Need help?</h4>
          <p className="text-xs text-blue-700 mb-2">
            Can't find what you're looking for? Ask me directly: "Is X covered?" or "How much does Y cost?"
          </p>
          <Button size="sm" variant="outline" className="text-xs">
            Chat with AI Assistant
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InlineCoverageSearch;
