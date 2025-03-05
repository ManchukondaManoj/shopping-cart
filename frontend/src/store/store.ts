"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { productListReducer, productDetailsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import { checkoutReducer } from "./checkoutReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    checkoutReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
