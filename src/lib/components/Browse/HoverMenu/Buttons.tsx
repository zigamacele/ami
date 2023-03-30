import { addToList } from '@/lib/graphql/query/mutations/addToList';
import { CalendarIcon, CheckIcon, PlayIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useMutation } from 'urql';

export default function Buttons({ media }: { media: any }) {
  const [result, update] = useMutation(addToList);

  const submit = (status: string) => {
    const variables = { mediaId: media.id, status: status };
    update(variables).then((result) => console.log(result));
  };

  // CURRENT
  // PLANNING
  // COMPLETED
  // DROPPED
  // PAUSED
  // REPEATING
  return (
    <div>
      <div className="flex flex-col gap-0.5">
        {media.status === 'RELEASING' || media.status === 'FINISHED' ? (
          <div className="flex flex-col gap-0.5 items-center">
            <PlayIcon
              onClick={() => submit('CURRENT')}
              className="w-6 h-6 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110"
            />
          </div>
        ) : null}
        {media.status === 'FINISHED' ? (
          <div
            onClick={() => submit('COMPLETED')}
            className="flex flex-col gap-0.5 items-center"
          >
            <CheckIcon className="w-6 h-6 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110" />
          </div>
        ) : null}
        <div
          onClick={() => submit('PLANNING')}
          className="flex flex-col gap-0.5 items-center"
        >
          <CalendarIcon className="w-6 h-6 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
