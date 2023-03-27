import React from 'react';

import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';

export default function AnimeMangaSwitch({
  type,
  setType,
}: {
  type: string;
  setType: Function;
}) {
  return (
    <div
      onClick={() => setType(type === 'ANIME' ? 'MANGA' : 'ANIME')}
      className="flex items-center absolute right-2 top-1 text-xs z-10 bg-neutral-900/80 backdrop-blur-md px-2 py-1 rounded-full gap-2 cursor-pointer"
    >
      <span className={`${type === 'ANIME' ? null : 'opacity-30'}`}>ANIME</span>
      <ArrowsRightLeftIcon className="h-4 w-4" />
      <span className={`${type === 'MANGA' ? null : 'opacity-30'}`}>MANGA</span>
    </div>
  );
}
