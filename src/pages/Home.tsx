import { GetBannerImage } from '@/lib/components/GetBannerImage';
import AnimeMangaSwitch from '@/lib/components/Home/AnimeMangaSwitch';
import InProgress from '@/lib/components/Home/InProgress';
import Top100 from '@/lib/components/Home/top100';
import Trending from '@/lib/components/Home/Trending';
import Navbar from '@/lib/components/Navbar';
import { allTimePopular } from '@/lib/graphql/query/allTimePopular';
import { inProgress } from '@/lib/graphql/query/inProgress';
import { top100 } from '@/lib/graphql/query/top100';
import { trendingNow } from '@/lib/graphql/query/trendingNow';
import moment from 'moment';
import { useState } from 'react';

//title query type(anime, manga)
//         season: SPRING
//         seasonYear: 2023

export default function Home() {
  const [type, setType] = useState('ANIME');

  return (
    <div className="flex flex-col mb-5">
      <AnimeMangaSwitch type={type} setType={setType} />
      <Navbar />
      <GetBannerImage />
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <Trending type={type} query={trendingNow} title="TRENDING NOW" />
          <Trending
            type={type}
            query={allTimePopular}
            title="ALL TIME POPULAR"
          />
          <Top100 type={type} query={top100} title={`TOP 100 ${type}`} />
        </div>
        <InProgress type={type} query={inProgress} />
      </div>
    </div>
  );
}
