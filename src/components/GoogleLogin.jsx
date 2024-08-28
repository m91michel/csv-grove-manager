import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from "@/components/ui/button";

const GoogleLogin = ({ onLoginSuccess, onLoginFailure }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onLoginSuccess(tokenResponse),
    onError: () => onLoginFailure(),
  });

  return (
    <Button onClick={() => login()} className="w-full">
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;