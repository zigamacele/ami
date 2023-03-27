import React from 'react';

export default function IndividualStat({
  data,
  title,
}: {
  data: any;
  title: string;
}) {
  return (
    <div>
      {!Array.isArray(data) ? (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium opacity-80">{title}</span>
          <span className="text-xs opacity-60">{data}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium opacity-80">{title}</span>
          {data.map((genre) => (
            <span key={genre} className="text-xs opacity-60">
              {genre}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
