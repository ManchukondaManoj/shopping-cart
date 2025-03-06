"use client";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_INITIAL_STATE,
  CLEAR_CART,
  USER_CART,
} from "./types";
import type { CartItem } from "./cartActions";
interface CartState {
  cartItems: CartItem[];
}

interface CartAddItemAction {
  type: typeof CART_ADD_ITEM;
  payload: CartItem;
}

interface CartRemoveItemAction {
  type: typeof CART_REMOVE_ITEM;
  payload: string; // assuming payload is a product id (string)
}

interface CartInitialStateAction {
  type: typeof CART_INITIAL_STATE;
  payload: CartItem[] | null;
}

interface ClearCartStateAction {
  type: typeof CLEAR_CART;
}

// Union type for cart actions
type CartAction =
  | CartAddItemAction
  | CartRemoveItemAction
  | CartInitialStateAction
  | ClearCartStateAction;

// Initial state for the cart

const initialState: CartState = {
  cartItems: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case CART_INITIAL_STATE: {
      const cartItems = localStorage.getItem("cartItems");
      const cartItemsFromStorage = cartItems ? JSON.parse(cartItems) : [];
      return {
        ...state,
        cartItems: action.payload || cartItemsFromStorage,
      };
    }

    case CLEAR_CART: {
      return {
        ...state,
        cartItems: [],
      };
    }
    default:
      return state;
  }
};
