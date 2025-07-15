import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/productsSlice';
import sessionsReducer from '../slices/sessionsSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    sessions: sessionsReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
