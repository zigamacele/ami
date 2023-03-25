import IndividualMedia from '@/lib/components/Browse/IndividualMedia';
import SearchComponent from '@/lib/components/Browse/SearchComponent';
import { GetBannerImage } from '@/lib/components/GetBannerImage';
import AnimeMangaSwitch from '@/lib/components/Home/AnimeMangaSwitch';
import Navbar from '@/lib/components/Navbar';
import { browse } from '@/lib/graphql/query/browse';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

import { TagIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function Browse() {
  const [userInput, setUserInput] = useState('');
  const [type, setType] = useState('ANIME');
  const [loading, setLoading] = useState('ANIME');
  const [hoverBackground, setHoverBackground] = useState('');
  const [hoverTag, setHoverTag] = useState(false);

  const variables = {
    type: type,
    search: userInput,
  };

  const [result] = useQuery({
    query: browse,
    variables: variables,
  });
  const { data, fetching, error } = result;
  console.log(data);

  console.log('ZIGA DATA', data);

  // useEffect(() => {}, [userInput]);

  return (
    <section className="flex flex-col">
      <AnimeMangaSwitch type={type} setType={setType} />

      <Navbar />
      <GetBannerImage hoverBackground={hoverBackground} />
      <div className="flex flex-col items-center justify-center ml-20">
        <div className="flex flex-col gap-3 mt-4">
          <SearchComponent userInput={userInput} setUserInput={setUserInput} />
          {/* <AdjustmentsHorizontalIcon className="h-9 self-end w-9 rounded bg-zinc-700 text-zinc-400 p-2 cursor-not-allowed" /> */}
          {userInput === '' ? null : (
            <div className="flex items-center gap-2">
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

        {data ? (
          <div className="flex flex-wrap gap-6  my-4 px-4 items-center justify-center">
            {data.Page.media.map((media: any) => (
              <IndividualMedia
                key={media.id}
                media={media}
                setHoverBackground={setHoverBackground}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
