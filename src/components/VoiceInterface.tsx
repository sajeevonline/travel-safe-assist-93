
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VoiceInterfaceProps {
  onVoiceInput: (text: string) => void;
  onStartListening?: () => void;
  onStopListening?: () => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  onVoiceInput, 
  onStartListening, 
  onStopListening 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
        setIsListening(false);
        onStopListening?.();
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        onStopListening?.();
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
        onStopListening?.();
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onVoiceInput, onStopListening]);

  const startListening = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      onStartListening?.();
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
      onStopListening?.();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      {isListening && (
        <Badge variant="secondary" className="animate-pulse">
          Listening...
        </Badge>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={isListening ? stopListening : startListening}
        className={isListening ? 'bg-red-50 border-red-200' : ''}
      >
        {isListening ? (
          <MicOff className="w-4 h-4 text-red-600" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => speakText("How can I help you with your travel insurance today?")}
        title="Test voice output"
      >
        <Volume2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default VoiceInterface;
