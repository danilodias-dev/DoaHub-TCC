import React from 'react';
import { NavHeader } from './NavHeader';
import { Footer } from './Footer';

export function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
