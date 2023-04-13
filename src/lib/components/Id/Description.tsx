import { Markup } from 'interweave';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Description({ desc }: { desc: string }) {
  const [readMore, setReadMore] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const maxHeight = 96;
  const { pathname } = useRouter();

  useEffect(() => {
    setReadMore(false);
    if (ref.current && ref.current.clientHeight >= maxHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [desc, maxHeight]);

  return (
    <div>
      {readMore ? (
        <div
          className={`opacity-60 hover:opacity-70 ${
            pathname.includes('id') && 'w-[40em]'
          } text-xs break-words fade-in-fast`}
        >
          <Markup content={desc} />
        </div>
      ) : (
        <div
          className={`${
            pathname.includes('id') && 'w-[40em]'
          } text-xs break-words text-ellipsis overflow-hidden h-24 relative`}
        >
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
                <span
                  onClick={() => setReadMore(true)}
                  className="text-xs opacity-80 hover:opacity-100 cursor-pointer"
                >
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
              className="opacity-60 hover:opacity-70 fade-in-fast"
            >
              <Markup content={desc} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
