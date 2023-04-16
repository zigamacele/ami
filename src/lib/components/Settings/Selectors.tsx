import { editSettings } from '@/lib/graphql/query/mutations/editSettings';
import { inputsTheme } from '@/lib/theme/MUI';
import { ThemeProvider } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';

export default function Selectors() {
  const [viewerScoreFormat, setViewerScoreFormat] = useState<any>('');
  const [viewerTitleLanguage, setViewerTitleLanguage] = useState<any>('');

  const [result, update] = useMutation(editSettings);

  const submit = (input: { format: string | null; title: string | null }) => {
    const variables = {
      scoreFormat: input.format,
      titleLanguage: input.title,
    };
    const loading = toast.loading('Please wait...');
    update(variables).then((result) =>
      toast.update(loading, {
        render: `Settings updated`,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    );
    if (input.title) localStorage.setItem('viewerTitleLanguage', input.title);
    if (input.format) localStorage.setItem('viewerScoreFormat', input.format);
  };

  useEffect(() => {
    setViewerScoreFormat(localStorage.getItem('viewerScoreFormat'));
    setViewerTitleLanguage(localStorage.getItem('viewerTitleLanguage'));
  }, []);

  useEffect(() => {
    console.log(viewerScoreFormat);
  }, [viewerScoreFormat]);

  return (
    <ThemeProvider theme={inputsTheme}>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold">SCORING SYSTEM</span>
          <Select
            value={viewerScoreFormat}
            onChange={(event) => {
              setViewerScoreFormat(event.target.value);
              submit({ format: event.target.value, title: null });
            }}
            className="bg-neutral-800"
          >
            <MenuItem value={'POINT_100'}>100 Point (55/100)</MenuItem>
            <MenuItem value={'POINT_10_DECIMAL'}>
              10 Point Decimal (5.5/10)
            </MenuItem>
            <MenuItem value={'POINT_10'}>10 Point (5/10)</MenuItem>
            <MenuItem value={'POINT_5'}>5 Star (3/5)</MenuItem>
            <MenuItem value={'POINT_3'}>3 Point Smiley</MenuItem>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold">TITLE LANGUAGE</span>
          <Select
            value={viewerTitleLanguage}
            onChange={(event) => {
              setViewerTitleLanguage(event.target.value);
              submit({ format: null, title: event.target.value });
            }}
            className="bg-neutral-800"
          >
            <MenuItem value={'ROMAJI'}>Romaji (Shingeki no Kyojin)</MenuItem>
            <MenuItem value={'ENGLISH'}>English (Attack on Titan)</MenuItem>
            <MenuItem value={'NATIVE'}>Native (進撃の巨人)</MenuItem>
          </Select>
        </div>
      </div>
    </ThemeProvider>
  );
}
