import { GetAnimeList } from '@/lib/components/GetAnimeList';
import { GetViewer } from '@/lib/components/GetViewer';
import TrendingNow from '@/lib/components/Home/TrendingNow';
import Navbar from '@/lib/components/Navbar';
import React, { useState } from 'react';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <GetViewer />
      <div className="flex gap-3 mt-4">
        <div className="w-full h-[60em] bg-neutral-900 ml-24 mr-4 rounded"></div>
        {/* <div className="w-[14em] h-[60em] bg-neutral-900 rounded"></div> */}
      </div>
      <TrendingNow />
      <GetAnimeList />
    </div>
  );
}
