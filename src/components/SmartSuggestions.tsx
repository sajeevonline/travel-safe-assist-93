
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Thermometer, 
  Plane,
  Shield,
  AlertTriangle
} from 'lucide-react';

interface SmartSuggestionsProps {
  userLocation?: string;
  upcomingTrips?: any[];
  healthAlerts?: any[];
  onSuggestionClick: (suggestion: string) => void;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({
  userLocation = "Paris, France",
  upcomingTrips = [],
  healthAlerts = [],
  onSuggestionClick
}) => {
  const suggestions = [
    {
      id: 1,
      title: "Local Health Alert",
      description: "Flu season active in your area. Consider getting a consultation.",
      icon: Thermometer,
      action: "Find nearby vaccination centers",
      priority: "medium",
      color: "orange"
    },
    {
      id: 2,
      title: "Upcoming Trip Coverage",
      description: "Your Thailand trip is in 5 days. Your policy covers all medical needs there.",
      icon: Plane,
      action: "Review Thailand coverage details",
      priority: "high",
      color: "blue"
    },
    {
      id: 3,
      title: "Doctor Recommendation",
      description: "Dr. Sarah Chen (5⭐) is available for telemedicine in 15 minutes.",
      icon: Calendar,
      action: "Book Dr. Sarah Chen now",
      priority: "low",
      color: "green"
    },
    {
      id: 4,
      title: "Preventive Care",
      description: "It's been 6 months since your last check-up. Schedule a health screening.",
      icon: Shield,
      action: "Schedule preventive care",
      priority: "medium",
      color: "purple"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Smart Suggestions</h3>
        <Badge variant="secondary" className="text-xs">
          <MapPin className="w-3 h-3 mr-1" />
          {userLocation}
        </Badge>
      </div>
      
      {suggestions.map((suggestion) => {
        const IconComponent = suggestion.icon;
        return (
          <Card key={suggestion.id} className={`${getPriorityColor(suggestion.priority)} border cursor-pointer hover:shadow-md transition-shadow`}>
            <CardContent className="p-3">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-white ${getIconColor(suggestion.color)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{suggestion.title}</h4>
                    <Badge 
                      variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs ml-2"
                    >
                      {suggestion.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {suggestion.description}
                  </p>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-6 px-2 text-xs"
                    onClick={() => onSuggestionClick(suggestion.action)}
                  >
                    {suggestion.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* Location-based quick actions */}
      <Card className="border-travel-teal/20 bg-travel-teal/5">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-travel-teal" />
            <span className="text-sm font-medium text-travel-teal">Near You</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7"
              onClick={() => onSuggestionClick("Find 24/7 pharmacy near me")}
            >
              24/7 Pharmacy
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7"
              onClick={() => onSuggestionClick("Find emergency room")}
            >
              Emergency Room
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartSuggestions;
