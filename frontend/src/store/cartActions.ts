import { Dispatch } from "redux";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INITIAL_STATE,
  CLEAR_CART,
} from "./types";
import api from "@/lib/axiosInterceptors";
interface Product {
  productId: string;
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
}

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

export const removeAllItemsFromCart = () => ({
  type: CLEAR_CART,
});

export const updateInitialState = (data = null) => ({
  type: CART_INITIAL_STATE,
  payload: data,
});

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
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const cartItems = getState().cart.cartItems;
        const cartConfig = {
          method: "post",
          data: {
            cart: cartItems,
          },
        };
        await api("/cart", cartConfig);
      }
    } catch (err) {
      console.log(err);
    }
  };

export const removeFromCart =
  (productId: string) => async (dispatch: Dispatch, getState: any) => {
    dispatch(removeItemFromCart(productId));
    try {
      const cartItems = getState().cart.cartItems.map(
        ({ coutInStock, ...rest }) => rest
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      const cartConfig = {
        method: "post",
        data: {
          cart: cartItems,
        },
      };
      await api("/cart", cartConfig);
    } catch (error) {
      console.log(error);
    }
  };

export const updateCartInitialState = () => async (dispatch: Dispatch) => {
  try {
    let cartData = null;

    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      const { data } = await api.get("/cart");
      const { cart = [] } = data;
      if (cart.length) {
        cartData = cart;
      }
    }

    dispatch(updateInitialState(cartData));
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch(removeAllItemsFromCart());
  dispatch(updateInitialState());
};
