import api from "@/lib/axiosInterceptors";
import {
  CHECKOUT_ORDER_FAIL,
  CHECKOUT_ORDER_REQUEST,
  CHECKOUT_ORDER_SUCCESS,
} from "./types";

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface CheckoutResponse {
  message: string;
  data?: {
    shippingAddress: ShippingAddress;
    paymentMethod: string;
  };
}

export const checkout =
  (shippingAddress: ShippingAddress, paymentMethod: string) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      console.log("=========checkout in action");
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
    } catch (error) {
      console.log("======err", error);
      dispatch({
        type: CHECKOUT_ORDER_FAIL,
        payload: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
