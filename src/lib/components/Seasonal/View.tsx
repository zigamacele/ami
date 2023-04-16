import { FaceSmileIcon, StarIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';
import EditMedia from '../EditMedia';
import Description from '../Id/Description';
import StatusDropdown from '../StatusDropdown';

export default function View({
  data,
  refresh,
}: {
  data: any;
  refresh: Function;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMedia, setPopupMedia] = useState({});
  const router = useRouter();
  return (
    <div className="bg-[#1c1c1c] w-full fade-in-fast">
      <div className="flex flex-col gap-2 p-2">
        <section className="relative">
          <div className="absolute left-[-15px] z-10">
            <StatusDropdown
              media={data}
              setMedia={setPopupMedia}
              setShowPopup={setShowPopup}
            />
          </div>
          <img
            src={data.bannerImage ?? data.coverImage.large}
            alt={data.title.userPreferred}
            className="w-full rounded h-24 object-cover"
          />
          {showPopup && (
            <EditMedia
              popupMedia={data}
              setShowPopup={setShowPopup}
              refresh={refresh}
            />
          )}

          <div className="absolute opacity-30 w-full h-24 bg-gradient-to-t from-neutral-900 top-0"></div>
        </section>
        <section className="flex justify-between text-xs relative">
          <div
            onClick={() => router.push(`/id/${data.id}`)}
            className="flex flex-col gap-0.5 cursor-pointer hover:text-neutral-100"
          >
            <div className="opacity-80 text-sm w-72">
              {data.title.userPreferred}
            </div>
            <div className="opacity-60">{data.title.native}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex h-4 gap-1 text-[10px]">
              {data.genres.slice(0, 3).map((genre) => (
                <span
                  key={`${data.title.userPreferred}_${genre}`}
                  style={{ backgroundColor: data.coverImage.color }}
                  className="text-neutral-900 font-semibold px-1.5 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="flex  gap-2.5 justify-end">
              {data.rankings[data.rankings.length > 0] && (
                <div>
                  <div className="flex gap-2 items-center">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold">
                      #{data.rankings[data.rankings.length - 1].rank}
                    </span>
                  </div>
                  <span className="opacity-60">
                    {data.rankings[data.rankings.length - 1].context}
                  </span>
                </div>
              )}
              {data.averageScore && (
                <div>
                  <div className="flex gap-2 items-center">
                    <FaceSmileIcon className="h-5 w-5 text-lime-500" />
                    <span className="font-bold">{data.averageScore}%</span>
                  </div>
                  <span className="opacity-60">{data.popularity} users</span>
                </div>
              )}
            </div>
          </div>
        </section>
        {data.description && (
          <span className="mt-2 flex flex-col gap-1.5">
            <div className="opacity-80 text-xs font-medium">Description</div>
            <Description desc={data.description} />
          </span>
        )}
        {data.trailer && (
          <div className="flex flex-col gap-2 text-xs font-medium mt-4">
            <div className="opacity-80">Trailer</div>
            <iframe
              width="470"
              height="265"
              src={`https://www.youtube.com/embed/${data.trailer.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              className="fade-in-fast rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
