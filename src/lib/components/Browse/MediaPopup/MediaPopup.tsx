import {
  humanFormat,
  humanSeason,
  progressType,
} from '@/lib/helpers/anilistResponse';
import { timeFromNow } from '@/lib/helpers/moment';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import _ from 'lodash';
import React from 'react';

export default function MediaPopup({
  positionX,
  setIsHovering,
  media,
}: {
  positionX: number;
  setIsHovering: Function;
  media: any;
}) {
  return (
    <div
      onMouseEnter={() => {
        setIsHovering(false);
      }}
      className={`absolute rounded-lg flex flex-col justify-between bg-neutral-900/90 backdrop-blur-md h-32 w-72 z-50 top-2 fade-in-fast px-5 py-4 ${
        positionX > 470 ? 'left-[-18em]' : 'right-[-18em] '
      }`}
    >
      {positionX < 470 ? (
        <span className="absolute left-[-14px]">
          <ArrowLeftIcon className="text-neutral-900" />
        </span>
      ) : (
        <span className="absolute right-[-14px]">
          <ArrowRightIcon className="text-neutral-900" />
        </span>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {media.type === 'ANIME' ? (
            <div className="text-neutral-300 text-sm">
              {media.nextAiringEpisode ? (
                <div className="">
                  {`Ep ${media.nextAiringEpisode.episode} airing in
                    ${timeFromNow(media.nextAiringEpisode.airingAt)}`}
                </div>
              ) : (
                <div>
                  {humanSeason(media.season)} {media.seasonYear}
                </div>
              )}
            </div>
          ) : (
            <div className="text-neutral-300 text-sm">
              {media.status === 'RELEASING'
                ? `Publishing since ${media.startDate.year}`
                : `${media.startDate.year} - ${media.startDate.year}`}
            </div>
          )}
          {media.averageScore && (
            <div className="flex gap-2 items-center">
              <FaceSmileIcon className="h-5 w-5 text-lime-500" />
              <span className="text-sm">{media.averageScore}%</span>
            </div>
          )}
        </div>
        <div className="text-xs flex flex-col gap-0.5">
          <span
            style={{
              color: media.coverImage.color
                ? media.coverImage.color
                : '#737373',
            }}
            className="font-bold capitalize"
          >
            {media.studios.nodes.length > 0
              ? media.studios.nodes[0].name
              : _.startCase(media.type.toLocaleLowerCase())}
          </span>
          <div>
            <span className="text-neutral-400">
              {humanFormat(media.format)} ・{' '}
              {media.type === 'ANIME'
                ? media.episodes
                  ? media.episodes
                  : '?'
                : media.chapters
                ? media.chapters
                : '?'}{' '}
              {progressType(media.type)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-[10px]">
        {media.genres.slice(0, 3).map((genre: string) => (
          <div
            key={genre}
            style={{
              backgroundColor: media.coverImage.color
                ? media.coverImage.color
                : '#737373',
            }}
            className="px-2 rounded-full text-neutral-900 font-medium"
          >
            {genre.toLowerCase()}
          </div>
        ))}
      </div>
    </div>
  );
}
