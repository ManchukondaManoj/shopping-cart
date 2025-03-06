import api from "@/lib/axiosInterceptors";
import {
  CHECKOUT_ORDER_FAIL,
  CHECKOUT_ORDER_REQUEST,
  CHECKOUT_ORDER_SUCCESS,
  CHECKOUT_ORDER_INITIAL_STATE,
} from "./types";
import { clearCart } from "./cartActions";
import { Dispatch } from "@reduxjs/toolkit";

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export const checkout =
  (shippingAddress: ShippingAddress, paymentMethod: string) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({ type: CHECKOUT_ORDER_REQUEST });
      const { cartItems } = getState().cart;
      const totalPrice = cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2);

      const orderData = {
        shippingAddress,
        paymentMethod,
        items: cartItems,
        totalPrice,
      };

      const config = {
        method: "post",
        data: { orderData },
      };
      const { data } = await api("/checkout", config);

      dispatch({ type: CHECKOUT_ORDER_SUCCESS, payload: data });
      dispatch(clearCart());
    } catch (error) {
      const err = error?.response?.data?.message || error.message;
      dispatch({
        type: CHECKOUT_ORDER_FAIL,
        payload: err || "Unknown error",
      });
    }
  };

export const setCheckoutInitialState = () => (dispatch: Dispatch) => {
  dispatch({
    type: CHECKOUT_ORDER_INITIAL_STATE,
  });
};
