import React from 'react';

export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md p-6">
        {children}
      </div>
    </div>
  );
}
