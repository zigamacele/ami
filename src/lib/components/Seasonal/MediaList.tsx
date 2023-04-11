import { timeFromNow } from '@/lib/helpers/moment';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function MediaList({
  data,
  setHoverBackground,
  setSelectedMedia,
}: {
  data: any;
  setHoverBackground: Function;
  setSelectedMedia: Function;
}) {
  const [hovering, setHovering] = useState({ id: '', progress: '' });
  return (
    <div>
      <div className="flex flex-col gap-3">
        {data.Page.media.map((media: any) => (
          <div
            // onClick={() => router.push(`/id/${media.media.id}`)}
            key={media.title.romaji}
            onClick={() => setSelectedMedia(media)}
            onMouseEnter={() => {
              setHoverBackground(media.bannerImage);
              setHovering({
                id: media.id,
                progress: media.progress,
              });
            }}
            onMouseLeave={() => {
              setHoverBackground('');
              setHovering({ id: '', progress: '' });
            }}
            className="relative cursor-pointer fade-in-fast from-black hover:from-neutral-500"
          >
            {media.nextAiringEpisode && (
              <div className="absolute bg-neutral-900 z-10 top-1 right-1 py-1 px-2 rounded-full text-[10px]">
                {`EP ${media.nextAiringEpisode.episode}: 
                    ${timeFromNow(media.nextAiringEpisode.airingAt)}`}
              </div>
            )}
            <div className="absolute text-sm z-10 text-white bottom-0.5 left-1 font-medium flex flex-col"></div>
            <div className="absolute opacity-60 w-full h-16 bg-gradient-to-t top-0 rounded"></div>
            <img
              src={media.coverImage.large}
              className="w-16 h-24 rounded object-cover absolute bottom-2 left-2"
              alt={media.title.romaji}
            />
            <div className="absolute flex p-1 w-44 truncate top-16 left-[7.4em] text-[10px]">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm opacity-80">{media.title.romaji}</span>
                <span className="opacity-60">{media.title.native}</span>
              </div>
            </div>

            <img
              src={
                media.bannerImage ? media.bannerImage : media.coverImage.large
              }
              className="w-64 rounded-t h-16 object-cover bottom-0"
              alt={media.title.romaji}
            />
            <div className="h-16 w-64 bg-neutral-900 rounded-b"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
