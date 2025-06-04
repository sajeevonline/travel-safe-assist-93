
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, DollarSign, AlertCircle } from 'lucide-react';

const SearchCoverage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const coverageData = [
    {
      condition: 'Broken Bone',
      covered: true,
      coverage: 'Emergency treatment fully covered',
      limit: '$10,000',
      notes: 'Includes X-rays, casting, and follow-up care',
      category: 'Emergency'
    },
    {
      condition: 'Food Poisoning',
      covered: true,
      coverage: 'Hospital treatment covered',
      limit: '$5,000',
      notes: 'Includes medication and hospitalization if required',
      category: 'Illness'
    },
    {
      condition: 'Dental Emergency',
      covered: true,
      coverage: 'Emergency dental treatment only',
      limit: '$2,000',
      notes: 'Routine cleanings not covered',
      category: 'Dental'
    },
    {
      condition: 'Pregnancy',
      covered: false,
      coverage: 'Not covered for routine pregnancy care',
      limit: 'N/A',
      notes: 'Emergency complications may be covered',
      category: 'Maternity'
    },
    {
      condition: 'Heart Attack',
      covered: true,
      coverage: 'Full emergency treatment covered',
      limit: '$100,000',
      notes: 'Includes emergency room, surgery, and hospitalization',
      category: 'Emergency'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = coverageData.filter(item =>
        item.condition.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.coverage.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const popularSearches = ['Broken Bone', 'Fever', 'Allergic Reaction', 'Dental Pain', 'Chest Pain'];

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title={t('searchCoverage')} showBack={true} />

      <div className="p-4 space-y-6">
        {/* Search Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t('searchTreatment')}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Popular Searches */}
        {searchQuery.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-travel-teal hover:text-white transition-colors"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Search Results ({searchResults.length})</h3>
            {searchResults.map((result, index) => (
              <Card key={index} className={`${result.covered ? 'border-green-200' : 'border-red-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{result.condition}</h4>
                      <Badge 
                        variant={result.covered ? "default" : "destructive"}
                        className="mt-1"
                      >
                        {result.covered ? "Covered" : "Not Covered"}
                      </Badge>
                    </div>
                    <Badge variant="outline">{result.category}</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{result.coverage}</span>
                    </div>

                    {result.covered && (
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Coverage Limit: {result.limit}</span>
                      </div>
                    )}

                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                      <span className="text-sm text-gray-600">{result.notes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {searchQuery.length > 2 && searchResults.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find coverage information for "{searchQuery}".
              </p>
              <p className="text-sm text-gray-500">
                Try searching with different keywords or contact our support team for assistance.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Coverage Categories */}
        {searchQuery.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Coverage Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {['Emergency', 'Illness', 'Dental', 'Maternity', 'Prescription', 'Mental Health'].map((category, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg text-center cursor-pointer hover:bg-travel-teal/10 transition-colors"
                    onClick={() => handleSearch(category)}
                  >
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchCoverage;
