import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { gql, useQuery } from 'urql';
import { update } from '../redux/viewerSlice';

const getViewer = gql`
  query {
    Viewer {
      id
      name
      bannerImage
      avatar {
        large
      }
    }
  }
`;

export const GetBannerImage = ({
  hoverBackground,
}: {
  hoverBackground: string;
}) => {
  // const dispatch = useDispatch();
  const [result] = useQuery({
    query: getViewer,
  });

  const { data, fetching, error } = result;
  if (fetching)
    return <span className="w-screen h-32 bg-neutral-700 animate-pulse"></span>;

  // dispatch(update(data.Viewer));

  return (
    <header className="flex w-screen bg-neutral-900 h-32 justify-end items-end relative">
      <div className="absolute opacity-30 w-full h-32 bg-gradient-to-t from-neutral-900 via-neutral-900 top-0"></div>
      {hoverBackground === '' ? (
        <div>
          {data.Viewer.bannerImage ? (
            <img
              src={data.Viewer.bannerImage}
              alt="Picture of the author"
              className="w-screen object-cover"
            />
          ) : null}
        </div>
      ) : (
        <img
          src={hoverBackground ? hoverBackground : data.Viewer.bannerImage}
          alt="Picture of the author"
          className="w-screen object-cover"
        />
      )}

      {/* <div className="absolute flex items-center gap-2 bottom-1 right-2">
        <Image
          src={data.Viewer.avatar.large}
          alt="Picture of the author"
          width={500}
          height={500}
          className="w-12 h-12 rounded-full borders bg-neutral-700 object-cover"
        />

        <span className="font-medium text-sm">{data.Viewer.name}</span>
        <ChevronDownIcon className="h-5 w-5" />
      </div> */}
    </header>
  );
};
