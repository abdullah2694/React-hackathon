import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import branchReducer from './branchSlice';
import orderReducer from './orderSlice';
import reviewReducer from './reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    branches: branchReducer,
    orders: orderReducer,
    reviews: reviewReducer,
  },
});