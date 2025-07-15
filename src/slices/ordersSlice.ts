import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: number;
  productIds: number[];
  date: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    // можна додати інші редюсери
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
