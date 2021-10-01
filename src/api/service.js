import createError from "../utils/createError";

import {
  GET,
  POST,
  DELETE,
  PATCH,
} from "../constants/methods";

import {
  FAILED_LOGIN,
  FAILED_FOR_UNKNOWN_REASON,
} from "../constants/messages";

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkMember = async (idToken) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/users/check-member`;

  const options = {
    method: POST,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`,
    },
    credentials: "include",
  };

  try {
    const response = await fetchData(requestUrl, options);
    const { status } = response;

    if (status === 401) {
      throw createError(status, FAILED_LOGIN);
    }

    if (status === 403) {
      throw createError(status, FAILED_LOGIN);
    }

    if (status === 500) {
      throw createError(status, FAILED_FOR_UNKNOWN_REASON);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const registerUser = async (idToken, resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/users/register`;

  const options = {
    method: POST,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`,
    },
    credentials: "include",
    body: JSON.stringify(resource),
  };

  try {
    const response = await fetchData(requestUrl, options);

    if (response.status === 400) {
      throw createError(response.status, "message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const logout = async () => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/users/logout`;

  const options = {
    method: GET,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const response = await fetchData(requestUrl, options);

  const data = await response.json();

  return data;
};
