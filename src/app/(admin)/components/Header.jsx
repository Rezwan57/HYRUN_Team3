'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error('Error parsing admin data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/admin-login');
  };

  return (
    <header className="sticky top-0 right-0 flex p-4 justify-between items-center flex-shrink-0 gap-10 w-full h-[8vh] bg-neutral-100">
      <h1>Admin Dashboard</h1>
      {admin && (
        <div className="flex items-center gap-4">
          <div>
            <p className="font-semibold">{admin.firstName} {admin.lastName}</p>
            <p className="text-sm text-gray-500">{admin.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
