import React from 'react';
import { gql, useQuery } from 'urql';

export default function ListCategory({
  type,
  query,
  title,
  status,
}: {
  title: string;
  status: string;
  type: string;
  query: any;
}) {
  const viewerId =
    typeof window !== 'undefined' ? localStorage.getItem('viewerId') : null;

  const variables = {
    userId: viewerId,
    status: status,
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
    <div className="flex flex-col gap-2 mt-4 w-full">
      <span className="font-semibold text-sm text-left ml-8">{title}</span>
      <div className="flex flex-col bg-neutral-900 p-2 rounded">
        <div className="flex justify-between p-2 font-medium text-sm">
          <div className="flex gap-1">
            <span className="w-12"></span>
            <span>Title</span>
          </div>
          <div className="flex gap-2">
            <span className="w-10 text-center">Score</span>
            <span className="w-20 text-center">Progress</span>
            {type !== 'MANGA' ? null : (
              <span className="w-20 text-center">Volumes</span>
            )}
            <span className="w-20 text-center">Type</span>
          </div>
        </div>
        {data.Page.mediaList.map((media: any) => (
          <div
            key={media.media.title.romaji}
            className="flex items-center justify-between hover:bg-neutral-700 rounded p-2 text-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src={media.media.coverImage.large}
                className="w-12 rounded h-12 object-cover"
              />
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
                <span className="w-20 text-center">
                  {media.progressVolumes}
                </span>
              )}
              <span className="w-20 text-center">{media.media.format}</span>
            </div>
          </div>
        ))}
        {data.Page.mediaList.length !== 0 ? null : (
          <div className="opacity-30 text-center py-2 font-light">
            This list is empty
          </div>
        )}
      </div>
    </div>
  );
}
