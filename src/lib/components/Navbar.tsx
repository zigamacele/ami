import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { gql, useQuery } from 'urql';
import { RootState } from '../store';

import {
  BellIcon,
  BookOpenIcon,
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  PlayIcon,
} from '@heroicons/react/24/solid';

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

export default function Navbar() {
  // const viewer = useSelector((state: RootState) => state.viewer.value);
  // console.log(viewer);

  const [result] = useQuery({
    query: getViewer,
  });

  const { data, fetching, error } = result;
  if (fetching)
    return (
      <span className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse"></span>
    );

  return (
    <nav className="fixed z-50 rounded-3xl mx-3 my-2 bg-neutral-900/80 backdrop-blur-lg p-4 w-18 flex flex-col gap-4 items-center">
      {/* <span className="text-4xl bg-neutral-800 rounded-full p-1 text-center hover:animate-spin">
        🐶
      </span> */}

      <Image
        src={data.Viewer.avatar.large}
        alt="Picture of the author"
        width={500}
        height={500}
        className="w-10 h-10 rounded-full borders bg-neutral-700 object-cover"
      />

      {/* <div>{viewer.name || viewer.payload.name}</div> */}

      <div className="flex flex-col items-center justify-between h-96 pb-2 text-neutral-700">
        <div className="flex flex-col gap-2 ">
          <PlayIcon className="h-6 w-6  text-neural-700" />
          <BookOpenIcon className="h-6 w-6 text-neural-700" />
          <NewspaperIcon className="h-6 w-6  text-neural-700" />
          <MagnifyingGlassIcon className="h-6 w-6  text-neural-700" />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <BellIcon className="h-6 w-6 text-neural-700" />
          <Cog8ToothIcon className="h-6 w-6 text-neural-700" />
        </div>
      </div>
    </nav>
  );
}
