"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GithubIcon, Facebook, Loader2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { APP_SERVER_URL } from '@/lib/constants';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // If authenticated, redirect to search page
  if (isAuthenticated) {
    router.push('/search');
    return null;
  }

  const handleLogin = (provider) => {
    setIsLoading(true);
    window.location.href = `${APP_SERVER_URL}/auth/${provider}`;
  };

  return (
    <Card className="w-full transition-all duration-300 shadow-md hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to ImageHub</CardTitle>
        <CardDescription>
          Sign in to search and discover images
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-6"
          onClick={() => handleLogin('google')}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FcGoogle className="h-5 w-5" />}
          Sign in with Google
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-6"
          onClick={() => handleLogin('github')}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GithubIcon className="h-5 w-5" />}
          Sign in with GitHub
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-6"
          onClick={() => handleLogin('facebook')}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Facebook className="h-5 w-5 text-blue-600" />}
          Sign in with Facebook
        </Button>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground text-center justify-center">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </CardFooter>
    </Card>
  );
}
