import { useState } from "react";
import { login } from "../routes/auth-client";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            alert("Đăng nhập thành công!");
            navigate("/home");
        } catch (error) {
            console.error("Login failed:", error.response?.data);
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Login</button>
        </form>
    );
}
