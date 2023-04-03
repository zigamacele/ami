import { Markup } from 'interweave';
import { useEffect, useRef, useState } from 'react';

export default function Description({ desc }: { desc: string }) {
  const [readMore, setReadMore] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const maxHeight = 96;

  useEffect(() => {
    if (ref.current && ref.current.clientHeight > maxHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [desc, maxHeight]);

  return (
    <div>
      <div className="w-[40em] text-xs break-words text-ellipsis overflow-hidden h-24 relative">
        <div>
          {isOverflowing && isHovering && (
            <div
              onMouseEnter={() => {
                setHovering(true);
              }}
              onMouseLeave={() => {
                setHovering(false);
              }}
              className="absolute bottom-0 flex justify-center items-center w-[40em] h-10 z-10 bg-gradient-to-t from-[#1c1c1c]"
            >
              <span className="text-xs opacity-80 hover:opacity-100 cursor-pointer">
                Read More
              </span>
            </div>
          )}

          <div
            ref={ref}
            onMouseEnter={() => {
              setHovering(true);
            }}
            onMouseLeave={() => {
              setHovering(false);
            }}
            className="opacity-60 hover:opacity-70"
          >
            <Markup content={desc} />
          </div>
        </div>
      </div>
    </div>
  );
}
