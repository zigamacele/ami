import { timeFromNow } from '@/lib/helpers/moment';
import React from 'react';

export default function UserNotification({ notif }: { notif: any }) {
  return (
    <div className="flex justify-between w-[53em] text-sm bg-neutral-900 p-2 rounded">
      <div>
        <div className="flex items-center gap-3">
          <img
            src={notif.user.avatar.large}
            alt={notif.user.name}
            className="w-10 h-14 object-cover cursor-not-allowed rounded bg-neutral-700"
          />
          <div className="flex flex-col">
            <div className="opacity-80 cursor-not-allowed">
              {notif.user.name}
            </div>
            <div className="opacity-60">{notif.context}</div>
          </div>
        </div>
      </div>
      <span className="opacity-60 text-xs">{timeFromNow(notif.createdAt)}</span>
    </div>
  );
}
