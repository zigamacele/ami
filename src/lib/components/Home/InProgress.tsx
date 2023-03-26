import { useRouter } from 'next/router';
import React from 'react';
import { gql, useQuery } from 'urql';

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
                key={media.media.title.romaji}
                onMouseEnter={() => setHoverBackground(media.media.bannerImage)}
                onMouseLeave={() => setHoverBackground('')}
              >
                <img
                  onClick={() => router.push(`/${media.media.id}`)}
                  src={
                    media.media.bannerImage
                      ? media.media.bannerImage
                      : media.media.coverImage.large
                  }
                  className="w-52 rounded h-14 object-cover cursor-pointer"
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
