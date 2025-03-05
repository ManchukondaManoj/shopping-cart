import { Dispatch } from "redux";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

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

export const signup =
  ({ email, password }: { name: string; email: string; password: string }) =>
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

const postLoginActions = async (userCredential: any, email: string) => {
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
  return userDetails;
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
      const userDetails = await postLoginActions(userCredential, email);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...userDetails,
        },
      });
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

export const signInWithPopupProvider =
  (provider: string) => async (dispatch) => {
    try {
      const providerFn = {
        google: googleProvider,
      };
      const authProvider = providerFn[provider];
      const userCredential = await signInWithPopup(auth, authProvider);
      console.log("userCredential", userCredential);
      const email = userCredential.user.email || "";
      const userDetails = await postLoginActions(userCredential, email);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...userDetails,
        },
      });
    } catch (error) {
      console.log("google:signin:error", error);
    }
  };

// Logout Action
export const logout = () => async (dispatch: Dispatch) => {
  try {
    await signOut(auth);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("previousRoute");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log("logout:error", error);
  }
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
    const updatedUserProfile = await updateProfile(userData, { displayName });
    dispatch({
      type: "UPDATE_USER_DISPLAY_NAME",
      payload: displayName,
    });
  } catch (error) {
    throw error;
  }
};
export const handleAuthChange = async () => {
  try {
    auth.onAuthStateChanged(async (user) => {
      console.log("========user", user);
      let userData = {};
      if (user) {
        const token = await user.getIdToken();
        localStorage.setItem("auth_token", token);
        const { data } = await api.get("/auth/getUser");
        userData = data.user;
      }
      const signedUpRoute = localStorage.getItem("previousRoute") === "signup";
      const userToUpdate = {
        ...userData,
        ...user?.providerData[0],
      };
      if (!signedUpRoute) {
        localStorage.setItem("userInfo", JSON.stringify(userToUpdate));
      }
    });
    return Promise.resolve();
  } catch (error: any) {
    console.log(error);
  }
};
