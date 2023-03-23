import React from 'react';
import { gql, useQuery } from 'urql';

export default function InProgress({
  type,
  query,
}: {
  type: string;
  query: any;
}) {
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
              <div key={media.media.title.romaji}>
                <img
                  src={media.media.bannerImage}
                  className="w-52 rounded h-14 object-cover"
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}