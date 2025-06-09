import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Globe, Shield, Mail, Smartphone, FileText, MessageSquare, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    mobile: '',
    otp: '',
    policyNumber: '',
    dateOfBirth: ''
  });
  
  const { login } = useAuth();
  const { t, currentLanguage, setLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (type: 'email' | 'mobile' | 'policy') => {
    setIsLoading(true);
    try {
      const success = await login({ type, ...credentials });
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to your AI-powered insurance assistant",
        });
        navigate('/chat'); // Redirect to new chat interface
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen travel-gradient flex relative">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <select 
          value={currentLanguage.code}
          onChange={(e) => {
            const lang = availableLanguages.find(l => l.code === e.target.value);
            if (lang) setLanguage(lang);
          }}
          className="bg-white/20 text-white rounded-lg px-3 py-1 text-sm backdrop-blur-sm"
        >
          {availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code} className="text-gray-900">
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Layout */}
      <div className="flex-1 flex lg:items-center lg:justify-center">
        <div className="w-full lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:px-8">
          {/* Left Side - Branding (Desktop Only) */}
          <div className="hidden lg:flex lg:flex-col lg:justify-center lg:text-white">
            <div className="mb-8">
              <Shield className="w-20 h-20 mb-6" />
              <h1 className="text-5xl font-bold mb-4">TravelCare AI</h1>
              <p className="text-xl text-white/90 mb-8">Your Intelligent Insurance Assistant</p>
              <div className="space-y-4 text-white/80">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6" />
                  <span>Chat with AI for instant help</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6" />
                  <span>Smart suggestions & proactive care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6" />
                  <span>Worldwide Coverage & Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6" />
                  <span>24/7 Emergency Assistance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col items-center justify-center p-6 lg:p-0">
            {/* Mobile Header */}
            <div className="text-center mb-8 lg:hidden">
              <Shield className="w-16 h-16 text-white mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-2">TravelCare AI</h1>
              <p className="text-white/90 text-sm">Your Intelligent Insurance Assistant</p>
            </div>

            {/* Login Form */}
            <div className="w-full max-w-md">
              <Card className="glass-effect lg:bg-white lg:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-center text-white lg:text-gray-900">{t('login')}</CardTitle>
                  <p className="text-center text-sm text-white/80 lg:text-gray-600">
                    Access your AI-powered insurance assistant
                  </p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="email" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/20 lg:bg-gray-100">
                      <TabsTrigger value="email" className="text-xs">
                        <Mail className="w-4 h-4 mr-1" />
                        {t('email')}
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="text-xs">
                        <Smartphone className="w-4 h-4 mr-1" />
                        {t('mobile')}
                      </TabsTrigger>
                      <TabsTrigger value="policy" className="text-xs">
                        <FileText className="w-4 h-4 mr-1" />
                        Policy
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-white lg:text-gray-700">{t('email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={credentials.email}
                          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                          className="bg-white/20 border-white/30 text-white placeholder-white/70 lg:bg-white lg:border-gray-300 lg:text-gray-900 lg:placeholder-gray-500"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password" className="text-white lg:text-gray-700">{t('password')}</Label>
                        <Input
                          id="password"
                          type="password"
                          value={credentials.password}
                          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                          className="bg-white/20 border-white/30 text-white placeholder-white/70 lg:bg-white lg:border-gray-300 lg:text-gray-900 lg:placeholder-gray-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <Button 
                        onClick={() => handleLogin('email')}
                        disabled={isLoading}
                        className="w-full bg-white text-travel-teal hover:bg-white/90 lg:bg-travel-teal lg:text-white lg:hover:bg-travel-teal/90"
                      >
                        {isLoading ? 'Signing in...' : 'Start AI Chat'}
                      </Button>
                    </TabsContent>

                    <TabsContent value="mobile" className="space-y-4">
                      <div>
                        <Label htmlFor="mobile" className="text-white lg:text-gray-700">{t('mobile')}</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          value={credentials.mobile}
                          onChange={(e) => setCredentials({...credentials, mobile: e.target.value})}
                          className="bg-white/20 border-white/30 text-white placeholder-white/70 lg:bg-white lg:border-gray-300 lg:text-gray-900 lg:placeholder-gray-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="otp" className="text-white lg:text-gray-700">{t('otp')}</Label>
                        <Input
                          id="otp"
                          type="text"
                          value={credentials.otp}
                          onChange={(e) => setCredentials({...credentials, otp: e.target.value})}
                          className="bg-white/20 border-white/30 text-white placeholder-white/70 lg:bg-white lg:border-gray-300 lg:text-gray-900 lg:placeholder-gray-500"
                          placeholder="123456"
                        />
                      </div>
                      <Button 
                        onClick={() => handleLogin('mobile')}
                        disabled={isLoading}
                        className="w-full bg-white text-travel-teal hover:bg-white/90 lg:bg-travel-teal lg:text-white lg:hover:bg-travel-teal/90"
                      >
                        {isLoading ? 'Verifying...' : 'Start AI Chat'}
                      </Button>
                    </TabsContent>

                    <TabsContent value="policy" className="space-y-4">
                      <div>
                        <Label htmlFor="policyNumber" className="text-white lg:text-gray-700">{t('policyNumber')}</Label>
                        <Input
                          id="policyNumber"
                          type="text"
                          value={credentials.policyNumber}
                          onChange={(e) => setCredentials({...credentials, policyNumber: e.target.value})}
                          className="bg-white/20 border-white/30 text-white placeholder-white/70 lg:bg-white lg:border-gray-300 lg:text-gray-900 lg:placeholder-gray-500"
                          placeholder="TI-2024-001234"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth" className="text-white lg:text-gray-700">{t('dateOfBirth')}</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={credentials.dateOfBirth}
                          onChange={(e) => setCredentials({...credentials, dateOfBirth: e.target.value})}
                          className="bg-white/20 border-white/30 text-white lg:bg-white lg:border-gray-300 lg:text-gray-900"
                        />
                      </div>
                      <Button 
                        onClick={() => handleLogin('policy')}
                        disabled={isLoading}
                        className="w-full bg-white text-travel-teal hover:bg-white/90 lg:bg-travel-teal lg:text-white lg:hover:bg-travel-teal/90"
                      >
                        {isLoading ? 'Verifying...' : 'Start AI Chat'}
                      </Button>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 text-center">
                    <Button 
                      variant="link" 
                      className="text-white hover:text-white/80 lg:text-gray-600 lg:hover:text-gray-800"
                      onClick={() => toast({ title: "Password Reset", description: "Reset link sent to your email" })}
                    >
                      {t('forgotAccess')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
