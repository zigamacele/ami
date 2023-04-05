import EditMedia from '@/lib/components/EditMedia';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { gql, useQuery } from 'urql';
import StatusDropdown from '../StatusDropdown';

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
  const [hoverTitle, setHoverTitle] = useState('');
  const [popupMedia, setPopupMedia] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat') || 'POINT_100'
      : 'POINT_100';

  const variables = {
    type: type,
    format: viewerScoreFormat,
  };

  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
  });
  const { data, fetching, error } = result;

  const refresh = () => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  };

  if (fetching)
    return (
      <div className="ml-24 mt-6 flex flex-col rounded-full gap-2 fade-in-fast">
        <div className="flex justify-between">
          <div className="w-32 h-2.5 bg-neutral-900 rounded-full animate-pulse"></div>
          <div className="w-20 h-2.5 bg-neutral-900 rounded-full animate-pulse"></div>
        </div>
        <div className="flex gap-2">
          {[...Array(5)].map((x, index) => (
            <div
              key={index}
              className="rounded h-32 w-24 bg-neutral-900 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  if (error) return <div>error</div>;

  return (
    <div className="flex flex-col ml-24 mt-4 gap-2">
      {showPopup ? (
        <EditMedia
          popupMedia={popupMedia}
          setShowPopup={setShowPopup}
          refresh={refresh}
        />
      ) : null}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{title}</span>
        <span className="font-medium text-xs opacity-50 cursor-not-allowed">
          View All
        </span>
      </div>

      <div className="flex gap-2">
        {data.Page.media.map((media: any, index: number) => (
          <div
            key={index}
            onMouseEnter={() => {
              setHoverBackground(media.bannerImage);
              setHoverTitle(media.title.romaji);
            }}
            onMouseLeave={() => {
              setHoverBackground('');
              setHoverTitle('');
            }}
            className="relative hover:opacity-80 fade-in-fast"
          >
            {hoverTitle === media.title.romaji ? (
              <div className="absolute top-[-0.1em] left-[-1.2em] fade-in-fast">
                <StatusDropdown
                  media={media}
                  setMedia={setPopupMedia}
                  setShowPopup={setShowPopup}
                />
              </div>
            ) : null}
            <img
              onClick={() => router.push(`/id/${media.id}`)}
              src={media.coverImage.large}
              alt={media.title.romaji}
              className="h-32 w-24 object-cover rounded cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
