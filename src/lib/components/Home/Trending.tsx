import EditMedia from '@/lib/components/EditMedia';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from 'urql';
import StatusDropdown from '../StatusDropdown';
import TrendingSkeleton from './Trending/TrendingSkeleton';

export const dotStatus = (status: string | null) => {
  if (status === 'CURRENT')
    return (
      <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-blue-500"></div>
    );

  if (status === 'PLANNING')
    return (
      <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-yellow-500"></div>
    );
  if (status === 'COMPLETED')
    return (
      <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-lime-500"></div>
    );
  return <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-red-500"></div>;
};

export default function Trending({
  type,
  query,
  title,
  perPage,
  setHoverBackground,
}: {
  type: string;
  query: any;
  title: string;
  perPage: number;
  setHoverBackground: Function;
}) {
  const [hoverTitle, setHoverTitle] = useState('');
  const [popupMedia, setPopupMedia] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  const { asPath } = router;

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat') || 'POINT_100'
      : 'POINT_100';

  const variables = {
    type: type,
    format: viewerScoreFormat,
    perPage: perPage,
  };

  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
  });
  const { data, fetching, error } = result;

  const viewerTitleLanguage =
    typeof window !== 'undefined' &&
    localStorage.getItem('viewerTitleLanguage');

  const refresh = () => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  };

  useEffect(() => refresh(), []);

  if (fetching) return asPath === '/home' ? <TrendingSkeleton /> : null;
  if (error) return <div>error</div>;

  return (
    <div className="flex flex-col ml-24 mt-4 gap-2">
      {showPopup && (
        <EditMedia
          popupMedia={popupMedia}
          setShowPopup={setShowPopup}
          refresh={refresh}
        />
      )}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm">{title}</span>
        <span
          onClick={() => {
            if (title === 'TRENDING NOW') router.push(`/browse/trending`);
            if (title === 'ALL TIME POPULAR') router.push(`/browse/popular`);
          }}
          className="font-medium text-xs opacity-50 hover:opacity-70 cursor-pointer"
        >
          View All
        </span>
      </div>

      <div className="flex gap-2">
        {data.Page.media.map((media: any, index: number) => (
          <div
            key={index}
            onMouseEnter={() => {
              setHoverBackground(media.bannerImage);
              setHoverTitle(media.title.userPreferred);
            }}
            onMouseLeave={() => {
              setHoverBackground('');
              setHoverTitle('');
            }}
            className="relative hover:opacity-80 fade-in-fast"
          >
            {hoverTitle === media.title.userPreferred && (
              <div className="absolute top-[-0.1em] left-[-1.2em] fade-in-fast">
                <StatusDropdown
                  media={media}
                  setMedia={setPopupMedia}
                  setShowPopup={setShowPopup}
                />
              </div>
            )}
            <img
              onClick={() => router.push(`/id/${media.id}`)}
              src={media.coverImage.large}
              alt={media.title.userPreferred}
              className={`${
                asPath === '/browse' ? 'h-48 w-36' : 'h-32 w-24'
              } object-cover rounded cursor-pointer`}
            />
            {asPath === '/browse' && (
              <div className="flex items-center mt-1 w-32 truncate text-sm cursor-pointer gap-1.5">
                {media.mediaListEntry && dotStatus(media.mediaListEntry.status)}
                <div className="opacity-60">{media.title.userPreferred}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
