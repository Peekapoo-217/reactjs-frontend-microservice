export const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL || "http://localhost:4000";

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_GATEWAY_URL}/auth/login`,
    REGISTER: `${API_GATEWAY_URL}/auth/register`,
    VALIDATE: `${API_GATEWAY_URL}/auth/validate`,
  },

  // Books endpoints
  BOOKS: {
    DISPLAY: `${API_GATEWAY_URL}/books/display`,
    GET_BY_ID: `${API_GATEWAY_URL}/books/books/id`,
    CREATE: `${API_GATEWAY_URL}/books/create`,
    UPDATE: (id) => `${API_GATEWAY_URL}/books/${id}/update`,
    DELETE: (id) => `${API_GATEWAY_URL}/books/${id}/delete`,
    DECREASE_COPIES: (id) => `${API_GATEWAY_URL}/books/${id}/decrease-copies`,
    INCREASE_COPIES: (id) => `${API_GATEWAY_URL}/books/${id}/increase-copies`,
  },

  // Borrows endpoints
  BORROWS: {
    CREATE: `${API_GATEWAY_URL}/borrows/create`,
  },

  // HEALTH: `${API_GATEWAY_URL}/health`,
};

