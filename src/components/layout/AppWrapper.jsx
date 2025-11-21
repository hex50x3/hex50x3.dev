'use client';

import { useEffect, useState } from 'react';
import NoiseOverlay from '@/components/ui/noise-overlay';
import Preloader from '@/components/ui/preloader';
import { useTheme } from '@/hooks/useTheme';

export default function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--initial-vh', `${vh}px`);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        await document.fonts.ready;
      } catch {}
      setTimeout(() => setLoading(false), 250);
    };
    load();
  }, []);

  if (loading) return <Preloader theme={theme} />;

  return (
    <>
      <NoiseOverlay />
      {children}
    </>
  );
}