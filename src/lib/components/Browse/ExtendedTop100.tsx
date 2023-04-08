import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from 'urql';
import EditMedia from '../EditMedia';

export const ExtendedTop100 = ({
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
          <div className="flex flex-col ml-[5.8em] mt-4 gap-2">
            {showPopup ? (
              <EditMedia
                popupMedia={popupMedia}
                setShowPopup={setShowPopup}
                refresh={refresh}
              />
            ) : null}
            <div className="flex justify-between items-center mb-2">
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
              <div className="flex flex-col gap-2 mt-2">
                {[...Array(3)].map((x, index) => (
                  <div
                    key={index}
                    className="flex ml-[8.6em] items-center gap-3.5"
                  >
                    <div className="rounded h-20 w-[43em] bg-neutral-900 animate-pulse"></div>
                  </div>
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
                  className="flex gap-4 fade-in-fast hover:opacity-80"
                  onMouseEnter={() => setHoverBackground(media.bannerImage)}
                  onMouseLeave={() => setHoverBackground('')}
                >
                  <div className="flex font-bold justify-center items-center w-8">
                    {index < 100 && (
                      <>
                        <span className="text-sm opacity-20">#</span>
                        <span className="text-xl opacity-60">{index + 1}</span>
                      </>
                    )}
                  </div>
                  <div className="bg-neutral-900 rounded p-2 flex justify-between w-[43em]">
                    <div className="flex gap-2">
                      <img
                        onClick={() => router.push(`/id/${media.id}`)}
                        src={media.coverImage.large}
                        alt={media.title.romaji}
                        className="h-16 w-10 object-cover rounded cursor-pointer"
                      />
                      <div className="flex flex-col gap-2 justify-center">
                        <span
                          onClick={() => router.push(`/id/${media.id}`)}
                          className="font-medium text-sm truncate w-60 cursor-pointer"
                        >
                          {media.title.romaji}
                        </span>
                        <div className="flex gap-1 text-[10px]">
                          {media.genres.slice(0, 8).map((genre: string) => (
                            <div
                              key={genre}
                              style={{
                                backgroundColor: media.coverImage.color
                                  ? media.coverImage.color
                                  : '#737373',
                              }}
                              className="px-2 rounded-full text-neutral-900 font-medium"
                            >
                              {genre.toLowerCase()}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center text-xs">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex gap-2 items-center">
                          <FaceSmileIcon className="h-5 w-5 text-lime-500" />
                          <span className="font-bold">
                            {media.averageScore}%
                          </span>
                        </div>
                        <span className="opacity-60">
                          {media.popularity} users
                        </span>
                      </div>
                    </div>
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
