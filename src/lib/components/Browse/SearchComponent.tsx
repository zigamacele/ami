import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchComponent({
  userInput,
  setUserInput,
}: {
  userInput: any;
  setUserInput: any;
}) {
  return (
    <div className="flex flex-col text-zinc-400 shadow-md">
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-4  h-9 rounded px-4  bg-neutral-700"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <input
          value={userInput}
          placeholder="Search AniList"
          className="bg-transparent text-zinc-400 w-[40em] outline-none text-sm"
          onChange={(e) => setUserInput(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
