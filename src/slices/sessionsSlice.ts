import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  sessionCount: number;
  isConnected: boolean;
}

const initialState: SessionState = {
  sessionCount: 0,
  isConnected: false,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSessionCount: (state, action: PayloadAction<number>) => {
      state.sessionCount = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setSessionCount, setConnected } = sessionsSlice.actions;
export default sessionsSlice.reducer;
