import React from 'react';
import { gql, useQuery } from 'urql';
import IndividualTitle from './IndividualTitle';

export default function ListCategory({
  type,
  query,
  title,
  status,
  setHoverBackground,
  setShowPopup,
  setPopupMedia,
}: {
  title: string;
  status: string;
  type: string;
  query: any;
  setHoverBackground: Function;
  setShowPopup: Function;
  setPopupMedia: Function;
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
          <IndividualTitle
            key={media.media.title.romaji}
            media={media}
            type={type}
            setHoverBackground={setHoverBackground}
            setShowPopup={setShowPopup}
            setPopupMedia={setPopupMedia}
          />
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
