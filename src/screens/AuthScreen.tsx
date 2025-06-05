
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Globe, Shield, Mail } from 'lucide-react';

const AuthScreen = () => {
  const { login, signUp, resendConfirmation, isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      return;
    }
    
    const success = await signUp({
      email: signUpForm.email,
      password: signUpForm.password,
      name: signUpForm.name
    });
    
    if (success) {
      setShowEmailConfirmation(true);
      setPendingEmail(signUpForm.email);
    }
  };

  const handleResendConfirmation = async () => {
    await resendConfirmation(pendingEmail);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-travel-teal border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Globe className="w-10 h-10 text-travel-teal" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TravelCare</h1>
            <p className="text-sm text-gray-600">Medical Insurance</p>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              <Shield className="w-8 h-8 text-travel-teal mx-auto mb-2" />
              Access Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showEmailConfirmation ? (
              <div className="text-center space-y-4">
                <Mail className="w-16 h-16 text-travel-teal mx-auto" />
                <h3 className="text-lg font-semibold">Check Your Email</h3>
                <p className="text-gray-600">
                  We've sent a confirmation link to <strong>{pendingEmail}</strong>. 
                  Please click the link in your email to verify your account before logging in.
                </p>
                <Alert>
                  <AlertDescription>
                    Didn't receive the email? Check your spam folder or click the button below to resend.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Button 
                    onClick={handleResendConfirmation}
                    variant="outline"
                    className="w-full"
                  >
                    Resend Confirmation Email
                  </Button>
                  <Button 
                    onClick={() => setShowEmailConfirmation(false)}
                    variant="ghost"
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-travel-teal hover:bg-travel-teal/90"
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => {
                          if (loginForm.email) {
                            resendConfirmation(loginForm.email);
                          }
                        }}
                        className="text-sm text-travel-teal"
                      >
                        Resend confirmation email
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={signUpForm.name}
                        onChange={(e) => setSignUpForm({...signUpForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signUpForm.email}
                        onChange={(e) => setSignUpForm({...signUpForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm({...signUpForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={signUpForm.confirmPassword}
                        onChange={(e) => setSignUpForm({...signUpForm, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-travel-teal hover:bg-travel-teal/90"
                      disabled={loading || signUpForm.password !== signUpForm.confirmPassword}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
