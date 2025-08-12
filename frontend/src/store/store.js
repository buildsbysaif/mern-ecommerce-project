import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; 
import authReducer from './slices/authSlice'; 

const store = configureStore({
  reducer: {
    cart: cartReducer, 
    auth: authReducer,
  },
  devTools: true,  // Enables Redux DevTools for debugging
});
export default store;

