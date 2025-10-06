import axios from "axios";

const API_URL = "http://localhost:3002/books";

export const getBooks = async () => {
    const response = await axios.get(`${API_URL}/display`);
    return response.data;
};
