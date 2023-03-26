import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Navbar from '@/lib/components/Navbar';
import { singleMediaInfo } from '@/lib/graphql/query/singleMediaInfo';
import { Markup } from 'interweave';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'urql';

import { ChevronDownIcon, HeartIcon } from '@heroicons/react/24/solid';

export default function Id() {
  const router = useRouter();
  console.log('ROUTER', router.query.id);
  const [readMore, setReadMode] = useState(false);

  const variables = {
    mediaId: router.query.id,
  };

  const [result] = useQuery({
    query: singleMediaInfo,
    variables: variables,
  });
  const { data, fetching, error } = result;

  if (fetching) return <div>fetching</div>;
  if (error) return <div>error</div>;

  console.log(data);

  return (
    <div>
      <div className="flex flex-col mb-5">
        <Navbar />
        <GetBannerImage hoverBackground={data.Media.bannerImage} />
        <div className="flex absolute left-[6em] top-10 gap-4">
          <div className="flex flex-col gap-2">
            <img
              src={data.Media.coverImage.large}
              alt="Picture of the author"
              className="w-40 object-cover rounded"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center w-[7.5em] gap-2 bg-neutral-600 rounded py-1 ">
                <span className="text-sm ">
                  {data.Media.mediaListEntry
                    ? data.Media.mediaListEntry.status
                    : 'Add to List'}
                </span>
                <ChevronDownIcon className="w-4 h-4" />
              </div>
              <HeartIcon className=" w-7 h-7 bg-rose-600 rounded p-1.5" />
            </div>
          </div>
          <div className="self-end flex flex-col gap-4">
            <span className="opacity-80 text-lg">
              {data.Media.title.romaji}
            </span>
            <Markup
              content={
                !readMore
                  ? data.Media.description.slice(0, 300)
                  : data.Media.description
              }
              className="text-xs opacity-50 w-[40em] break-normal"
            />
            {/* <span className="text-xs">{data.Media.description}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
