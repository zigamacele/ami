import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Navbar from '@/lib/components/Navbar';
import GitHubIcon from '@mui/icons-material/GitHub';
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
              className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600 cursor-pointer flex items-center"
            >
              Logout
            </span>
            <span
              onClick={() => {
                localStorage.clear();
                router.push('/');
              }}
              className="bg-neutral-700 px-4 py-1 rounded hover:bg-neutral-600 cursor-pointer flex items-center"
            >
              Update User
            </span>
            <span className="bg-neutral-700 px-1 rounded cursor-pointer hover:bg-neutral-600 flex items-center">
              <GitHubIcon fontSize="medium" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
