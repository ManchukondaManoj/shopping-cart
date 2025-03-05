import { Dispatch } from "redux";
import { auth } from "../lib/firebase";
import api from "../lib/axiosInterceptors";
import {
  SIGNUP_REQUEST,
  USER_INITIAL_DATA,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./types";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { cartAddItem } from "./cartActions";
export const signup =
  ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("previousRoute", "signup");
      await sendEmailVerification(userCredential.user);
      return Promise.resolve({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
    } catch (error: any) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };

// Login Action
export const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const URL = "/auth/login";
      const idToken = await userCredential.user.getIdToken();
      const config = {
        method: "post",
        data: {
          userId: userCredential.user.uid,
          email,
        },
      };

      const {
        data: { user: userDetails },
      } = await api(URL, config);
      localStorage.setItem("auth_token", idToken);

      const localCart = localStorage.getItem("cartItems");
      if (localCart && localCart.length) {
        const cartConfig = {
          method: "post",
          data: {
            cart: JSON.parse(localCart),
          },
        };
        await api("/cart", cartConfig);
      } else {
        const {
          data: { cart },
        } = await api.get("/cart");
        if (cart.length) {
          localStorage.setItem("cartItems", JSON.stringify(cart));
        }
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          userDetails,
        },
      });
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

// Logout Action
export const logout = () => async (dispatch: Dispatch) => {
  await signOut(auth);
  localStorage.removeItem("auth_token");
  localStorage.removeItem("userInfo");
  dispatch({ type: LOGOUT });
};

export const setUserInfo = () => (dispatch: Dispatch) => {
  dispatch({ type: USER_INITIAL_DATA });
};

export const updateUserPassword = (password: string) => async () => {
  const userData = auth.currentUser;
  await updatePassword(userData, password);
};

export const updateUserProfile = (displayName: string) => async (dispatch) => {
  try {
    const userData = auth.currentUser;
    await updateProfile(userData, { displayName });
    dispatch({
      type: "UPDATE_USER_DISPLAY_NAME",
      payload: displayName,
    });
  } catch (error) {
    throw error;
  }
};
export const handleAuthChange = () => {
  try {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("auth_token", token);
      }
      const signedUpRoute = localStorage.getItem("previousRoute");
      if (!signedUpRoute) {
        localStorage.setItem("userInfo", JSON.stringify(user?.providerData[0]));
      }
    });
    return Promise.resolve();
  } catch (error: any) {
    console.log(error);
  }
};
