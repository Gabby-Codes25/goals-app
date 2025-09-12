import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const useOnboardingRedirect = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const LoginStatus = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await axios.get('/api/users');
        
        const { userLoggedIn } = response.data;
        
        if (!userLoggedIn) {
          // User hasn't logged in redirect to signup
          router.push('/signup');
          return;
        }
        setLoggedInUser(userLoggedIn);
      } catch (error) {
        console.error('Error checking login status:', error);
        // If there's an error, assume user needs signup
        router.push('/signup');
        return;
      } finally {
        setIsChecking(false);
      }
    };

    LoginStatus();
  }, [user, isLoaded, router, loggedInUser]);

  return { isChecking };
};
