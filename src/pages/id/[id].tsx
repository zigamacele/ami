import EditMedia from '@/lib/components/EditMedia';
import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Characters from '@/lib/components/Id/Characters';
import Description from '@/lib/components/Id/Description';
import RelatedInfo from '@/lib/components/Id/RelatedInfo';
import Staff from '@/lib/components/Id/Staff';
import Stats from '@/lib/components/Id/Stats';
import Navbar from '@/lib/components/Navbar';
import { addToFavorites } from '@/lib/graphql/query/mutations/addToFavorites';
import { singleMediaInfo } from '@/lib/graphql/query/singleMediaInfo';
import { addedToFavorites, humanStatus } from '@/lib/helpers/anilistResponse';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'urql';

import { ChevronDownIcon, HeartIcon } from '@heroicons/react/24/solid';

export default function Id() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMedia, setPopupMedia] = useState({});
  const [favoriteResult, updateResult] = useMutation(addToFavorites);

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat')
      : null;

  const variables = {
    mediaId: router.query.id,
    format: viewerScoreFormat,
  };

  const [result, reexecuteQuery] = useQuery({
    query: singleMediaInfo,
    variables: variables,
  });

  const refresh = () => {
    reexecuteQuery({ requestPolicy: 'cache-and-network' });
  };

  const { data, fetching, error } = result;

  if (fetching) return <div>fetching</div>;
  if (error) return <div>error</div>;

  console.log(data);

  const submitFavorite = () => {
    const variables =
      data.Media.type === 'ANIME'
        ? { animeId: data.Media.id }
        : { mangaId: data.Media.id };
    updateResult(variables).then((result) =>
      toast.success(
        addedToFavorites(data.Media.title.romaji, data.Media.isFavourite)
      )
    );
  };

  return (
    <div>
      <div className="flex flex-col">
        <Navbar />
        <GetBannerImage hoverBackground={data.Media.bannerImage} />
        {/* <div
          style={{ zIndex: '-1' }}
          className="absolute w-full top-0 h-[20em] bg-neutral-900/60 rounded-b z-0"
        ></div> */}
        {showPopup ? (
          <EditMedia
            setShowPopup={setShowPopup}
            popupMedia={data.Media}
            refresh={refresh}
          />
        ) : null}
        <div className="flex flex-col absolute top-10 gap-3 mb-10">
          <div className="flex gap-4 w-screen">
            <div className="absolute flex flex-col ml-24 gap-2 fade-in-fast">
              <img
                onClick={refresh}
                src={data.Media.coverImage.large}
                alt="Picture of the author"
                className="w-40 h-60 object-cover rounded"
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
                      ? humanStatus(
                          data.Media.mediaListEntry.status,
                          data.Media.type
                        )
                      : 'Add to List'}
                  </span>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
                <HeartIcon
                  onClick={submitFavorite}
                  className={`w-7 h-7 ${
                    data.Media.isFavourite
                      ? 'text-neutral-200/60'
                      : 'text-neutral-200'
                  } rounded p-1.5 cursor-pointer bg-red-500`}
                />
              </div>
            </div>
            <div className="mt-[5.5em] pt-12 pb-4 flex flex-col gap-4 bg-neutral-900/60 pl-[17.5em] w-full">
              <span className="opacity-80 text-lg truncate w-[30em] fade-in-slow">
                {data.Media.title.romaji}
              </span>
              <Description desc={data.Media.description} />
            </div>
          </div>
          <div className="flex gap-4 mt-4 ml-24">
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
                    className="fade-in-fast"
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
