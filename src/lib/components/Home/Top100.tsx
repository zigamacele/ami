import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import Top100Skeleton from './Top100/Top100Skeleton';

import { FaceSmileIcon } from '@heroicons/react/24/outline';

export default function Top100({
  type,
  query,
  title,
  setHoverBackground,
  perPage,
}: {
  type: string;
  query: any;
  title: string;
  perPage: number;
  setHoverBackground: Function;
}) {
  const router = useRouter();
  const { asPath } = router;

  const variables = {
    type: type,
    perPage: perPage,
  };

  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
  });
  const { data, fetching, error } = result;

  const refresh = () => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  };

  useEffect(() => refresh(), []);

  if (fetching) return asPath === '/home' ? <Top100Skeleton /> : null;

  if (fetching) return asPath === '/home' ? <Top100Skeleton /> : null;
  if (error) return <div>error</div>;

  return (
    <div className="flex flex-col ml-24 mt-4 gap-2 fade-in-fast">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{title}</span>
        <span
          onClick={() => router.push(`/browse/top100`)}
          className="font-medium text-xs opacity-50 hover:opacity-70 cursor-pointer"
        >
          View All
        </span>
      </div>

      <div
        className={`flex flex-col gap-2 text-xs ${
          asPath === '/browse' && 'w-[62em]'
        }`}
      >
        {data.Page.media.map((media: any, index: number) => (
          <div
            key={index}
            className="flex gap-4 fade-in-fast hover:opacity-80"
            onMouseEnter={() => setHoverBackground(media.bannerImage)}
            onMouseLeave={() => setHoverBackground('')}
          >
            <div className="flex font-bold justify-center items-center w-8">
              <span className="text-sm opacity-20">#</span>
              <span className="text-xl opacity-60">{index + 1}</span>
            </div>
            <div className="bg-neutral-900 rounded p-2 flex justify-between w-full">
              <div className="flex gap-2">
                <img
                  onClick={() => router.push(`/id/${media.id}`)}
                  src={media.coverImage.large}
                  alt={media.title.userPreferred}
                  className="h-16 w-10 object-cover rounded cursor-pointer"
                />
                <div className="flex flex-col gap-2 justify-center">
                  <span
                    onClick={() => router.push(`/id/${media.id}`)}
                    className="font-medium text-sm truncate w-60 cursor-pointer"
                  >
                    {media.title.userPreferred}
                  </span>
                  <div className="flex gap-1 text-[10px]">
                    {media.genres
                      .slice(0, asPath === '/browse' ? 8 : 3)
                      .map((genre: string) => (
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
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col gap-1 w-24">
                  <div className="flex gap-2 items-center">
                    <FaceSmileIcon className="h-5 w-5 text-lime-500" />
                    <span className="font-bold">{media.averageScore}%</span>
                  </div>
                  <span className="opacity-60">{media.popularity} users</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
