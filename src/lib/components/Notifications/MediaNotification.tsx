import { timeFromNow } from '@/lib/helpers/moment';
import { useRouter } from 'next/router';
import React from 'react';

export default function MediaNotification({ notif }: { notif: any }) {
  const router = useRouter();
  return (
    <div className="flex justify-between w-[53em] text-sm bg-neutral-900 p-2 rounded fade-in-fast hover:opacity-80">
      <div>
        <div className="flex items-center gap-3">
          <img
            onClick={() => router.push(`/id/${notif.media.id}`)}
            src={notif.media.coverImage.large}
            alt={notif.media.title.romaji}
            className="w-10 h-14 object-cover rounded cursor-pointer"
          />
          {notif.type !== 'AIRING' ? (
            <div className="flex gap-1 ">
              <div className="cursor-not-allowed max-width-prose flex flex-col">
                <p
                  onClick={() => router.push(`/id/${notif.media.id}`)}
                  className="opacity-80 cursor-pointer"
                >
                  {notif.media.title.romaji}
                </p>
                <p className="opacity-60">{notif.context}</p>
              </div>
              <div className="opacity-60"></div>
            </div>
          ) : (
            <div>
              <span className="opacity-60">{notif.contexts[0]}</span>
              <span className="opacity-60">{notif.episode}</span>
              <span className="opacity-60">{notif.contexts[1]}</span>
              <span
                onClick={() => router.push(`/id/${notif.media.id}`)}
                className="opacity-80 cursor-pointer"
              >
                {notif.media.title.romaji}
              </span>
              <span className="opacity-60">{notif.contexts[2]}</span>
            </div>
          )}
        </div>
      </div>
      <span className="opacity-60 text-xs">{timeFromNow(notif.createdAt)}</span>
    </div>
  );
}
