import { useRouter } from 'next/router';
import React from 'react';

export default function Staff({ data }: { data: any }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium opacity-80">Staff</span>
      <div className="flex text-[10px] overflow-x-scroll w-[56em] gap-4 h-20">
        {data.edges.map((media, index) => (
          <div
            key={media.node.name.full + media.role}
            className="flex bg-neutral-900 rounded pr-32"
          >
            <img
              src={media.node.image.large}
              className="h-20 w-14 object-cover rounded-l cursor-not-allowed"
            />
            <div className="flex flex-col justify-between p-2">
              <div className="flex flex-col gap-1">
                <span className="opacity-80">
                  {data.edges[index].relationType}
                </span>
                <span className="w-24 truncate text-xs cursor-not-allowed">
                  {media.node.name.full}
                </span>
              </div>
              <div className="flex opacity-60 w-28 truncate">
                <span>{media.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
