import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { gql, useQuery } from 'urql';
import ToolTip from './Navbar/Tooltip';

import {
  BellIcon,
  CalendarDaysIcon,
  Cog8ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';

const getViewer = gql`
  query {
    Viewer {
      id
      name
      unreadNotificationCount
      bannerImage
      avatar {
        large
      }
    }
  }
`;

export default function Navbar() {
  const router = useRouter();

  const [result] = useQuery({
    query: getViewer,
  });

  const { data, fetching, error } = result;
  if (fetching)
    return (
      <span className="bg-neutral-900/80 backdrop-blur-lg z-50 h-96 rounded-3xl w-[4.5em] fixed mx-3 my-2 animate-pulse flex justify-center">
        <div className="h-10 w-10 rounded-full bg-neutral-800 mt-4"></div>
      </span>
    );

  return (
    <nav className="fixed z-10 rounded-3xl mx-3 my-2 bg-neutral-900/80 backdrop-blur-lg p-4 flex flex-col gap-4 items-center">
      <Image
        src={data.Viewer.avatar.large}
        alt="Picture of the author"
        width={500}
        height={500}
        className="w-10 h-10 rounded-full borders bg-neutral-700 object-cover hover:animate-spin cursor-pointer"
      />
      <div className="flex flex-col items-center justify-between h-96 pb-2 text-neutral-700">
        <div className="flex flex-col gap-2 ">
          <ToolTip title="Home" position="right-start">
            <HomeIcon
              onClick={() => router.push('/home')}
              className="h-6 w-6  text-neural-700 cursor-pointer hover:text-neutral-500"
            />
          </ToolTip>
          <ToolTip title="List" position="right-start">
            <QueueListIcon
              onClick={() => router.push('/list')}
              className="h-6 w-6  text-neural-700 cursor-pointer hover:text-neutral-500"
            />
          </ToolTip>
          <ToolTip title="Seasonal" position="right-start">
            <CalendarDaysIcon
              onClick={() => router.push('/seasonal')}
              className="h-6 w-6  text-neural-700 cursor-pointer hover:text-neutral-500"
            />
          </ToolTip>
          <ToolTip title="Social" position="right-start">
            <UsersIcon className="h-5 w-5  text-neural-700 cursor-not-allowed" />
          </ToolTip>
          <ToolTip title="Search" position="right-start">
            <MagnifyingGlassIcon
              onClick={() => router.push('/browse')}
              className="h-6 w-6  text-neural-700 cursor-pointer hover:text-neutral-500"
            />
          </ToolTip>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <ToolTip title="Notifications" position="right-start">
            <div
              onClick={() => router.push('/notifications')}
              className="relative hover:text-neutral-500"
            >
              {data.Viewer.unreadNotificationCount === 0 ? null : (
                <div className="absolute top-[-5px] right-[-5px] bg-rose-600 border border-neutral-900 cursor-pointer w-4 h-4 rounded-full flex justify-center items-center text-white text-xs">
                  {data.Viewer.unreadNotificationCount}
                </div>
              )}
              <BellIcon className="h-6 w-6 text-neural-700 cursor-pointer" />
            </div>
          </ToolTip>
          <ToolTip title="Settings" position="right-start">
            <Cog8ToothIcon
              onClick={() => router.push('/settings')}
              className="h-6 w-6 text-neural-700 cursor-pointer hover:text-neutral-500"
            />
          </ToolTip>
        </div>
      </div>
    </nav>
  );
}
