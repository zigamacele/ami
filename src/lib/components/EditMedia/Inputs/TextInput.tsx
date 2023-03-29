import React from 'react';

export default function TextInput({
  media,
  title,
}: {
  media: any;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="opacity-60">{title}</span>
      <input
        type="text"
        placeholder="0"
        className="input input-bordered bg-neutral-900 w-44 rounded"
      />
    </div>
  );
}
