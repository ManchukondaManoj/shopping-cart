"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { productListReducer, productDetailsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
