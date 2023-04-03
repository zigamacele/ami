import EditMedia from '@/lib/components/EditMedia';
import {
  CalendarIcon,
  CheckIcon,
  PencilIcon,
  PlayIcon,
  PlusIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import Buttons from './HoverMenu/Buttons';

export default function HoverMenu({
  media,
  setShowMenu,
  showMenu,
  refresh,
}: {
  media: any;
  setShowMenu: Function;
  showMenu: Boolean;
  refresh: Function;
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="absolute bottom-7 right-1">
      {showPopup ? (
        <EditMedia
          setShowPopup={setShowPopup}
          popupMedia={media}
          refresh={refresh}
        />
      ) : null}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseEnter={() => {
          setShowMenu(true);
        }}
        onMouseLeave={() => {
          setShowMenu(false);
        }}
        className="flex flex-col gap-1"
      >
        {showMenu ? <Buttons media={media} /> : null}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowPopup(true);
          }}
        >
          {media.mediaListEntry ? (
            <PencilIcon className="w-7 h-7 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110" />
          ) : (
            <PlusIcon className="w-7 h-7 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110" />
          )}
        </div>
      </div>
    </div>
  );
}
