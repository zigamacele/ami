import { GetBannerImage } from '@/lib/components/GetBannerImage';
import InProgress from '@/lib/components/Home/InProgress';
import Trending from '@/lib/components/Home/Trending';
import Navbar from '@/lib/components/Navbar';
import { allTimePopular } from '@/lib/graphql/query/allTimePopular';
import { inProgress } from '@/lib/graphql/query/inProgress';
import { trendingNow } from '@/lib/graphql/query/trendingNow';
import moment from 'moment';

//title query type(anime, manga)
//         season: SPRING
//         seasonYear: 2023

const type = 'MANGA';

const currentMonth = moment().month();
console.log('currentMonth', currentMonth);

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <GetBannerImage />
      <div className="flex gap-4">
        <div className="flex flex-col">
          <Trending type={type} query={trendingNow} title="TRENDING NOW" />
          <Trending
            type={type}
            query={allTimePopular}
            title="ALL TIME POPULAR"
          />
        </div>
        <InProgress type={type} query={inProgress} />
      </div>
    </div>
  );
}
