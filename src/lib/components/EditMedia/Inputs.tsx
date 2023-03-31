import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React from 'react';
import TextInput from './Inputs/TextInput';

export default function Inputs({ media }: { media: any }) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <section className="flex flex-wrap gap-3">
      <div className="flex flex-col gap-5 mt-5 text-xs">
        <div className="flex gap-4">
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Status</span>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Score</span>
            <TextField id="outlined-basic" type="number" variant="outlined" />
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Episode Progress</span>
            <TextField id="outlined-basic" type="number" variant="outlined" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Start Date</span>
            <DatePicker />
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">End Date</span>
            <DatePicker />
          </div>
          <div className="flex flex-col w-48 gap-1">
            <span className="opacity-60">Total Rewatches</span>
            <TextField id="outlined-basic" type="number" variant="outlined" />
          </div>
        </div>
      </div>
    </section>
  );
}
