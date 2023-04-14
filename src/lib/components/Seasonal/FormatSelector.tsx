import React from 'react';

export default function FormatSelector({
  format,
  setFormat,
}: {
  format: string;
  setFormat: Function;
}) {
  return (
    <div className="flex items-center absolute right-2 top-1 text-xs z-10 bg-neutral-900/80 backdrop-blur-md px-2 py-1 rounded-full gap-2 fade-in-fast">
      <span
        onClick={() => {
          setFormat('TV');
        }}
        className={`${format === 'TV' ? null : 'opacity-30'} cursor-pointer`}
      >
        TV
      </span>
      <span
        onClick={() => {
          setFormat('MOVIE');
        }}
        className={`${format === 'MOVIE' ? null : 'opacity-30'} cursor-pointer`}
      >
        MOVIES
      </span>
      <span
        onClick={() => {
          setFormat('SPECIAL');
        }}
        className={`${
          format === 'SPECIAL' ? null : 'opacity-30'
        } cursor-pointer`}
      >
        SPECIALS
      </span>
      <span
        onClick={() => {
          setFormat('OVA');
        }}
        className={`${format === 'OVA' ? null : 'opacity-30'} cursor-pointer`}
      >
        OVAs
      </span>
      <span
        onClick={() => {
          setFormat('ONA');
        }}
        className={`${format === 'ONA' ? null : 'opacity-30'} cursor-pointer`}
      >
        ONAs
      </span>
    </div>
  );
}
