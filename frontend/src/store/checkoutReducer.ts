// reducers/checkoutReducer.ts
import {
  CHECKOUT_ORDER_FAIL,
  CHECKOUT_ORDER_REQUEST,
  CHECKOUT_ORDER_SUCCESS,
  CHECKOUT_ORDER_INITIAL_STATE,
} from "./types";

interface OrderSuccessAction {
  type: typeof CHECKOUT_ORDER_SUCCESS;
  payload: string;
}

interface OrderFailState {
  type: typeof CHECKOUT_ORDER_FAIL;
  payload: string;
}

interface OrderRequestAction {
  type: typeof CHECKOUT_ORDER_REQUEST;
}

interface CheckoutOrderInitialState {
  type: typeof CHECKOUT_ORDER_INITIAL_STATE;
}

type CheckoutAction =
  | OrderSuccessAction
  | OrderRequestAction
  | OrderFailState
  | CheckoutOrderInitialState;

export interface CheckoutState {
  fetching: boolean;
  error: string;
  isOrderPlaced: boolean;
}

const initialState: CheckoutState = {
  fetching: false,
  error: "",
  isOrderPlaced: false,
};

export const checkoutReducer = (
  state: CheckoutState = initialState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case CHECKOUT_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CHECKOUT_ORDER_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case CHECKOUT_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderPlaced: true,
      };
    }

    case CHECKOUT_ORDER_INITIAL_STATE: {
      return {
        fetching: false,
        error: "",
        isOrderPlaced: false,
      };
    }

    default:
      return state;
  }
};
