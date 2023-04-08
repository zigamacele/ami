import { useRouter } from 'next/router';
import { useState } from 'react';
import { dotStatus } from '../Home/Trending';
import HoverMenu from './HoverMenu';
import MediaPopup from './MediaPopup/MediaPopup';

export default function IndividualMedia({
  media,
  setHoverBackground,
  refresh,
}: {
  media: any;
  setHoverBackground: Function;
  refresh: Function;
}) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onMouseEnter={(e) => {
        setPositionX(e.clientX);
        setIsHovering(true);
        setHoverBackground(media.bannerImage);
      }}
      onMouseLeave={() => {
        setPositionX(0);
        setIsHovering(false);
        setHoverBackground('');
      }}
      className="flex flex-col gap-1 relative fade-in-fast hover:text-white"
    >
      {isHovering && (
        <MediaPopup
          positionX={positionX}
          setIsHovering={setIsHovering}
          media={media}
        />
      )}
      {isHovering && (
        <HoverMenu
          media={media}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          refresh={refresh}
        />
      )}
      <img
        onClick={() => router.push(`/id/${media.id}`)}
        src={media.coverImage.large}
        className="h-52 w-36 object-cover rounded cursor-pointer"
        alt={media.id}
      />
      <div className="flex items-center gap-1.5">
        <div className="">
          {media.mediaListEntry && dotStatus(media.mediaListEntry.status)}
        </div>
        <span
          onClick={() => router.push(`/id/${media.id}`)}
          className="w-32 truncate opacity-60 text-sm cursor-pointer"
        >
          {media.title.romaji}
        </span>
      </div>
    </div>
  );
}
