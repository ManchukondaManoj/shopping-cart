import { Dispatch } from "redux";
import { auth } from "../lib/firebase";
import api from "../lib/axiosInterceptors";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";
// Signup Action
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
      console.log("========name", name);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
  dispatch({ type: LOGOUT });
};

export const handleAuthChange = () => async () => {
  try {
    let userDetails;
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        userDetails = user;
        const token = await user.getIdToken();
        localStorage.setItem("auth_token", token);
      }
    });
    return Promise.resolve(userDetails);
  } catch (error: any) {
    console.log("=====err", error);
  }
};
