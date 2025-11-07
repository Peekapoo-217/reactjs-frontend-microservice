import axios from "../utils/axios";

export const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });

    if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
    }
    return response.data;
};

export const register = async (email, password) => {
    const response = await axios.post('/auth/register', { email, password });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};
