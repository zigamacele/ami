import { timeFromNow } from '@/lib/helpers/moment';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function MediaList({
  data,
  setHoverBackground,
  selectedMedia,
  setSelectedMedia,
}: {
  data: any;
  setHoverBackground: Function;
  selectedMedia: any;
  setSelectedMedia: Function;
}) {
  const [hovering, setHovering] = useState({ id: '', progress: '' });
  return (
    <div>
      <div className="flex flex-col gap-3 h-[35em] overflow-scroll mb-4">
        {data.Page.media.map((media: any) => (
          <div
            // onClick={() => router.push(`/id/${media.media.id}`)}
            key={media.title.userPreferred}
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
            <div className="absolute opacity-60 w-full h-16 bg-gradient-to-t top-0 rounded-t"></div>
            <img
              src={media.coverImage.large}
              className="w-16 h-24 rounded object-cover absolute bottom-2 left-2"
              alt={media.title.userPreferred}
            />
            <div className="absolute flex p-1 w-44 truncate top-16 left-[7.4em] text-[10px]">
              <div className="flex flex-col">
                <span className="text-sm opacity-80">
                  {media.title.userPreferred}
                </span>
                <span className="opacity-60">{media.title.native}</span>
              </div>
            </div>
            <div
              className={`absolute flex p-1 w-44 truncate top-[12.8em] left-[9.2em] text-[8px] gap-1`}
            >
              {media.genres.slice(0, 3).map((genre) => (
                <span
                  key={`${media.title.userPreferred}_${genre}`}
                  style={{ backgroundColor: media.coverImage.color }}
                  className="text-neutral-900 font-semibold px-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            <img
              src={
                media.bannerImage ? media.bannerImage : media.coverImage.large
              }
              className={`${
                selectedMedia ? 'w-64' : 'w-[46.5em]'
              } rounded-t h-16 object-cover bottom-0`}
              alt={media.title.userPreferred}
            />
            <div
              className={`h-16 ${
                selectedMedia ? 'w-64' : 'w-[46.5em]'
              } bg-neutral-900 rounded-b`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
