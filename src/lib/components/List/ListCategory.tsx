import React, { useState } from 'react';
import { gql, useQuery } from 'urql';
import EditMedia from '../EditMedia';
import IndividualTitle from './IndividualTitle';

export default function ListCategory({
  type,
  query,
  title,
  status,
  setHoverBackground,
}: {
  title: string;
  status: string;
  type: string;
  query: any;
  setHoverBackground: Function;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMedia, setPopupMedia] = useState({});

  const viewerId =
    typeof window !== 'undefined' ? localStorage.getItem('viewerId') : null;

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat')
      : null;

  const variables = {
    userId: viewerId,
    status: status,
    page: 1,
    type: type,
    format: viewerScoreFormat,
  };

  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
  });

  const refresh = () => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  };

  const { data, fetching, error } = result;
  if (fetching)
    return (
      <div className="flex flex-col gap-3.5 mt-6">
        <div className="ml-8 w-24 h-2.5 bg-neutral-900 rounded-full animate-pulse "></div>
        <div className="flex flex-col bg-neutral-900 p-2 rounded">
          <div className="flex justify-between p-2 font-medium text-sm">
            <div className="flex gap-1">
              <span className="w-12"></span>
              <div className="w-20 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
              <div className="w-16 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
              {type !== 'MANGA' ? null : (
                <div className="w-16 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
              )}
              <div className="w-16 h-2.5 bg-neutral-800 rounded-full animate-pulse "></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {[...Array(7)].map((x, index) => (
              <div
                key={index}
                className="w-full rounded h-12 bg-neutral-800 animate-pulse "
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  if (error) return <div>error</div>;
  return (
    <div className="flex flex-col gap-2 mt-4 w-full">
      {showPopup ? (
        <EditMedia
          setShowPopup={setShowPopup}
          popupMedia={popupMedia}
          refresh={refresh}
        />
      ) : null}
      <span className="font-semibold text-sm text-left ml-8 fade-in-fast">
        {title}
      </span>
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
