import { ThemeProvider } from '@emotion/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import { addToList } from '../graphql/query/mutations/addToList';
import { addedToList } from '../helpers/anilistResponse';
import { dropdownTheme } from '../theme/MUI';

export default function StatusDropdown({ media }: { media: any }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [result, update] = useMutation(addToList);

  const submit = (status: string) => {
    const variables = { mediaId: media.id, status: status };
    update(variables).then((result) =>
      toast.success(
        `${
          result.data.SaveMediaListEntry.media.title.romaji
        } added to ${addedToList(
          result.data.SaveMediaListEntry.media.type,
          result.data.SaveMediaListEntry.status
        )}`
      )
    );
  };

  return (
    <ThemeProvider theme={dropdownTheme}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ChevronDownIcon className="h-4 w-4 text-neutral-200 bg-black/80 backdrop-blur-md rounded" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            submit('PLANNING');
          }}
          sx={{
            ':hover': {
              bgcolor: '#262626',
              color: 'white',
            },
          }}
        >
          Add to Planning
        </MenuItem>

        {media.status === 'RELEASING' || media.status === 'FINISHED' ? (
          <MenuItem
            onClick={() => {
              handleClose();
              submit('CURRENT');
            }}
            sx={{
              ':hover': {
                bgcolor: '#262626',
                color: 'white',
              },
            }}
          >
            Add to Watching
          </MenuItem>
        ) : null}
        {media.status === 'FINISHED' ? (
          <MenuItem
            onClick={() => {
              handleClose();
              submit('COMPLETED');
            }}
            sx={{
              ':hover': {
                bgcolor: '#262626',
                color: 'white',
              },
            }}
          >
            Add to Completed
          </MenuItem>
        ) : null}
        <hr className="opacity-10" />
        <MenuItem
          onClick={handleClose}
          sx={{
            ':hover': {
              bgcolor: '#262626',
              color: 'white',
            },
          }}
        >
          Open List Editor
        </MenuItem>
      </Menu>
    </ThemeProvider>
  );
}
