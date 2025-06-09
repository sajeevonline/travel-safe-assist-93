
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Paperclip, Phone, MapPin, Heart, X, Calendar, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import VoiceInterface from './VoiceInterface';
import InlinePolicyView from './InlinePolicyView';
import InlineProviderSearch from './InlineProviderSearch';
import InlineBookingWidget from './InlineBookingWidget';
import InlineTelemedicineWidget from './InlineTelemedicineWidget';
import InlineCoverageSearch from './InlineCoverageSearch';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  actions?: ActionButton[];
  type?: 'text' | 'widget' | 'emergency';
  widget?: 'policy' | 'providers' | 'booking' | 'telemedicine' | 'coverage';
  widgetData?: any;
}

interface ActionButton {
  label: string;
  action: string;
  data?: any;
  primary?: boolean;
}

const ChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${user?.name}! I'm your TravelCare AI assistant. I can help you with:\n\n🏥 Find doctors and hospitals\n📋 Check your policy coverage\n📞 Book appointments\n💻 Schedule telemedicine calls\n🚨 Emergency assistance\n\nWhat can I help you with today?`,
      sender: 'ai',
      timestamp: new Date(),
      actions: [
        { label: "🔍 Find Doctors", action: "find_doctors", primary: true },
        { label: "🏥 Emergency Help", action: "emergency" },
        { label: "📋 View Policy", action: "view_policy" },
        { label: "💻 Telemedicine", action: "telemedicine" },
        { label: "🔎 Check Coverage", action: "check_coverage" }
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'ai', actions?: ActionButton[], type?: string, widget?: string, widgetData?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      actions,
      type: type as any,
      widget: widget as any,
      widgetData
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    addMessage(inputText, 'user');
    const userMessage = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      handleAIResponse(userMessage);
      setIsTyping(false);
    }, 1500);
  };

  const handleAIResponse = (userMessage: string) => {
    if (userMessage.includes('emergency') || userMessage.includes('urgent') || userMessage.includes('help') || userMessage.includes('911') || userMessage.includes('112')) {
      addMessage(
        "🚨 EMERGENCY DETECTED\n\nI'm here to help immediately. What type of emergency assistance do you need?",
        'ai',
        [
          { label: "🚑 Call Emergency Services", action: "call_emergency", primary: true },
          { label: "🏥 Find Nearest Hospital", action: "find_emergency_hospital" },
          { label: "💬 Emergency Chat Support", action: "emergency_chat" },
          { label: "📍 Share My Location", action: "share_location" }
        ],
        'emergency'
      );
    } else if (userMessage.includes('doctor') || userMessage.includes('find') || userMessage.includes('hospital')) {
      addMessage(
        "I'll help you find the right medical care. Here are doctors and hospitals near your location:",
        'ai',
        [
          { label: "Close Widget", action: "close_widget" }
        ],
        'widget',
        'providers'
      );
    } else if (userMessage.includes('policy') || userMessage.includes('coverage details') || userMessage.includes('view policy')) {
      addMessage(
        "Here's your complete policy information:",
        'ai',
        [
          { label: "Close Widget", action: "close_widget" }
        ],
        'widget',
        'policy'
      );
    } else if (userMessage.includes('telemedicine') || userMessage.includes('video call') || userMessage.includes('virtual')) {
      addMessage(
        "Let's set up a telemedicine consultation for you:",
        'ai',
        [
          { label: "Close Widget", action: "close_widget" }
        ],
        'widget',
        'telemedicine'
      );
    } else if (userMessage.includes('coverage') || userMessage.includes('covered') || userMessage.includes('check coverage')) {
      addMessage(
        "I'll check what's covered under your policy:",
        'ai',
        [
          { label: "Close Widget", action: "close_widget" }
        ],
        'widget',
        'coverage'
      );
    } else if (userMessage.includes('book') || userMessage.includes('appointment') || userMessage.includes('schedule')) {
      addMessage(
        "I'll help you book an appointment:",
        'ai',
        [
          { label: "Close Widget", action: "close_widget" }
        ],
        'widget',
        'booking'
      );
    } else if (userMessage.includes('pain') || userMessage.includes('sick') || userMessage.includes('symptoms') || userMessage.includes('fever')) {
      addMessage(
        "I'm sorry you're not feeling well. Based on your symptoms, here are your options:\n\n• Immediate telemedicine consultation\n• Find nearby doctors\n• Emergency care if severe",
        'ai',
        [
          { label: "🩺 Quick Telemedicine - €25", action: "quick_telemedicine", primary: true },
          { label: "🏥 Find Local Doctor", action: "find_doctors" },
          { label: "🚨 Emergency Care", action: "emergency" },
          { label: "💊 Check Symptoms", action: "symptom_checker" }
        ]
      );
    } else {
      addMessage(
        "I'm here to help with all your travel insurance needs. What would you like to do?",
        'ai',
        [
          { label: "🔍 Find Medical Care", action: "find_doctors" },
          { label: "💻 Telemedicine Call", action: "telemedicine" },
          { label: "📋 Check Coverage", action: "check_coverage" },
          { label: "📞 Book Appointment", action: "booking" },
          { label: "🆘 Emergency Help", action: "emergency" }
        ]
      );
    }
  };

  const handleAction = (action: string, data?: any) => {
    switch (action) {
      case 'find_doctors':
        addMessage("I'll help you find doctors and hospitals near you.", 'ai', 
          [{ label: "Close Widget", action: "close_widget" }], 'widget', 'providers');
        break;
        
      case 'view_policy':
        addMessage("Here's your complete policy information:", 'ai',
          [{ label: "Close Widget", action: "close_widget" }], 'widget', 'policy');
        break;
        
      case 'telemedicine':
      case 'quick_telemedicine':
        addMessage("Let's connect you with a doctor via video call:", 'ai',
          [{ label: "Close Widget", action: "close_widget" }], 'widget', 'telemedicine');
        break;
        
      case 'booking':
        addMessage("I'll help you book an appointment:", 'ai',
          [{ label: "Close Widget", action: "close_widget" }], 'widget', 'booking');
        break;
        
      case 'check_coverage':
        addMessage("Let me check what's covered under your policy:", 'ai',
          [{ label: "Close Widget", action: "close_widget" }], 'widget', 'coverage');
        break;

      case 'emergency':
        addMessage(
          "🚨 EMERGENCY ASSISTANCE\n\nI'm connecting you to emergency services. Stay calm.",
          'ai',
          [
            { label: "🚑 Call 112 (EU Emergency)", action: "call_112", primary: true },
            { label: "📞 Call +1-800-TRAVELCARE", action: "call_support" },
            { label: "🏥 Nearest Hospital", action: "find_emergency_hospital" },
            { label: "📍 Share Location with Emergency Services", action: "share_emergency_location" }
          ],
          'emergency'
        );
        break;

      case 'call_emergency':
      case 'call_112':
        window.open('tel:112');
        addMessage("Calling emergency services (112)...", 'ai');
        break;

      case 'call_support':
        window.open('tel:+1-800-TRAVELCARE');
        addMessage("Calling TravelCare emergency support...", 'ai');
        break;

      case 'close_widget':
        setMessages(prev => prev.filter((_, index) => index !== prev.length - 1));
        addMessage("How else can I assist you today?", 'ai', [
          { label: "🔍 Find Medical Care", action: "find_doctors" },
          { label: "💻 Telemedicine", action: "telemedicine" },
          { label: "📋 Check Coverage", action: "check_coverage" },
          { label: "📞 Book Appointment", action: "booking" }
        ]);
        break;
        
      default:
        addMessage(`Executing: ${action}`, 'user');
        setTimeout(() => {
          addMessage("Action completed! What else can I help you with?", 'ai', [
            { label: "🔍 Find Doctors", action: "find_doctors" },
            { label: "💻 Telemedicine", action: "telemedicine" },
            { label: "📋 Check Coverage", action: "check_coverage" }
          ]);
        }, 1000);
    }
  };

  const handleVoiceInput = (text: string) => {
    setInputText(text);
  };

  const renderWidget = (widget: string, data?: any) => {
    switch (widget) {
      case 'policy':
        return <InlinePolicyView />;
      case 'providers':
        return <InlineProviderSearch onBook={(doctor) => handleAction('booking', doctor)} />;
      case 'booking':
        return <InlineBookingWidget onComplete={() => handleAction('close_widget')} />;
      case 'telemedicine':
        return <InlineTelemedicineWidget onConnect={() => handleAction('close_widget')} />;
      case 'coverage':
        return <InlineCoverageSearch />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 lg:p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-travel-teal rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm lg:text-base font-semibold text-gray-900">TravelCare AI Assistant</h2>
              <p className="text-xs lg:text-sm text-gray-600">Online • Instant help available</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 text-xs">Policy Active</Badge>
        </div>
      </div>

      {/* Messages - Improved sizing and spacing */}
      <div className="flex-1 overflow-y-auto p-3 lg:p-6 space-y-4 lg:space-y-6 min-h-0">
        <div className="max-w-none lg:max-w-4xl mx-auto space-y-4 lg:space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] lg:max-w-[75%] xl:max-w-[70%] ${
                message.sender === 'user' 
                  ? 'bg-travel-teal text-white' 
                  : message.type === 'emergency' 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-white border border-gray-200'
              } rounded-lg shadow-sm overflow-hidden`}>
                
                {/* Message Content */}
                <div className="p-4 lg:p-5">
                  <div className={`whitespace-pre-wrap text-sm lg:text-base leading-relaxed ${
                    message.type === 'emergency' ? 'text-red-800' : 
                    message.sender === 'user' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {message.text}
                  </div>
                  
                  {/* Action Buttons */}
                  {message.actions && (
                    <div className="mt-3 lg:mt-4 flex flex-wrap gap-2">
                      {message.actions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={action.primary ? "default" : "outline"}
                          onClick={() => handleAction(action.action, action.data)}
                          className={`text-sm h-8 lg:h-9 px-3 lg:px-4 ${
                            message.type === 'emergency' 
                              ? action.primary 
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'border-red-300 text-red-700 hover:bg-red-50'
                              : ''
                          }`}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Widget Content */}
                {message.widget && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    {renderWidget(message.widget, message.widgetData)}
                  </div>
                )}

                {/* Timestamp */}
                <div className={`px-4 lg:px-5 pb-3 text-xs lg:text-sm ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-5 shadow-sm max-w-[90%] lg:max-w-[75%]">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-travel-teal rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-travel-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-travel-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm lg:text-base text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Improved sizing */}
      <div className="border-t bg-white p-3 lg:p-4 flex-shrink-0">
        <div className="max-w-none lg:max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="shrink-0 w-9 h-9 lg:w-10 lg:h-10 p-0">
              <Camera className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            <Button variant="outline" size="sm" className="shrink-0 w-9 h-9 lg:w-10 lg:h-10 p-0">
              <Paperclip className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 text-sm lg:text-base h-9 lg:h-10"
            />
            <VoiceInterface onVoiceInput={handleVoiceInput} />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputText.trim()}
              className="shrink-0 bg-travel-teal hover:bg-travel-teal/90 w-9 h-9 lg:w-10 lg:h-10 p-0"
            >
              <Send className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
          </div>
          
          {/* Quick Suggestions */}
          <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm whitespace-nowrap h-8 px-3"
              onClick={() => handleAction('emergency')}
            >
              🆘 Emergency
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm whitespace-nowrap h-8 px-3"
              onClick={() => handleAction('find_doctors')}
            >
              🔍 Find Doctor
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm whitespace-nowrap h-8 px-3"
              onClick={() => handleAction('telemedicine')}
            >
              💻 Telemedicine
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm whitespace-nowrap h-8 px-3"
              onClick={() => handleAction('check_coverage')}
            >
              📋 Coverage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
