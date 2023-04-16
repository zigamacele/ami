import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import React from 'react';

export default function UpdateUser() {
  const router = useRouter();
  function logout() {
    deleteCookie('access_token');
    localStorage.clear();
    router.push('/auth');
  }

  function updateUser() {
    localStorage.clear();
    router.push('/');
  }
  return (
    <div className="flex gap-2">
      <span
        onClick={logout}
        className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600 cursor-pointer flex items-center"
      >
        Logout
      </span>
      <span
        onClick={updateUser}
        className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600 cursor-pointer flex items-center"
      >
        Update User
      </span>
    </div>
  );
}
