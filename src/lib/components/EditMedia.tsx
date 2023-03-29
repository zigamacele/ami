import React from 'react';
import Inputs from './EditMedia/Inputs';

import { HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function EditMedia({
  setShowPopup,
  popupMedia,
}: {
  setShowPopup: Function;
  popupMedia: any;
}) {
  return (
    <div
      onClick={() => {
        setShowPopup(false);
      }}
      className="h-full w-full fixed bg-neutral-900/90 z-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-neutral-800 h-[30em] w-[45em] rounded ml-20 relative"
      >
        <div className="absolute top-2 right-2 z-50 h-36 flex flex-col justify-between">
          <XMarkIcon
            onClick={() => setShowPopup(false)}
            className="h-5 w-5 cursor-pointer hover:text-neutral-500 self-end"
          />
          <div className="flex items-center gap-4">
            <HeartIcon className="w-5 h-5 cursor-pointer" />
            <span className="text-sm bg-neutral-600 px-2 py-1 rounded cursor-pointer">
              Done
            </span>
          </div>
        </div>
        <div>
          <div className="absolute opacity-30 w-full h-40 bg-gradient-to-t from-neutral-900 via-neutral-900 top-0"></div>
          {popupMedia.bannerImage ? (
            <img
              src={popupMedia.bannerImage}
              className="w-full rounded-t h-40 opacity-70 object-cover"
              alt={popupMedia.title.romaji}
            />
          ) : (
            <div className="w-full h-40"></div>
          )}
        </div>

        <div className="absolute top-20 left-8 flex items-center gap-2 text-sm">
          <img
            src={popupMedia.coverImage.large}
            className="w-24 h-32 rounded object-cover"
            alt={popupMedia.title.romaji}
          />
          <span className="mt-16">{popupMedia.title.romaji}</span>
        </div>
        <div className="mt-16 ml-8 text-xs">
          <Inputs media={popupMedia} />
        </div>
      </div>
    </div>
  );
}
