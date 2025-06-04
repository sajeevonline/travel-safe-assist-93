
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MobileHeader from '@/components/MobileHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';

const Support = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(i => i !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  const faqs = [
    {
      question: 'How do I find a doctor that accepts my insurance?',
      answer: 'All healthcare providers in our network accept your travel insurance. You can find them in the "Find Doctor" section of the app, where you can search by specialty and location. Look for the "Accepts Insurance" badge to confirm coverage.'
    },
    {
      question: 'What should I do in case of a medical emergency?',
      answer: 'In case of a serious medical emergency, call the local emergency number (911 in the US). Then contact our 24/7 emergency assistance line at +1-800-TRAVEL-HELP. Keep your policy number ready for faster service.'
    },
    {
      question: 'How do I get reimbursed for medical expenses?',
      answer: 'To get reimbursed, keep all receipts and medical documentation. Submit a claim through the app by going to "My Policy" > "File a Claim". You\'ll need to upload photos of your receipts and provide details about the treatment received.'
    },
    {
      question: 'Is telemedicine covered by my policy?',
      answer: 'Yes, telemedicine consultations are fully covered under your travel insurance policy. You can schedule unlimited virtual consultations with doctors in our network at no additional cost.'
    },
    {
      question: 'How do I extend my insurance coverage?',
      answer: 'You can extend your coverage period through the app by going to "My Policy" > "Extend Coverage". Extensions are subject to approval and must be requested at least 72 hours before your current policy expires.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title={t('support')} showBack={true} />

      <div className="p-4 space-y-6">
        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Options */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-travel-teal text-white">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <Phone className="w-8 h-8 mb-2" />
              <h3 className="font-semibold mb-1">Call Support</h3>
              <p className="text-sm text-white/90">24/7 Assistance</p>
              <p className="text-sm font-semibold mt-2">+1-800-TRAVEL</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <MessageCircle className="w-8 h-8 mb-2 text-travel-teal" />
              <h3 className="font-semibold mb-1">Live Chat</h3>
              <p className="text-xs text-gray-600 mb-2">Avg. wait: 2 mins</p>
              <Button size="sm" className="bg-travel-teal hover:bg-travel-teal/90">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Card */}
        <Card className="border-red-200 bg-red-50 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-red-800">Emergency Assistance</h4>
                <p className="text-red-700 text-sm">For medical emergencies, call your local emergency number first (911)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-travel-teal" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div 
                    className="flex justify-between items-center p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleFaq(index)}
                  >
                    <h4 className="font-medium">{faq.question}</h4>
                    {openFaqs.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  
                  {openFaqs.includes(index) && (
                    <div className="p-4 border-t border-gray-200">
                      <p className="text-gray-700 text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center p-4">
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email Support */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">Email Support</h4>
                <p className="text-sm text-gray-600">Response within 24 hours</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = 'mailto:support@travelcare.com'}
            >
              Email Us
            </Button>
          </CardContent>
        </Card>

        {/* Documents & Forms */}
        <Card>
          <CardHeader>
            <CardTitle>Documents & Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Claim Form', 'Policy Document', 'Emergency Contact List', 'Coverage Guide'].map((doc, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{doc}</span>
                  <Badge variant="outline">PDF</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
