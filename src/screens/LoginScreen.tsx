
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Globe, Shield, Mail, Smartphone, FileText } from 'lucide-react';
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
          description: "Welcome to your travel insurance dashboard",
        });
        navigate('/dashboard');
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
    <div className="min-h-screen travel-gradient flex flex-col">
      {/* Language Selector */}
      <div className="flex justify-end p-4">
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

      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8">
          <div className="mb-4">
            <Shield className="w-16 h-16 text-white mx-auto mb-4" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TravelCare</h1>
          <p className="text-white/90 text-sm">International Medical Insurance</p>
        </div>

        {/* Login Form */}
        <Card className="w-full max-w-md glass-effect">
          <CardHeader>
            <CardTitle className="text-center text-white">{t('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/20">
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
                  <Label htmlFor="email" className="text-white">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">{t('password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="••••••••"
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('email')}
                  disabled={isLoading}
                  className="w-full bg-white text-travel-teal hover:bg-white/90"
                >
                  {isLoading ? 'Signing in...' : t('login')}
                </Button>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-4">
                <div>
                  <Label htmlFor="mobile" className="text-white">{t('mobile')}</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={credentials.mobile}
                    onChange={(e) => setCredentials({...credentials, mobile: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="otp" className="text-white">{t('otp')}</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={credentials.otp}
                    onChange={(e) => setCredentials({...credentials, otp: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="123456"
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('mobile')}
                  disabled={isLoading}
                  className="w-full bg-white text-travel-teal hover:bg-white/90"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </TabsContent>

              <TabsContent value="policy" className="space-y-4">
                <div>
                  <Label htmlFor="policyNumber" className="text-white">{t('policyNumber')}</Label>
                  <Input
                    id="policyNumber"
                    type="text"
                    value={credentials.policyNumber}
                    onChange={(e) => setCredentials({...credentials, policyNumber: e.target.value})}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="TI-2024-001234"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth" className="text-white">{t('dateOfBirth')}</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={credentials.dateOfBirth}
                    onChange={(e) => setCredentials({...credentials, dateOfBirth: e.target.value})}
                    className="bg-white/20 border-white/30 text-white"
                  />
                </div>
                <Button 
                  onClick={() => handleLogin('policy')}
                  disabled={isLoading}
                  className="w-full bg-white text-travel-teal hover:bg-white/90"
                >
                  {isLoading ? 'Verifying...' : t('login')}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                className="text-white hover:text-white/80"
                onClick={() => toast({ title: "Password Reset", description: "Reset link sent to your email" })}
              >
                {t('forgotAccess')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
