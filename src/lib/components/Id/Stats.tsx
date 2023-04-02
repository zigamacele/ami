import {
  humanFormat,
  humanMediaStatus,
  humanSeason,
} from '@/lib/helpers/anilistResponse';
import { convertToMonth } from '@/lib/helpers/moment';
import React from 'react';
import IndividualStat from './IndividualStat';

export default function Stats({ data }: { data: any }) {
  return (
    <div className="bg-neutral-900 w-40 h-full rounded flex flex-col text-sm p-4 gap-2">
      <IndividualStat data={humanFormat(data.format)} title="Format" />
      {data.type === 'ANIME' ? (
        <IndividualStat data={data.episodes ?? '?'} title="Episodes" />
      ) : (
        <IndividualStat data={data.chapters ?? '?'} title="Chapters" />
      )}
      {data.type === 'ANIME' ? (
        <IndividualStat data={`${data.duration} mins`} title="Duration" />
      ) : (
        <IndividualStat
          data={data.volumes ? data.volumes : '?'}
          title="Volumes"
        />
      )}
      <IndividualStat data={humanMediaStatus(data.status)} title="Status" />
      <IndividualStat
        data={`${convertToMonth(data.startDate.month).slice(0, 3)} ${
          data.startDate.day
        }, ${data.startDate.year}`}
        title="Start date"
      />
      <IndividualStat
        data={`${convertToMonth(data.endDate.month).slice(0, 3)} ${
          data.endDate.day
        }, ${data.endDate.year}`}
        title="End date"
      />
      {data.type === 'ANIME' ? (
        <div className="flex flex-col gap-2">
          <IndividualStat data={humanSeason(data.season)} title="Season" />
          <IndividualStat data={data.seasonYear} title="Year" />
        </div>
      ) : null}
      <IndividualStat data={`${data.averageScore}%`} title="Average score" />
      <IndividualStat data={data.popularity} title="Popularity" />
      <IndividualStat data={data.favourites} title="Favorites" />
      <IndividualStat data={data.genres} title="Genres" />
    </div>
  );
}
