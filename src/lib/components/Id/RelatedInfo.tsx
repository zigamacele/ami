import { useRouter } from 'next/router';
import React from 'react';

export default function RelatedInfo({ data }: { data: any }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium opacity-80">Relations</span>
      <div className="flex text-[10px] overflow-auto w-[56em] gap-4 h-20">
        {data.nodes.map((media: any, index: number) => (
          <div
            key={media.id}
            className="flex bg-neutral-900 rounded w-64 fade-in-fast shrink-0 hover:opacity-80 gap-10="
          >
            <img
              onClick={() => router.push(`/id/${media.id}`)}
              src={media.coverImage.large}
              className="h-20 w-14 object-cover rounded-l cursor-pointer"
              alt={media.title.userPreferred}
            />
            <div className="flex flex-col justify-between p-2">
              <div className="flex flex-col gap-1">
                <span className="opacity-80">
                  {data.edges[index].relationType}
                </span>
                <span
                  onClick={() => router.push(`/id/${media.id}`)}
                  className="w-24 truncate text-xs cursor-pointer"
                >
                  {media.title.userPreferred}
                </span>
              </div>
              <div className="flex opacity-60 w-28">
                <span>{media.type}</span>
                <span>
                  {media.status !== 'NOT_YET_RELEASED'
                    ? `・ ${media.status}`
                    : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
