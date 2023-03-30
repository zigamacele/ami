import { useRouter } from 'next/router';
import { useState } from 'react';
import HoverMenu from './HoverMenu';

export default function IndividualMedia({
  media,
  setHoverBackground,
}: {
  media: any;
  setHoverBackground: Function;
}) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onClick={() => router.push(`/${media.id}`)}
      onMouseEnter={() => {
        setIsHovering(true);
        setHoverBackground(media.bannerImage);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setHoverBackground('');
      }}
      className="flex flex-col gap-1 cursor-pointer relative"
    >
      {isHovering ? (
        <HoverMenu
          media={media}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
        />
      ) : null}
      <img
        src={media.coverImage.large}
        className="h-52 w-36 object-cover rounded"
      />
      <div className="flex">
        <div className="flex items-center gap-1">
          {media.status === 'RELEASING' ? (
            <div className="bg-blue-500 h-2 w-2 rounded-full mr-1"></div>
          ) : null}
        </div>
        <span className="w-32 truncate opacity-70 text-sm">
          {media.title.romaji}
        </span>
      </div>
    </div>
  );
}
