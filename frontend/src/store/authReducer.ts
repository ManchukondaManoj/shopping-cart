import {
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USER_INITIAL_DATA,
} from "./types";

interface User {
  uid: string;
  email: string | null;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUpError: string | null;
  signUpLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  signUpError: null,
  signUpLoading: false,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, signUpLoading: true };
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case SIGNUP_FAILURE: {
      return { ...state, signUpError: action.payload };
    }
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT:
      return { ...state, user: null, error: null };

    case USER_INITIAL_DATA: {
      const userData = localStorage.getItem("userInfo");
      const userInfoFromStorage =
        userData !== "undefined" ? JSON.parse(userData) : null;
      return {
        ...state,
        user: userInfoFromStorage,
      };
    }

    case "UPDATE_USER_DISPLAY_NAME": {
      const userData = localStorage.getItem("userInfo");
      const userInfoFromStorage =
        userData !== "undefined" ? JSON.parse(userData) : null;
      return {
        ...state,
        user: {
          displayName: action.payload,
          ...userInfoFromStorage,
        },
      };
    }

    default:
      return state;
  }
};

export default authReducer;
