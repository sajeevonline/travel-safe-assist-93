
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Paperclip, Phone, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  actions?: ActionButton[];
  type?: 'text' | 'location' | 'booking' | 'emergency';
}

interface ActionButton {
  label: string;
  action: string;
  data?: any;
  primary?: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your TravelCare AI assistant. I can help you with medical emergencies, find doctors, book appointments, check coverage, and more. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      actions: [
        { label: "Find Nearby Doctors", action: "find_doctors", primary: true },
        { label: "Emergency Help", action: "emergency" },
        { label: "Check Coverage", action: "check_coverage" },
        { label: "Book Telemedicine", action: "telemedicine" }
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'ai', actions?: ActionButton[], type?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      actions,
      type: type as any
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    addMessage(inputText, 'user');
    const userMessage = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      handleAIResponse(userMessage);
      setIsTyping(false);
    }, 1500);
  };

  const handleAIResponse = (userMessage: string) => {
    if (userMessage.includes('emergency') || userMessage.includes('urgent') || userMessage.includes('help')) {
      addMessage(
        "🚨 I understand this is urgent. I've found emergency contacts near you. Shall I call emergency services or find the nearest hospital?",
        'ai',
        [
          { label: "Call Emergency (112)", action: "call_emergency", primary: true },
          { label: "Find Nearest Hospital", action: "find_hospital" },
          { label: "Start Emergency Chat", action: "emergency_chat" }
        ],
        'emergency'
      );
    } else if (userMessage.includes('doctor') || userMessage.includes('appointment')) {
      addMessage(
        "I found several doctors available near your location. Here are the best options based on your policy coverage:",
        'ai',
        [
          { label: "Dr. Sarah Chen - Available Now - €45", action: "book_doctor", data: { id: 1, name: "Dr. Sarah Chen" } },
          { label: "Dr. Michael Ross - In 30 min - €50", action: "book_doctor", data: { id: 2, name: "Dr. Michael Ross" } },
          { label: "Telemedicine - €25", action: "telemedicine", primary: true }
        ],
        'booking'
      );
    } else if (userMessage.includes('telemedicine') || userMessage.includes('video call')) {
      addMessage(
        "Perfect! I can connect you with a doctor via video call. Available specialists:",
        'ai',
        [
          { label: "Dr. Emily Johnson - General Practice - €25", action: "book_telemedicine", data: { id: 1 } },
          { label: "Dr. James Wilson - Travel Medicine - €35", action: "book_telemedicine", data: { id: 2 } },
          { label: "Dr. Lisa Zhang - Emergency Care - €40", action: "book_telemedicine", data: { id: 3 } }
        ]
      );
    } else if (userMessage.includes('coverage') || userMessage.includes('policy')) {
      addMessage(
        "Your TravelCare policy (TI-2024-001234) is active and covers:\n• Emergency medical care up to €100,000\n• Hospitalization and surgery\n• Prescription medications\n• Telemedicine consultations\n• Medical evacuation if needed",
        'ai',
        [
          { label: "View Full Policy", action: "view_policy" },
          { label: "Check Specific Coverage", action: "check_specific" }
        ]
      );
    } else if (userMessage.includes('pain') || userMessage.includes('sick') || userMessage.includes('symptoms')) {
      addMessage(
        "I'm sorry to hear you're not feeling well. Can you describe your symptoms? I can help find the right care based on what you're experiencing.",
        'ai',
        [
          { label: "Find General Practitioner", action: "find_gp" },
          { label: "Find Specialist", action: "find_specialist" },
          { label: "Start Symptom Checker", action: "symptom_checker" },
          { label: "Emergency Care", action: "emergency", primary: true }
        ]
      );
    } else {
      addMessage(
        "I can help you with medical care, policy information, booking appointments, or emergency assistance. What would you like to do?",
        'ai',
        [
          { label: "Find Doctors", action: "find_doctors" },
          { label: "Book Telemedicine", action: "telemedicine" },
          { label: "Check Coverage", action: "check_coverage" },
          { label: "Emergency Help", action: "emergency" }
        ]
      );
    }
  };

  const handleAction = (action: string, data?: any) => {
    switch (action) {
      case 'find_doctors':
        addMessage("Looking for doctors near you...", 'user');
        setTimeout(() => {
          addMessage(
            "Found 8 doctors within 2km of your location. All accept your TravelCare insurance:",
            'ai',
            [
              { label: "Dr. Anna Schmidt - 0.5km - €45", action: "book_doctor", data: { id: 1 } },
              { label: "Dr. Carlos Rodriguez - 0.8km - €50", action: "book_doctor", data: { id: 2 } },
              { label: "Dr. Yuki Tanaka - 1.2km - €55", action: "book_doctor", data: { id: 3 } },
              { label: "Show All Doctors", action: "show_all_doctors" }
            ]
          );
        }, 1000);
        break;
        
      case 'emergency':
        navigate('/support');
        break;
        
      case 'telemedicine':
        navigate('/telemedicine-booking');
        break;
        
      case 'book_doctor':
        navigate('/booking', { state: { doctor: data } });
        break;
        
      case 'book_telemedicine':
        navigate('/telemedicine-booking', { state: { doctorId: data.id } });
        break;
        
      case 'view_policy':
        navigate('/policy');
        break;
        
      case 'check_coverage':
        navigate('/coverage');
        break;
        
      default:
        addMessage(`Executing: ${action}`, 'user');
        setTimeout(() => {
          addMessage("Action completed! How else can I help you?", 'ai');
        }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-travel-teal text-white' : 'bg-white border'} rounded-lg p-3 shadow-sm`}>
              <div className="whitespace-pre-wrap text-sm">{message.text}</div>
              {message.actions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.actions.map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={action.primary ? "default" : "outline"}
                      onClick={() => handleAction(action.action, action.data)}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-lg p-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message... (e.g., 'I need a doctor', 'Emergency help', 'Check my coverage')"
            className="flex-1"
          />
          <Button variant="outline" size="sm">
            <Mic className="w-4 h-4" />
          </Button>
          <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
