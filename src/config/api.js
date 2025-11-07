export const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL || "http://localhost:4000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_GATEWAY_URL}/auth/login`,
    REGISTER: `${API_GATEWAY_URL}/auth/register`,
    VALIDATE: `${API_GATEWAY_URL}/auth/validate`,
  },

  BOOKS: {
    DISPLAY: `${API_GATEWAY_URL}/book/display`,
    GET_BY_ID: `${API_GATEWAY_URL}/book/id`,
    CREATE: `${API_GATEWAY_URL}/book/create`,
    UPDATE: (id) => `${API_GATEWAY_URL}/book/${id}/update`,
    DELETE: (id) => `${API_GATEWAY_URL}/book/${id}/delete`,
    DECREASE_COPIES: (id) => `${API_GATEWAY_URL}/book/${id}/decrease-copies`,
    INCREASE_COPIES: (id) => `${API_GATEWAY_URL}/book/${id}/increase-copies`,
  },

  BORROW: {
    CREATE: `${API_GATEWAY_URL}/borrow/create`,
  },
};

