'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import BrandLoader from './BrandLoader';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, checkAuth } = useStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const performAuthCheck = async () => {
      try {
        const isValid = await checkAuth();

        if (!isValid) {
          router.push('/login');
          return;
        }

        setIsChecking(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    performAuthCheck();
  }, [checkAuth, router]);

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      router.push('/login');
    }
  }, [isChecking, isAuthenticated, router]);

  if (isChecking) {
    return fallback || <BrandLoader />;
  }

  if (!isAuthenticated) {
    return fallback || <BrandLoader />;
  }

  return <>{children}</>;
}
