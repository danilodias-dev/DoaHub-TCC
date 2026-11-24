import React from 'react';
import { NavHeader } from './NavHeader';

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
