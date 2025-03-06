"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { productListReducer, productDetailsReducer } from "./productReducers";
import { cartReducer } from "./cartReducers";
import { checkoutReducer } from "./checkoutReducer";

const appReducer = combineReducers({
  auth: authReducer,
  products: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  checkoutReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined; // 🔹 Reset entire state
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
