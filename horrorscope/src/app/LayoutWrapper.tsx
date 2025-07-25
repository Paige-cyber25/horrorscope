// app/LayoutWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/sign-up';

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
      <div id="modal"></div>
      {!isAuthPage && <Footer />}
    </>
  );
}
