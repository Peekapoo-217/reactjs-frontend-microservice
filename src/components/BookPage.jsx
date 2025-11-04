import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import "./BookPage.css";

export default function BooksPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.BOOKS.DISPLAY);
            setBooks(res.data);
        } catch (error) {
            console.error("Không thể tải danh sách sách:", error);
        }
    };

    const handleBorrow = async (bookId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập trước!");
            return;
        }

        try {
            await axios.post(
                API_ENDPOINTS.BORROWS.CREATE,
                { bookId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Mượn thành công!");
        } catch (error) {
            console.error("Borrow failed:", error.response?.data);
            alert("Không thể đặt sách!");
        }
    };

    return (
        <div className="books-container">
            <h2>Danh sách sách</h2>
            <div className="book-grid">
                {books.map((book) => (
                    <div className="book-card" key={book.id}>
                        <h3>{book.title}</h3>
                        <p>Tác giả: {book.author || "Chưa có"}</p>
                        <button onClick={() => handleBorrow(book.id)}>
                            Mượn sách
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
