// app/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { Toaster } from "react-hot-toast";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/sign-up';

  const queryClient = new QueryClient({
    retry: false,
  } as QueryClientConfig);
  return (
    <QueryClientProvider client={queryClient}>
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }} 
      />
      </QueryClientProvider>
  );
}
