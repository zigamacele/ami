import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'urql';
import EditMedia from '../EditMedia';
import { dotStatus } from '../Home/Trending';
import StatusDropdown from '../StatusDropdown';

export const Extended = ({
  type,
  setHoverBackground,
  format,
  title,
  perPage,
  query,
}: {
  type: string;
  perPage: number;
  title: string;
  format: string;
  query: any;
  setHoverBackground: Function;
}) => {
  const [page, setPage] = useState(1);
  const [storage, setStorage] = useState([]);
  const [hoverTitle, setHoverTitle] = useState('');
  const [popupMedia, setPopupMedia] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();
  const { asPath } = router;

  const variables = {
    type: type,
    format: format,
    perPage: perPage,
    page: page,
  };

  const [result, reexecuteQuery] = useQuery({
    query: query,
    variables: variables,
  });

  const refresh = () => {
    console.log('REFRESH');
    reexecuteQuery({ requestPolicy: 'network-only' });
  };

  const { data, fetching, error } = result;

  useEffect(() => {
    setStorage([]);
  }, []);

  useEffect(() => {
    if (storage.length === 0 && data) setStorage([...data.Page.media]);
    if (storage.length > 0 && data)
      setStorage([...storage, ...data.Page.media]);
  }, [data]);

  return (
    <div>
      {data && (
        <div className="flex flex-col justify-center">
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
              {/* <span
                onClick={() => {
                  if (asPath === '/browse') {
                    if (title === 'TRENDING NOW')
                      router.push(`/browse/trending`);
                    if (title === 'ALL TIME POPULAR')
                      router.push(`/browse/popular`);
                  } else router.push(`/browse`);
                }}
                className="font-medium text-xs opacity-50 hover:opacity-70 cursor-pointer mr-3"
              >
                View All
              </span> */}
            </div>
          </div>
          <InfiniteScroll
            dataLength={storage.length}
            next={() => {
              console.log('NEXT');
              setPage(page + 1);
              refresh();
            }}
            hasMore={true}
            loader={
              <div className="flex gap-2 ml-[5.8em] mt-2">
                {[...Array(5)].map((x, index) => (
                  <div
                    key={index}
                    className="rounded h-48 w-[8.8em] bg-neutral-900 animate-pulse"
                  ></div>
                ))}
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="flex flex-wrap justify-center gap-2 ml-20">
              {storage.map((media: any, index) => (
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
                  className="relative hover:opacity-80 fade-in-fast mt-2"
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
                    className={`h-48 w-[8.8em] object-cover rounded cursor-pointer`}
                  />

                  <div className="flex items-center mt-1 w-32 truncate text-sm cursor-pointer gap-1.5">
                    {media.mediaListEntry &&
                      dotStatus(media.mediaListEntry.status)}
                    <div className="opacity-60">{media.title.romaji}</div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};
