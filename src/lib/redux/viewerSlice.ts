import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ViewerState {
  value: {
    id: number;
    name: string;
    bannerImage: string;
    avatar: { large: string };
  };
}

const initialState: ViewerState = {
  value: {
    id: 0,
    name: 'Unknown',
    bannerImage: 'Unknown',
    avatar: { large: 'Unknown' },
  },
};

export const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<ViewerState>) => {
      state.value = action;
    },
  },
});

export const { update } = viewerSlice.actions;

export default viewerSlice.reducer;
