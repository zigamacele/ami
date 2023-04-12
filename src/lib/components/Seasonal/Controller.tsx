import { animeSeasonDuration, currentAnimeSeason } from '@/lib/helpers/moment';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';
import React from 'react';

export default function Controller({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}: {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: Function;
  setCurrentYear: Function;
}) {
  const nextSeason = () => {};

  const prevSeason = () => {};

  return (
    <div className="flex relative items-end h-14 mb-3">
      <div className="text-xs opacity-60 absolute top-3.5 left-8">
        {animeSeasonDuration(currentMonth)}
      </div>
      <div className="flex gap-2 items-center">
        <ChevronLeftIcon
          onClick={prevSeason}
          className="h-6 w-6 cursor-pointer hover:opacity-60"
        />
        <div className="flex gap-1.5 text-xl">
          <span>
            {_.startCase(currentAnimeSeason(currentMonth)?.toLowerCase())}
          </span>
          <span>{currentYear}</span>
        </div>
        <ChevronRightIcon
          onClick={nextSeason}
          className="h-6 w-6 cursor-pointer hover:opacity-60"
        />
      </div>
    </div>
  );
}
