import React from 'react';
import TextInput from './Inputs/TextInput';

export default function Inputs({ media }: { media: any }) {
  return (
    <section className="flex flex-wrap gap-3">
      <button className="btn btn-sm bg-neutral-900 border-none absolute bottom-2 right-2 text-xs px-3 rounded">
        Delete
      </button>
      <div className="flex flex-col gap-1">
        <span className="opacity-60">Status</span>
        <select className="select select-bordered text-xs bg-neutral-900 w-44 h-12 rounded">
          <option disabled selected>
            {media.status}
          </option>
          <option>Plan to watch</option>
          <option>Completed</option>
          <option>Rewatching</option>
          <option>Paused</option>
          <option>Dropped</option>
        </select>
      </div>
      <TextInput media={media} title="Score" />
      <TextInput media={media} title="Episode Progress" />
      <TextInput media={media} title="Start Date" />
      <TextInput media={media} title="Finished Date" />
      <TextInput media={media} title="Total Rewatches" />
      <div className="flex flex-col gap-1">
        <span className="opacity-60">Notes</span>
        <textarea
          className="textarea textarea-bordered bg-neutral-900 h-9 w-[39.5em] mr-8 rounded"
          placeholder=""
        ></textarea>
      </div>
    </section>
  );
}
