import { GetBannerImage } from '@/lib/components/GetBannerImage';
import AnimeMangaSwitch from '@/lib/components/Home/AnimeMangaSwitch';
import InProgress from '@/lib/components/Home/InProgress';
import Top100 from '@/lib/components/Home/Top100';
import Trending from '@/lib/components/Home/Trending';
import Navbar from '@/lib/components/Navbar';
import { allTimePopular } from '@/lib/graphql/query/allTimePopular';
import { inProgress } from '@/lib/graphql/query/inProgress';
import { top100 } from '@/lib/graphql/query/top100';
import { trendingNow } from '@/lib/graphql/query/trendingNow';
import { useEffect, useState } from 'react';

export default function Home() {
  const [type, setType] = useState('ANIME');
  const [hoverBackground, setHoverBackground] = useState('');

  useEffect(() => {
    const viewerType =
      typeof window !== 'undefined'
        ? localStorage.getItem('viewerType') || 'ANIME'
        : 'ANIME';

    setType(viewerType);
  }, []);

  return (
    <div className="flex flex-col mb-5">
      <AnimeMangaSwitch type={type} setType={setType} />
      <Navbar />
      <GetBannerImage hoverBackground={hoverBackground} />
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <Trending
            type={type}
            query={trendingNow}
            perPage={5}
            title="TRENDING NOW"
            setHoverBackground={setHoverBackground}
          />
          <Trending
            type={type}
            query={allTimePopular}
            perPage={5}
            title="ALL TIME POPULAR"
            setHoverBackground={setHoverBackground}
          />
          <Top100
            type={type}
            query={top100}
            perPage={10}
            title={`TOP 100 ${type}`}
            setHoverBackground={setHoverBackground}
          />
        </div>
        <InProgress
          type={type}
          query={inProgress}
          setHoverBackground={setHoverBackground}
        />
      </div>
    </div>
  );
}
