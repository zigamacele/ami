import { GetBannerImage } from '@/lib/components/GetBannerImage';
import AnimeMangaSwitch from '@/lib/components/Home/AnimeMangaSwitch';
import ListCategory from '@/lib/components/List/ListCategory';
import StatusSelector from '@/lib/components/List/StatusSelector';
import Navbar from '@/lib/components/Navbar';
import { inProgress } from '@/lib/graphql/query/inProgress';
import { useState } from 'react';

export default function Settings() {
  const [type, setType] = useState('ANIME');
  const [hoverBackground, setHoverBackground] = useState('');

  return (
    <div>
      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col ml-24 mr-4 mt-2"></div>
      </div>
    </div>
  );
}
