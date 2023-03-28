import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Navbar from '@/lib/components/Navbar';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Settings() {
  const [type, setType] = useState('ANIME');
  const [hoverBackground, setHoverBackground] = useState('');
  const router = useRouter();

  function logout() {
    deleteCookie('access_token');
    localStorage.clear();
    router.push('/auth');
  }
  return (
    <div>
      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col ml-24 mr-4 mt-4 gap-4">
          <span className="font-semibold text-sm">SETTINGS</span>

          <div className="flex gap-4">
            <span
              onClick={logout}
              className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600 cursor-pointer"
            >
              Logout
            </span>
            <span
              onClick={() => router.push('/index')}
              className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600 cursor-pointer"
            >
              Update User
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
