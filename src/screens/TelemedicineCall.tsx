
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  Camera,
  Monitor,
  Settings,
  PhoneOff
} from 'lucide-react';

const TelemedicineCall = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, time, condition } = location.state || {};
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, connected, ended
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // Simulate connection process
    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
    }, 3000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callStatus === 'connected') {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [callStatus]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setTimeout(() => {
      navigate('/telemedicine', { 
        state: { 
          callEnded: true, 
          duration: formatDuration(callDuration),
          doctor: doctor?.name 
        } 
      });
    }, 2000);
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        text: chatMessage,
        sender: 'patient',
        time: new Date().toLocaleTimeString()
      }]);
      setChatMessage('');
      
      // Simulate doctor response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: "I can see your message. Let me review your symptoms.",
          sender: 'doctor',
          time: new Date().toLocaleTimeString()
        }]);
      }, 2000);
    }
  };

  if (callStatus === 'ended') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <PhoneOff className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Call Ended</h2>
            <p className="text-gray-600 mb-4">
              Duration: {formatDuration(callDuration)}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Thank you for using our telemedicine service. A summary will be sent to your email.
            </p>
            <Button 
              className="w-full bg-travel-teal hover:bg-travel-teal/90"
              onClick={() => navigate('/telemedicine')}
            >
              Back to Telemedicine
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Video Container */}
      <div className="relative h-screen">
        {/* Doctor's Video (Main) */}
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          {callStatus === 'connecting' ? (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-travel-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Connecting to {doctor?.name || 'Doctor'}...</p>
              <p className="text-sm text-gray-400">Please wait while we establish the connection</p>
            </div>
          ) : (
            <div className="text-center">
              {/* Simulated doctor video */}
              <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-6xl">👨‍⚕️</div>
              </div>
              <h3 className="text-xl font-semibold">{doctor?.name || 'Dr. Smith'}</h3>
              <p className="text-gray-400">{doctor?.specialty || 'General Practice'}</p>
              {condition && (
                <Badge className="mt-2">Consultation for: {condition}</Badge>
              )}
            </div>
          )}
        </div>

        {/* Patient's Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
          {isVideoOn ? (
            <div className="text-2xl">👤</div>
          ) : (
            <VideoOff className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {/* Call Info */}
        {callStatus === 'connected' && (
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Connected</span>
            </div>
            <p className="text-xs text-gray-300">{formatDuration(callDuration)}</p>
          </div>
        )}

        {/* Chat Overlay */}
        {showChat && (
          <div className="absolute right-4 top-20 bottom-20 w-80 bg-black/80 backdrop-blur-sm rounded-lg p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Chat</h4>
              <Button size="sm" variant="ghost" onClick={() => setShowChat(false)}>
                ×
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-2 rounded text-sm ${
                    msg.sender === 'patient' 
                      ? 'bg-travel-teal text-white ml-4' 
                      : 'bg-gray-600 mr-4'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-xs opacity-70">{msg.time}</p>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded text-sm"
              />
              <Button size="sm" onClick={sendMessage}>Send</Button>
            </div>
          </div>
        )}

        {/* Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center space-x-4">
            {/* Microphone */}
            <Button
              size="lg"
              variant={isAudioOn ? "secondary" : "destructive"}
              className="rounded-full w-12 h-12"
              onClick={() => setIsAudioOn(!isAudioOn)}
            >
              {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </Button>

            {/* Video */}
            <Button
              size="lg"
              variant={isVideoOn ? "secondary" : "destructive"}
              className="rounded-full w-12 h-12"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>

            {/* End Call */}
            <Button
              size="lg"
              variant="destructive"
              className="rounded-full w-14 h-14"
              onClick={handleEndCall}
            >
              <PhoneOff className="w-6 h-6" />
            </Button>

            {/* Chat */}
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full w-12 h-12"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="w-6 h-6" />
            </Button>

            {/* Settings */}
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full w-12 h-12"
            >
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineCall;
