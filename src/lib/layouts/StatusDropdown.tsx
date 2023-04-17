import { ThemeProvider } from '@emotion/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import { addToList } from '../graphql/query/mutations/addToList';
import { addedToList, humanType } from '../helpers/anilistResponse';
import { dropdownTheme } from '../theme/MUI';

export default function StatusDropdown({
  media,
  setMedia,
  setShowPopup,
}: {
  media: any;
  setMedia: Function;
  setShowPopup: Function;
}) {
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
    <ThemeProvider theme={dropdownTheme}>
      <Button
        disableRipple
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        {!anchorEl ? (
          <ChevronDownIcon className="h-4 w-4 text-neutral-200 bg-black/80 backdrop-blur-md rounded" />
        ) : (
          <ChevronUpIcon className="h-4 w-4 text-neutral-200 bg-black/80 backdrop-blur-md rounded" />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        TransitionComponent={Fade}
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
            Add to {humanType(media.type)}ing
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
          onClick={() => {
            handleClose();
            setMedia(media);
            setShowPopup(true);
          }}
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
