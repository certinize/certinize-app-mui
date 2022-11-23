import store from "../app/store";

// eslint-disable-next-line no-undef
export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;

const getApiKey = async () => {
  var apiKey;

  try {
    apiKey = store.getState().user.user.api_key;
  } catch (error) {
    console.warn(error.message);
    return "";
  }

  return apiKey;
};

const post = async (endpoint, requestBody) => {
  const apiKey = await getApiKey();

  try {
    const response = await fetch(`${GATEWAY_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(requestBody),
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

const get = async (endpoint) => {
  const apiKey = await getApiKey();

  try {
    const response = await fetch(`${GATEWAY_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

const getPath = async (path, param) => {
  const apiKey = await getApiKey();

  try {
    const response = await fetch(`${GATEWAY_URL}/${path}/${param}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

const patch = async (requestBody, endpoint) => {
  const apiKey = await getApiKey();

  try {
    const response = await fetch(`${GATEWAY_URL}/${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(requestBody),
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

export { post, get, getPath, patch };
