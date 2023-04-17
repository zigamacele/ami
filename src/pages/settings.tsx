'use client';
import { GetBannerImage } from '@/lib/layouts/GetBannerImage';
import Navbar from '@/lib/layouts/Navbar';
import Selectors from '@/lib/components/Settings/Selectors';
import UpdateUser from '@/lib/components/Settings/UpdateUser';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useEffect, useState } from 'react';

export default function Settings() {
  const [type, setType] = useState('ANIME');
  const [viewerName, setViewerName] = useState<string | null>('');

  const [hoverBackground, setHoverBackground] = useState('');

  useEffect(() => {
    setViewerName(localStorage.getItem('viewerName'));
  }, []);

  return (
    <div>
      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col ml-24 mr-4 mt-4 gap-2">
          <span className="font-semibold text-sm ml-3">ACCOUNT</span>
          <div className="flex flex-col gap-4 bg-neutral-700/30 p-3  rounded">
            <div>
              <span className="opacity-60">Logged in as </span>
              <span className="opacity-80 cursor-not-allowed">
                {viewerName}
              </span>
            </div>
            <UpdateUser />
          </div>
        </div>
        <div className="flex flex-col ml-24 mr-4 mt-4 gap-2">
          <span className="font-semibold text-sm ml-3">LISTS</span>
          <div className="flex flex-col gap-4 bg-neutral-700/30 p-3 rounded">
            <Selectors />
          </div>
        </div>
      </div>
      <span className="bg-neutral-700 px-1 rounded cursor-pointer hover:bg-neutral-600 flex items-center">
        <GitHubIcon fontSize="medium" />
      </span>
    </div>
  );
}
