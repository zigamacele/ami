import { allTimePopular } from '@/lib/graphql/query/allTimePopular';
import { top100 } from '@/lib/graphql/query/top100';
import { trendingNow } from '@/lib/graphql/query/trendingNow';
import React from 'react';
import Top100 from '../Home/Top100';
import Trending from '../Home/Trending';

export default function PopularSection({
  type,
  setHoverBackground,
}: {
  type: string;
  setHoverBackground: Function;
}) {
  return (
    <section className="flex flex-col  items-center justify-center mr-3">
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
    </section>
  );
}
