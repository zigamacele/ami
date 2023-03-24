import React from 'react';
import { gql, useQuery } from 'urql';

export default function Trending({
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
        <span className="font-medium text-xs opacity-50">View All</span>
      </div>

      <div className="flex gap-2">
        {data.Page.media.map((media, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoverBackground(media.bannerImage)}
            onMouseLeave={() => setHoverBackground('')}
          >
            <img
              src={media.coverImage.large}
              alt={media.title.romaji}
              className="h-32 w-24 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
