import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "./types";

interface Product {
  productId: string;
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  numReviews: number;
}

interface ProductState {
  fetching: boolean;
  products: Product[];
  error?: string;
}

const initialState: ProductState = {
  fetching: false,
  products: [],
  error: "",
};

export const productListReducer = (
  state = initialState,
  action: any
): ProductState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, fetching: true };

    case PRODUCT_LIST_SUCCESS:
      return { fetching: false, products: action.payload };

    case PRODUCT_LIST_FAIL:
      return { fetching: false, error: action.payload, products: [] };

    default:
      return state;
  }
};

interface ProductDetailsState {
  fetching: boolean;
  product?: Product;
  error?: string;
}

const initialStateProduct: ProductDetailsState = {
  fetching: true,
  product: undefined,
};

export const productDetailsReducer = (
  state = initialStateProduct,
  action: any
): ProductDetailsState => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, fetching: true, error: undefined };

    case PRODUCT_DETAILS_SUCCESS:
      return { fetching: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { fetching: false, error: action.payload, product: undefined };

    default:
      return state;
  }
};
