import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  AUTH_CANCELLED_POPUP_REQUEST,
  AUTH_POPUP_CLOSED_BY_USER,
  AUTH_POPUP_BLOCKED,
} from "../constants/authErrors";

import {
  DUPLICATE_REQUEST,
  POPUP_BLOCKED,
  POPUP_CLOSED,
  UNEXPECTED_ERROR,
  FAILED_LOGOUT,
  TOKEN_EXPIRED,
} from "../constants/messages";

const login = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    const { code } = error;

    if (code === AUTH_CANCELLED_POPUP_REQUEST) {
      throw new Error(DUPLICATE_REQUEST);
    }

    if (code === AUTH_POPUP_BLOCKED) {
      throw new Error(POPUP_BLOCKED);
    }

    if (code === AUTH_POPUP_CLOSED_BY_USER) {
      throw new Error(POPUP_CLOSED);
    }

    throw new Error(UNEXPECTED_ERROR);
  }
};

const logout = async () => {
  try {
    await firebase
      .auth()
      .signOut();

  } catch (error) {
    throw new Error(FAILED_LOGOUT);
  }
};

const getToken = async () => {
  const token = await firebase
    .auth()
    .currentUser
    .getIdToken(true);

  if (!token) {
    throw new Error(TOKEN_EXPIRED);
  }

  return token;
};

const firebaseAPI = {
  login,
  logout,
  getToken,
};

export default firebaseAPI;
