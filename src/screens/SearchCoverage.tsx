
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, FileText, DollarSign, AlertCircle } from 'lucide-react';

interface CoverageItem {
  id: string;
  condition: string;
  covered: boolean;
  coverage_description: string;
  limit_amount: string | null;
  notes: string | null;
  category: string;
}

const SearchCoverage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CoverageItem[]>([]);
  const [allCoverageItems, setAllCoverageItems] = useState<CoverageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoverageItems();
  }, []);

  const fetchCoverageItems = async () => {
    try {
      const { data, error } = await supabase
        .from('coverage_items')
        .select('*')
        .order('condition');

      if (error) throw error;

      setAllCoverageItems(data || []);
    } catch (error) {
      console.error('Error fetching coverage items:', error);
      toast({
        title: "Error",
        description: "Failed to load coverage information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = allCoverageItems.filter(item =>
        item.condition.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.coverage_description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const popularSearches = ['Broken Bone', 'Fever', 'Allergic Reaction', 'Dental Emergency', 'Chest Pain'];
  const categories = [...new Set(allCoverageItems.map(item => item.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="lg:hidden">
          <MobileHeader title={t('searchCoverage')} showBack={true} />
        </div>
        <div className="p-4 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-travel-teal border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - only show on mobile */}
      <div className="lg:hidden">
        <MobileHeader title={t('searchCoverage')} showBack={true} />
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block lg:p-8 lg:pb-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('searchCoverage')}</h1>
          <p className="text-gray-600 mt-2">Search for coverage information and treatment details</p>
        </div>
      </div>

      <div className="lg:p-8 p-4 space-y-6">
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
            {searchResults.map((result) => (
              <Card key={result.id} className={`${result.covered ? 'border-green-200' : 'border-red-200'}`}>
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
                      <span className="text-sm text-gray-700">{result.coverage_description}</span>
                    </div>

                    {result.covered && result.limit_amount && (
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Coverage Limit: {result.limit_amount}</span>
                      </div>
                    )}

                    {result.notes && (
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{result.notes}</span>
                      </div>
                    )}
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
                {categories.map((category, index) => (
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
