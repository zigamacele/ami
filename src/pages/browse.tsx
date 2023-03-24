import SearchComponent from '@/lib/components/Browse/SearchComponent';
import ComboBox from '@/lib/components/List/ComboBox';
import {
  genre,
  orderBy,
  rating,
  type,
} from '@/lib/components/List/SearchParameters';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Browse() {
  const [selectedGenre, setSeletedGenre] = useState('');
  const [selectedType, setSeletedType] = useState('');
  const [selectedRating, setSeletedRating] = useState('');
  const [selectedOrder, setSeletedOrder] = useState('');
  const [userInput, setUserInput] = useState('');

  return (
    <section className="flex items-center justify-center gap-16 z-50">
      <div className="flex  items-center justify-center gap-6">
        <div className="flex flex-col gap-1">
          <p className="font-medium">Search</p>
          <SearchComponent userInput={userInput} setUserInput={setUserInput} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Genre</p>
          <ComboBox people={genre} setSelectedOption={setSeletedGenre} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Format</p>
          <ComboBox people={type} setSelectedOption={setSeletedType} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Rating</p>
          <ComboBox people={rating} setSelectedOption={setSeletedRating} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Order</p>
          <ComboBox people={orderBy} setSelectedOption={setSeletedOrder} />
        </div>
      </div>
      <AdjustmentsHorizontalIcon className="h-9 self-end w-9 rounded bg-zinc-700 text-zinc-400 p-2 cursor-not-allowed hover:text-amber-600" />
    </section>
  );
}
