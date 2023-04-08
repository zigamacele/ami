import { Extended } from '@/lib/components/Browse/Extended';
import IndividualMedia from '@/lib/components/Browse/IndividualMedia';
import SearchComponent from '@/lib/components/Browse/SearchComponent';
import { GetBannerImage } from '@/lib/components/GetBannerImage';
import AnimeMangaSwitch from '@/lib/components/Home/AnimeMangaSwitch';
import Navbar from '@/lib/components/Navbar';
import { allTimePopular } from '@/lib/graphql/query/allTimePopular';
import { browse } from '@/lib/graphql/query/browse';
import { TagIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useQuery } from 'urql';

export default function BrowsePath() {
  const [userInput, setUserInput] = useState('');
  const [type, setType] = useState('ANIME');
  const [loading, setLoading] = useState('ANIME');
  const [hoverBackground, setHoverBackground] = useState('');
  const [hoverTag, setHoverTag] = useState(false);

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat') || 'POINT_100'
      : 'POINT_100';

  const variables = {
    type: type,
    search: userInput,
    format: viewerScoreFormat,
  };

  const [result, reexecuteQuery] = useQuery({
    query: browse,
    variables: variables,
  });

  const refresh = () => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  };

  const { data, fetching, error } = result;

  return (
    <div className="mb-4">
      <section className="flex flex-col">
        <AnimeMangaSwitch type={type} setType={setType} />
        <Navbar />
        <GetBannerImage hoverBackground={hoverBackground} />
        <div className="flex flex-col items-center justify-center ml-20">
          <div className="flex flex-col gap-3 mt-4">
            <SearchComponent
              userInput={userInput}
              setUserInput={setUserInput}
            />
            {userInput === '' ? null : (
              <div className="flex items-center gap-2 fade-in-fast">
                <TagIcon className="h-5 w-5 text-zinc-400" />
                <div
                  onMouseEnter={() => {
                    setHoverTag(true);
                  }}
                  onMouseLeave={() => {
                    setHoverTag(false);
                  }}
                  onClick={() => setUserInput('')}
                  className="flex items-center gap-1 rounded-md py-0.5 px-2 text-xs bg-neutral-500 cursor-pointer"
                >
                  <span>Search: {userInput}</span>
                  {!hoverTag ? null : <XMarkIcon className="h-3 w-3 " />}
                </div>
              </div>
            )}
          </div>
          {fetching && userInput.length > 0 && (
            <div className=" mt-6 flex flex-col rounded-full gap-2 fade-in-fast">
              <div className="flex flex-wrap justify-center gap-6">
                {[...Array(8)].map((x, index) => (
                  <div key={index} className="flex flex-col gap-1.5">
                    <div className="h-52 rounded w-36 bg-neutral-900 animate-pulse "></div>
                    <div className="w-32 h-2.5 bg-neutral-900 rounded-full animate-pulse "></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data && !fetching && (
            <div className="flex flex-wrap gap-6  my-4 px-4 items-start justify-start ml-10">
              {data.Page.media.map((media: any) => (
                <IndividualMedia
                  key={media.id}
                  media={media}
                  setHoverBackground={setHoverBackground}
                  refresh={refresh}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      {userInput.length === 0 && (
        <div className="flex items-center justify-center mr-3">
          <Extended
            type={type}
            format={viewerScoreFormat}
            setHoverBackground={setHoverBackground}
            perPage={20}
            query={allTimePopular}
            title="ALL TIME POPULAR"
          />
        </div>
      )}
    </div>
  );
}
