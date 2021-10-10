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

export const createProject = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/projects/new`;

  const options = {
    method: POST,
    headers: {
      "Content-Type": "application/json",
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

export const getProject = async (id) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/projects/${id}`;

  const options = {
    method: GET,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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

export const getProjectList = async () => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/projects`;

  const options = {
    method: GET,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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

export const deleteProject = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/projects`;

  const options = {
    method: DELETE,
    headers: {
      "Content-Type": "application/json",
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

export const createCharacter = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/characters/new`;

  const options = {
    method: POST,
    headers: {
      "Content-Type": "application/json",
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

export const modifyCharacter = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/characters`;

  const options = {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(resource),
  };

  try {
    const response = await fetchData(requestUrl, options);
    const { status } = response;

    if (response.status === 400) {
      throw createError(status, "message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const createPlot = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/plots/new`;

  const options = {
    method: POST,
    headers: {
      "Content-Type": "application/json",
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

export const updatePlotOrder = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/plots/order`;

  const options = {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(resource),
  };

  try {
    const response = await fetchData(requestUrl, options);
    const { status } = response;

    if (response.status === 400) {
      throw createError(status, "message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const createDialogue = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/plots/dialogue/new`;

  const options = {
    method: POST,
    headers: {
      "Content-Type": "application/json",
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

export const updateSituation = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/plots/situation`;

  const options = {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(resource),
  };

  try {
    const response = await fetchData(requestUrl, options);
    const { status } = response;

    if (response.status === 400) {
      throw createError(status, "message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const updateLocation = async (resource) => {
  const requestUrl = `${process.env.REACT_APP_SERVER_URL}/plots/location`;

  const options = {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(resource),
  };

  try {
    const response = await fetchData(requestUrl, options);
    const { status } = response;

    if (response.status === 400) {
      throw createError(status, "message");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
