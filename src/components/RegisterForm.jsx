import { useState } from "react";
import { register } from "../routes/auth-client";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // dùng lại CSS của login form

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            alert("Đăng ký thành công! ");
            // Thêm delay nhẹ 1s cho người dùng kịp thấy alert
            setTimeout(() => navigate("/login"), 800);
        } catch (error) {
            console.error("Register failed:", error.response?.data);
            alert("Đăng ký thất bại, vui lòng thử lại!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng ký</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}
