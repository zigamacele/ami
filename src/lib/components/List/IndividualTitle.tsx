import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function IndividualTitle({
  media,
  type,
  setHoverBackground,
}: {
  media: any;
  type: string;
  setHoverBackground: Function;
}) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
        setHoverBackground(media.media.bannerImage);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverBackground('');
      }}
      className="flex items-center justify-between hover:bg-neutral-700 rounded p-2 text-sm"
    >
      <div className="flex items-center gap-2">
        {!isHovering ? (
          <img
            src={media.media.coverImage.large}
            className="w-12 rounded h-12 object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded bg-neutral-900/30 flex justify-center items-center cursor-pointer">
            <EllipsisHorizontalIcon className="h-8 w-8" />
          </div>
        )}
        <span className="truncate w-64 text-base">
          {media.media.title.romaji}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="w-10 text-center">
          {media.score === 0 ? '' : media.score}
        </span>
        <span className="w-20 text-center">
          {media.progress}/
          {type === 'ANIME'
            ? media.media.episodes
            : media.media.chapters
            ? media.media.chapters
            : '?'}
        </span>
        {type !== 'MANGA' ? null : (
          <span className="w-20 text-center">{media.progressVolumes}</span>
        )}
        <span className="w-20 text-center">{media.media.format}</span>
      </div>
    </div>
  );
}
