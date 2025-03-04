import { Dispatch } from "redux";
import api from "../lib/axiosInterceptors";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
} from "./types";

export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      data: { data: products },
    } = await api.get("/products"); // Adjust API endpoint as needed

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: products,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

interface Product {
  productId: string;
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  numReviews: number;
  description: string;
}

export const getProductById =
  (productId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await api.get(`/products/${productId}`);
      const product: Product = data as Product;
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
