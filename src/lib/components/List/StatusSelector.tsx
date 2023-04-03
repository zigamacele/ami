import React from 'react';

export default function StatusSelector({
  type,
  status,
  setStatus,
}: {
  type: string;
  status: string;
  setStatus: Function;
}) {
  return (
    <div className="flex items-center absolute right-36 top-1 text-xs z-10 bg-neutral-900/80 backdrop-blur-md px-2 py-1 rounded-full gap-2 fade-in-fast">
      <span
        onClick={() => setStatus('ALL')}
        className={`${status === 'ALL' ? null : 'opacity-30'} cursor-pointer`}
      >
        ALL
      </span>
      <span
        onClick={() => {
          setStatus('CURRENT');
          localStorage.setItem('listStatus', 'CURRENT');
        }}
        className={`${
          status === 'CURRENT' ? null : 'opacity-30'
        } cursor-pointer`}
      >
        {type === 'ANIME' ? 'WATCHING' : 'READING'}
      </span>
      <span
        onClick={() => {
          setStatus('PAUSED');
          localStorage.setItem('listStatus', 'PAUSED');
        }}
        className={`${
          status === 'PAUSED' ? null : 'opacity-30'
        } cursor-pointer`}
      >
        PAUSED
      </span>
      <span
        onClick={() => {
          setStatus('DROPPED');
          localStorage.setItem('listStatus', 'DROPPED');
        }}
        className={`${
          status === 'DROPPED' ? null : 'opacity-30'
        } cursor-pointer`}
      >
        DROPPED
      </span>
      <span
        onClick={() => {
          setStatus('PLANNING');
          localStorage.setItem('listStatus', 'PLANNING');
        }}
        className={`${
          status === 'PLANNING' ? null : 'opacity-30'
        } cursor-pointer`}
      >
        PLANNING
      </span>
      <span
        onClick={() => {
          setStatus('COMPLETED');
          localStorage.setItem('listStatus', 'COMPLETED');
        }}
        className={`${
          status === 'COMPLETED' ? null : 'opacity-30'
        } cursor-pointer`}
      >
        COMPLETED
      </span>
    </div>
  );
}
