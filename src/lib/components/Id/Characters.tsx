import { useRouter } from 'next/router';
import React from 'react';

export default function Characters({ data }: { data: any }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium opacity-80">Characters</span>
      <div className="flex text-[10px] flex-wrap w-[56em] gap-4 h-20">
        {data.edges.slice(0, 6).map((media, index) => (
          <div
            key={data.nodes[index].name.full}
            className="flex bg-neutral-900 rounded justify-between min-w-[25.5em]"
          >
            <div className="flex">
              <img
                src={media.node.image.large}
                className="h-20 object-cover rounded-l cursor-not-allowed"
              />
              <div className="flex flex-col justify-between p-2">
                <div className="flex flex-col gap-1">
                  <span className="opacity-80 text-xs w-10 cursor-not-allowed">
                    {data.nodes[index].name.full}
                  </span>
                </div>
                <div className="flex opacity-60 w-12">
                  <span>{media.role}</span>
                </div>
              </div>
            </div>
            {media.voiceActors[0] ? (
              <div className="flex gap-2">
                <div className="flex flex-col justify-between items-end py-2">
                  <div className="flex flex-col gap-1">
                    <span className="opacity-80 text-xs w-14 text-right cursor-not-allowed">
                      {media.voiceActors[0].name.full}
                    </span>
                  </div>
                  <div className="flex opacity-60 align-right">
                    <span>{media.voiceActors[0].languageV2}</span>
                  </div>
                </div>
                <img
                  src={media.voiceActors[0].image.large}
                  className="h-20 object-cover rounded-r cursor-not-allowed"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
