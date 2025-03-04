import axios from "axios";
import { Dispatch } from "redux";

import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_INITIAL_STATE } from "./types";
import api from "@/lib/axiosInterceptors";
// import type { RootState } from "../store";

// Define a product interface matching the API response
interface Product {
  productId: string;
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
}

// Define the cart item interface
export interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

// Action creator for adding an item to the cart
export const cartAddItem = (data: CartItem) => ({
  type: CART_ADD_ITEM,
  payload: data,
});

// Action creator for removing an item from the cart
export const removeItemFromCart = (data: string) => ({
  type: CART_REMOVE_ITEM,
  payload: data,
});

export const updateInitialState = () => ({
  type: CART_INITIAL_STATE,
});

// Thunk action to add an item to the cart
export const addToCart =
  (id: string, qty: number) => async (dispatch: Dispatch, getState: any) => {
    try {
      const { data } = await api.get<Product>(`/products/${id}`);
      const item: CartItem = {
        product: data.productId,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      };
      dispatch(cartAddItem(item));

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (err) {
      console.log("======Err", err);
    }
  };

// Thunk action to remove an item from the cart
export const removeFromCart =
  (productId: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch(removeItemFromCart(productId));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const updateCartInitialState = () => async (dispatch: Dispatch) => {
  dispatch(updateInitialState());
};
