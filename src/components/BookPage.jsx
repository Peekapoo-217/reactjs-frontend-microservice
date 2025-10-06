import { useEffect, useState } from "react";
import axios from "axios";
import "./BookPage.css";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
        fetchBorrowedBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await axios.get("http://localhost:3002/books/display");
        setBooks(res.data);
    };

    const fetchBorrowedBooks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:3003/borrows/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(res.data);
    };

    const handleBorrow = async (bookId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập trước!");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3003/borrows/create",
                { bookId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Mượn thành công!");
            fetchBorrowedBooks();
        } catch (error) {
            console.error("Borrow failed:", error.response?.data);
            alert("Không thể đặt sách!");
        }
    };

    return (
        <div className="books-container">
            <h2> Danh sách sách</h2>
            <div className="book-grid">
                {books.map((book) => (
                    <div className="book-card" key={book.id}>
                        <h3>{book.title}</h3>
                        <p>Tác giả: {book.author || "Chưa có"}</p>
                        <button onClick={() => handleBorrow(book.id)}>Mượn sách</button>
                    </div>
                ))}
            </div>

            <h2>Sách đã đặt</h2>
            <table className="borrow-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sách</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowedBooks.map((b) => (
                        <tr key={b.id}>
                            <td>{b.id}</td>
                            <td>{b.book?.title || b.bookId}</td>
                            <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
