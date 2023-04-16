import { humanFormat, scoreFormat } from '@/lib/helpers/anilistResponse';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function IndividualTitle({
  media,
  type,
  setHoverBackground,
  setShowPopup,
  setPopupMedia,
}: {
  media: any;
  type: string;
  setHoverBackground: Function;
  setShowPopup: Function;
  setPopupMedia: Function;
}) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const viewerScoreFormat =
    typeof window !== 'undefined'
      ? localStorage.getItem('viewerScoreFormat') || 'POINT_100'
      : 'POINT_100';

  const scoreFormatSmiley = (score: number) => {
    if (score === 0) return <div></div>;
    if (score === 1) return <SentimentVeryDissatisfiedIcon />;
    if (score === 2) return <SentimentSatisfiedIcon />;
    if (score === 3) return <SentimentSatisfiedAltIcon />;
  };
  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
        setHoverBackground(media.media.bannerImage);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverBackground('');
      }}
      className="flex items-center justify-between hover:bg-neutral-700 pl-4 rounded p-2 text-sm fade-in-fast relative"
    >
      {!isHovering && media.media.status === 'RELEASING' && (
        <div className="absolute left-[-1px] h-2.5 w-2.5 rounded-full bg-green-500 ">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-ping"></div>
        </div>
      )}
      <div className="flex items-center gap-2">
        {!isHovering ? (
          <img
            src={media.media.coverImage.large}
            className="w-12 rounded h-12 object-cover"
            alt={media.media.title.userPreferred}
          />
        ) : (
          <div
            onClick={() => {
              setShowPopup(true);
              setPopupMedia(media.media);
            }}
            className="w-12 h-12 rounded bg-neutral-900/30 flex justify-center items-center cursor-pointer"
          >
            <EllipsisHorizontalIcon className="h-8 w-8" />
          </div>
        )}
        <span
          onClick={() => router.push(`/id/${media.media.id}`)}
          className="truncate w-64 text-base cursor-pointer"
        >
          {media.media.title.userPreferred}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="w-10 text-center">
          {viewerScoreFormat !== 'POINT_3' ? (
            <div>{media.score === 0 ? '' : media.score}</div>
          ) : (
            scoreFormatSmiley(media.score)
          )}
        </span>
        <span className="w-20 text-center">
          {media.progress}/
          {type === 'ANIME'
            ? media.media.episodes
              ? media.media.episodes
              : '?'
            : media.media.chapters
            ? media.media.chapters
            : '?'}
        </span>
        {type !== 'MANGA' ? null : (
          <span className="w-20 text-center">{media.progressVolumes}</span>
        )}
        <span className="w-20 text-center">
          {humanFormat(media.media.format)}
        </span>
      </div>
    </div>
  );
}
