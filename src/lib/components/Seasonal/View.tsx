import React from 'react';

export default function View({ data }: { data: any }) {
  return (
    <div className="bg-neutral-900 w-full">
      {data && <div>{data.title.romaji}</div>}
    </div>
  );
}
