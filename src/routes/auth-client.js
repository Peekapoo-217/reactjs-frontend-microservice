// src/routes/auth-client.js
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const login = async (email, password) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });

    if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
    }
    return response.data;
};

export const register = async (email, password) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, { email, password });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};
