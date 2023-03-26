import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'urql';

import { FaceSmileIcon } from '@heroicons/react/24/outline';

export default function Top100({
  type,
  query,
  title,
  setHoverBackground,
}: {
  type: string;
  query: any;
  title: string;
  setHoverBackground: Function;
}) {
  const router = useRouter();

  const variables = {
    type: type,
  };

  const [result] = useQuery({
    query: query,
    variables: variables,
  });
  const { data, fetching, error } = result;
  console.log(data);

  if (fetching) return <div>fetching</div>;
  if (error) return <div>error</div>;

  return (
    <div className="flex flex-col ml-24 mt-4 gap-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{title}</span>
        <span className="font-medium text-xs opacity-50 cursor-not-allowed">
          View All
        </span>
      </div>

      <div className="flex flex-col gap-2 text-xs">
        {data.Page.media.map((media, index) => (
          <div
            key={index}
            className="flex gap-4"
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
                  onClick={() => router.push(`/${media.id}`)}
                  src={media.coverImage.large}
                  alt={media.title.romaji}
                  className="h-16 w-10 object-cover rounded cursor-pointer"
                />
                <div className="flex flex-col gap-2 justify-center">
                  <span
                    onClick={() => router.push(`/${media.id}`)}
                    className="font-medium text-sm truncate w-60 cursor-pointer"
                  >
                    {media.title.romaji}
                  </span>
                  <div className="flex gap-1 text-[10px]">
                    {media.genres.slice(0, 3).map((genre: string) => (
                      <div
                        key={genre}
                        style={{ backgroundColor: media.coverImage.color }}
                        className={`px-2 rounded-full text-neutral-900 font-medium `}
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
