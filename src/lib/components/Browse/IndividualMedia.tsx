import { useState } from 'react';

export default function IndividualMedia({
  media,
  setHoverBackground,
}: {
  media: any;
  setHoverBackground: Function;
}) {
  const [isHovering, setIsHovering] = useState(false);

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
      className="flex flex-col gap-1"
    >
      <img
        src={media.coverImage.large}
        className="h-52 w-36 object-cover rounded"
      />
      <div className="w-36 truncate opacity-70">{media.title.romaji}</div>
    </div>
  );
}
