import EditMedia from '@/lib/components/EditMedia';
import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Characters from '@/lib/components/Id/Characters';
import RelatedInfo from '@/lib/components/Id/RelatedInfo';
import Staff from '@/lib/components/Id/Staff';
import Stats from '@/lib/components/Id/Stats';
import Navbar from '@/lib/components/Navbar';
import { singleMediaInfo } from '@/lib/graphql/query/singleMediaInfo';
import { Markup } from 'interweave';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'urql';

import { ChevronDownIcon, HeartIcon } from '@heroicons/react/24/solid';

export default function Id() {
  const router = useRouter();
  const [readMore, setReadMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMedia, setPopupMedia] = useState({});

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
      <div className="flex flex-col">
        <Navbar />
        <GetBannerImage hoverBackground={data.Media.bannerImage} />
        {/* <div className="w-full ml-[6em] h-[10.75em] bg-neutral-900 rounded-b"></div> */}
        {showPopup ? (
          <EditMedia setShowPopup={setShowPopup} popupMedia={data.Media} />
        ) : null}
        <div className="flex flex-col absolute left-[6em] top-10 gap-3 mb-10 ">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <img
                src={data.Media.coverImage.large}
                alt="Picture of the author"
                className="w-40 object-cover rounded"
              />
              <div className="flex items-center justify-between">
                <div
                  onClick={() => {
                    setShowPopup(true);
                  }}
                  className="flex items-center justify-center w-[7.5em] gap-2 bg-neutral-600 rounded py-1 cursor-pointer"
                >
                  <span className="text-sm ">
                    {data.Media.mediaListEntry
                      ? data.Media.mediaListEntry.status
                      : 'Add to List'}
                  </span>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
                <HeartIcon className=" w-7 h-7 bg-rose-600 rounded p-1.5 cursor-pointer" />
              </div>
            </div>
            <div className="self-end flex flex-col gap-4">
              <span className="opacity-80 text-lg">
                {data.Media.title.romaji}
              </span>
              <Markup
                content={
                  !readMore
                    ? data.Media.description.slice(0, 250)
                    : data.Media.description
                }
                className="text-xs opacity-50 w-[40em] mb-1"
              />
              {/* <span className="text-xs">{data.Media.description}</span> */}
            </div>
          </div>
          <div className="flex gap-4">
            <Stats data={data.Media} />
            <div className="flex flex-col gap-4">
              <RelatedInfo data={data.Media.relations} />
              <Staff data={data.Media.staff} />
              <Characters data={data.Media.characters} />
              {data.Media.trailer ? (
                <div className="flex flex-col gap-2 text-xs font-medium mt-48 mb-5">
                  <div className="opacity-80">Trailer</div>
                  <iframe
                    width="525"
                    height="295"
                    src={`https://www.youtube.com/embed/${data.Media.trailer.id}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
