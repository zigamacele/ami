import EditMedia from '@/lib/components/EditMedia';
import { GetBannerImage } from '@/lib/components/GetBannerImage';
import Characters from '@/lib/components/Id/Characters';
import Description from '@/lib/components/Id/Description';
import IdSkeleton from '@/lib/components/Id/IdSkeleton';
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

  if (fetching) return <IdSkeleton />;
  if (error) return <div>error</div>;

  const submitFavorite = () => {
    const variables =
      data.Media.type === 'ANIME'
        ? { animeId: data.Media.id }
        : { mangaId: data.Media.id };
    const loading = toast.loading('Please wait...');
    updateResult(variables).then((result) =>
      toast.update(loading, {
        render: addedToFavorites(
          data.Media.title.romaji,
          data.Media.isFavourite
        ),
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    );
  };

  return (
    <div>
      <div className="flex flex-col">
        <Navbar />
        <GetBannerImage hoverBackground={data.Media.bannerImage} />
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
                  className="flex items-center justify-between w-[7.5em] gap-2 bg-neutral-600 hover:bg-neutral-500 rounded cursor-pointer"
                >
                  <span className="text-sm pl-3">
                    {data.Media.mediaListEntry
                      ? humanStatus(
                          data.Media.mediaListEntry.status,
                          data.Media.type
                        )
                      : 'Add to List'}
                  </span>
                  <ChevronDownIcon className="w-7 h-7 rounded-r bg-neutral-500 p-2" />
                </div>
                <HeartIcon
                  onClick={submitFavorite}
                  className={`w-7 h-7 ${
                    data.Media.isFavourite
                      ? 'text-neutral-200/60'
                      : 'text-neutral-200'
                  } rounded p-1.5 cursor-pointer bg-red-500 hover:bg-red-600`}
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
              {data.Media.relations.edges.length > 0 && (
                <RelatedInfo data={data.Media.relations} />
              )}
              {data.Media.staff.edges.length > 0 && (
                <Staff data={data.Media.staff} />
              )}
              {data.Media.characters.edges.length > 0 && (
                <div className="h-[18.7em]">
                  <Characters data={data.Media.characters} />
                </div>
              )}
              {data.Media.trailer && (
                <div className="flex flex-col gap-2 text-xs font-medium mb-5">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
