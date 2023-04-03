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

  if (fetching) return <div>fetching</div>;
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
        {data.Page.media.map((media, index) => (
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
            className="relative"
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
              onClick={() => router.push(`/${media.id}`)}
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
