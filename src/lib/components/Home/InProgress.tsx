import { timeFromNow } from '@/lib/helpers/moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'urql';

export default function InProgress({
  type,
  query,
  setHoverBackground,
}: {
  setHoverBackground: Function;
  type: string;
  query: any;
}) {
  const router = useRouter();

  const viewerId =
    typeof window !== 'undefined' ? localStorage.getItem('viewerId') : null;

  const variables = {
    userId: viewerId,
    status: 'CURRENT',
    page: 1,
    type: type,
  };

  const [result] = useQuery({
    query: query,
    variables: variables,
  });
  const { data, fetching, error } = result;
  if (fetching) return <div>fetching</div>;
  if (error) return <div>error</div>;
  console.log(data.Page.mediaList);
  return (
    <div className="flex flex-col gap-2 mt-4">
      <span className="font-semibold text-sm text-right">IN PROGRESS</span>
      <div className="flex flex-col gap-2">
        {data.Page.mediaList.map((media: any) => {
          if (media.status === 'CURRENT')
            return (
              <div
                onClick={() => router.push(`/${media.media.id}`)}
                key={media.media.title.romaji}
                onMouseEnter={() => setHoverBackground(media.media.bannerImage)}
                onMouseLeave={() => setHoverBackground('')}
                className="relative cursor-pointer"
              >
                {media.media.nextAiringEpisode ? (
                  <div className="absolute bg-neutral-900 z-10 top-1 right-1 py-1 px-2 rounded-full text-[10px]">
                    {timeFromNow(media.media.nextAiringEpisode.airingAt)}
                  </div>
                ) : null}
                <div className="absolute z-10 text-white/890 top-11 rounded-r-full text-[10px] pr-2 pl-1">
                  Episode: {media.progress}/
                  {type === 'ANIME'
                    ? !media.media.episodes
                      ? '?'
                      : media.media.episodes
                    : !media.media.chapters
                    ? '?'
                    : media.media.chapters}
                </div>
                <div className="absolute text-sm z-10 text-white bottom-0.5 left-1 font-medium flex flex-col">
                  <div className="flex items-center gap-1">
                    {media.media.status === 'RELEASING' ? (
                      <div className="bg-blue-500 h-2 w-2 rounded-full"></div>
                    ) : null}
                    <span className="truncate w-40">
                      {media.media.title.romaji}
                    </span>
                  </div>
                </div>
                <div className="absolute opacity-30 w-full h-20 bg-gradient-to-t from-black top-0 rounded"></div>
                <img
                  src={
                    media.media.bannerImage
                      ? media.media.bannerImage
                      : media.media.coverImage.large
                  }
                  className="w-[13.5em] rounded h-20 object-cover"
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
