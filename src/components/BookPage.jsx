import { useEffect, useState } from "react";
import axios from "../utils/axios";
import "./BookPage.css";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        let isMounted = true;
        
        const loadBooks = async () => {
            try {
                const res = await axios.get('/book/display');
                
                if (isMounted && Array.isArray(res.data)) {
                    setBooks(res.data);
                } else if (isMounted) {
                    setBooks([]);
                }
            } catch (error) {
                if (!isMounted) {
                    return;
                }
                setBooks([]);
            }
        };
        
        loadBooks();
        
        return () => {
            isMounted = false;
        };
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('/book/display');
            
            if (Array.isArray(res.data)) {
                setBooks(res.data);
            } else {
                setBooks([]);
            }
        } catch (error) {
            setBooks([]);
        }
    };

    const openBorrowModal = (book) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập trước!");
            return;
        }
        setSelectedBook(book);
        setQuantity(1);
        setShowModal(true);
    };

    const closeBorrowModal = () => {
        setShowModal(false);
        setSelectedBook(null);
        setQuantity(1);
    };

    const handleBorrow = async () => {
        const token = localStorage.getItem("token");

        if (!selectedBook || quantity < 1) {
            alert("Vui lòng chọn số lượng hợp lệ!");
            return;
        }

        if (quantity > selectedBook.availableCopies) {
            alert(`Chỉ còn ${selectedBook.availableCopies} quyển!`);
            return;
        }

        try {
            await axios.post(
                '/borrow/create',
                { 
                    bookId: selectedBook.id,
                    quantity: quantity
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            
            alert(`Mượn thành công ${quantity} quyển!`);
            closeBorrowModal();
            await fetchBooks();
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Không thể mượn sách";
            alert(`Lỗi: ${errorMsg}`);
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
                        <p className={book.availableCopies <= 0 ? "out-of-stock" : ""}>
                            Số lượng còn: {book.availableCopies ?? 0}
                        </p>
                        <button
                            onClick={() => openBorrowModal(book)}
                            disabled={book.availableCopies <= 0}
                        >
                            {book.availableCopies <= 0 ? "Hết sách" : "Mượn sách"}
                        </button>
                    </div>
                ))}
            </div>

            {showModal && selectedBook && (
                <div className="modal-overlay" onClick={closeBorrowModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Mượn sách: {selectedBook.title}</h3>
                        <p>Số lượng còn lại: <strong>{selectedBook.availableCopies}</strong></p>
                        
                        <div className="quantity-selector">
                            <label htmlFor="quantity-input">Số lượng mượn:</label>
                            <input 
                                id="quantity-input"
                                type="number" 
                                value={quantity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value) || 1;
                                    setQuantity(Math.max(1, Math.min(selectedBook.availableCopies, value)));
                                }}
                                min="1"
                                max={selectedBook.availableCopies}
                                className="quantity-input"
                                placeholder={`Nhập từ 1 đến ${selectedBook.availableCopies}`}
                            />
                        </div>

                        <div className="modal-actions">
                            <button onClick={handleBorrow} className="btn-confirm">
                                Xác nhận mượn
                            </button>
                            <button onClick={closeBorrowModal} className="btn-cancel">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
