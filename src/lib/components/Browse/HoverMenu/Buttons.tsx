import { addToList } from '@/lib/graphql/query/mutations/addToList';
import { addedToList } from '@/lib/helpers/anilistResponse';
import {
  BookOpenIcon,
  CalendarIcon,
  CheckIcon,
  PlayIcon,
} from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import ToolTip from '../../Navbar/Tooltip';

export default function Buttons({ media }: { media: any }) {
  const [result, update] = useMutation(addToList);

  const submit = (status: string) => {
    const variables = { mediaId: media.id, status: status };
    const loading = toast.loading('Please wait...');
    update(variables).then((result) =>
      toast.update(loading, {
        render: `${
          result.data.SaveMediaListEntry.media.title.userPreferred
        } added to ${addedToList(
          result.data.SaveMediaListEntry.media.type,
          result.data.SaveMediaListEntry.status
        )}`,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-1 items-center">
        {media.status === 'RELEASING' || media.status === 'FINISHED' ? (
          <div className="flex flex-col gap-0.5 items-center">
            {media.type === 'ANIME' ? (
              <ToolTip title="Set to Watching" position="left-start">
                <PlayIcon
                  onClick={() => submit('CURRENT')}
                  className="w-6 h-6 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110"
                />
              </ToolTip>
            ) : (
              <ToolTip title="Set to Reading" position="left-start">
                <BookOpenIcon
                  onClick={() => submit('CURRENT')}
                  className="w-6 h-6 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110"
                />
              </ToolTip>
            )}
          </div>
        ) : null}
        {media.status === 'FINISHED' ? (
          <div
            onClick={() => submit('COMPLETED')}
            className="flex flex-col gap-0.5 items-center"
          >
            <ToolTip title="Set to Completed" position="left-start">
              <CheckIcon className="w-6 h-6 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110" />
            </ToolTip>
          </div>
        ) : null}

        <div
          onClick={() => submit('PLANNING')}
          className="flex flex-col gap-0.5 items-center"
        >
          <ToolTip title="Set to Planning" position="left-start">
            <CalendarIcon className="w-6 h-6 bg-neutral-900 rounded-full p-1.5 fade-in-fast hover:scale-110" />
          </ToolTip>
        </div>
      </div>
    </div>
  );
}
