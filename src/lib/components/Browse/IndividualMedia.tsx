import { useRouter } from 'next/router';
import { useState } from 'react';
import HoverMenu from './HoverMenu';

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
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
        setHoverBackground(media.bannerImage);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverBackground('');
      }}
      className="flex flex-col gap-1 relative fade-in-fast hover:text-white"
    >
      {isHovering ? (
        <HoverMenu
          media={media}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          refresh={refresh}
        />
      ) : null}
      <img
        onClick={() => router.push(`/id/${media.id}`)}
        src={media.coverImage.large}
        className="h-52 w-36 object-cover rounded cursor-pointer"
        alt={media.id}
      />
      <div className="flex">
        <div className="flex items-center gap-1">
          {media.status === 'RELEASING' ? (
            <div className="bg-blue-500 h-2 w-2 rounded-full mr-1"></div>
          ) : null}
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
