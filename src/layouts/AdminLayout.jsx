import React from 'react';
import { NavHeader } from './NavHeader';

export function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <NavHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
