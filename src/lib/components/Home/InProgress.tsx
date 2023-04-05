import { updateProgress } from '@/lib/graphql/query/mutations/updateProgress';
import { timeFromNow } from '@/lib/helpers/moment';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'urql';

export default function InProgress({
  type,
  query,
  setHoverBackground,
}: {
  setHoverBackground: Function;
  type: string;
  query: any;
}) {
  const router = useRouter();
  const [hovering, setHovering] = useState({ id: '', progress: '' });

  const viewerId =
    typeof window !== 'undefined' ? localStorage.getItem('viewerId') : null;

  const variables = {
    userId: viewerId,
    status: 'CURRENT',
    page: 1,
    type: type,
  };

  const [result] = useQuery({
    query: query,
    variables: variables,
  });
  const { data, fetching, error } = result;
  console.log(result);

  const [resultMutation, update] = useMutation(updateProgress);

  const submit = () => {
    const variables = { mediaId: hovering.id, progress: hovering.progress + 1 };
    update(variables).then((result) => {
      console.log(result);
      toast.success(
        `${result.data.SaveMediaListEntry.media.title.romaji} list entry updated`
      );
    });
  };

  if (fetching)
    return (
      <div className=" mt-6 flex flex-col rounded-full gap-2 fade-in-fast">
        <div className="self-end w-32 h-2.5 bg-neutral-900 rounded-full animate-pulse "></div>
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((x, index) => (
            <div
              key={index}
              className="w-[13.5em] rounded h-20 bg-neutral-900 animate-pulse "
            ></div>
          ))}
        </div>
      </div>
    );
  if (error) return <div>error</div>;
  return (
    <div className="flex flex-col gap-2 mt-4">
      <span className="font-semibold text-sm text-right">IN PROGRESS</span>
      <div className="flex flex-col gap-2">
        {data.Page.mediaList.map((media: any) => {
          if (media.status === 'CURRENT')
            return (
              <div
                onClick={() => router.push(`/id/${media.media.id}`)}
                key={media.media.title.romaji}
                onMouseEnter={() => {
                  setHoverBackground(media.media.bannerImage);
                  setHovering({ id: media.media.id, progress: media.progress });
                }}
                onMouseLeave={() => {
                  setHoverBackground('');
                  setHovering({ id: '', progress: '' });
                }}
                className="relative cursor-pointer fade-in-fast from-black hover:from-neutral-500"
              >
                {hovering.id === media.media.id && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      submit();
                    }}
                    className="absolute bottom-1 right-1 text-neutral-900  h-6 w-6 rounded-full cursor-pointer z-10 hover:text-white fade-in-fast"
                  >
                    <PlusCircleIcon />
                  </div>
                )}
                {media.media.nextAiringEpisode ? (
                  <div className="absolute bg-neutral-900 z-10 top-1 right-1 py-1 px-2 rounded-full text-[10px]">
                    {`EP ${media.media.nextAiringEpisode.episode}: 
                    ${timeFromNow(media.media.nextAiringEpisode.airingAt)}`}
                  </div>
                ) : null}
                <div className="absolute z-10 text-white top-11 rounded-r-full text-[11px] pr-2 pl-1">
                  Progress: {media.progress}/
                  {type === 'ANIME'
                    ? !media.media.episodes
                      ? '?'
                      : media.media.episodes
                    : !media.media.chapters
                    ? '?'
                    : media.media.chapters}
                </div>
                <div className="absolute text-sm z-10 text-white bottom-0.5 left-1 font-medium flex flex-col">
                  <div className="flex items-center gap-1">
                    {media.media.status === 'RELEASING' ? (
                      <div className="bg-blue-500 h-2 w-2 rounded-full"></div>
                    ) : null}
                    <span className="truncate w-40">
                      {media.media.title.romaji}
                    </span>
                  </div>
                </div>
                <div className="absolute opacity-30 w-full h-20 bg-gradient-to-t top-0 rounded"></div>
                <div className="absolute opacity-30 w-full h-20 bg-gradient-to-t top-0 rounded"></div>
                <img
                  src={
                    media.media.bannerImage
                      ? media.media.bannerImage
                      : media.media.coverImage.large
                  }
                  className="w-[13.5em] rounded h-20 object-cover"
                  alt={media.media.title.romaji}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
