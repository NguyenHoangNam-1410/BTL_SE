import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../../component/NavigationBar";
import logo from "../../assets/logo.png";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState(""); // State để lưu username
  const [password, setPassword] = useState(""); // State để lưu password
  const navigate = useNavigate();

  const handleLogin = () => {
    // Giả sử logic kiểm tra đơn giản (thay bằng API gọi đến server trong thực tế)
    if (username === "nhvu2311@gmail.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập
      navigate("/Homepage/User"); // Điều hướng đến trang User Home
    } else {
      alert("Invalid username or password"); // Hiển thị cảnh báo nếu sai thông tin
    }
  };

  return (
    <div className="login_hinhnen">
      <NavigationBar />
      <div className="login_login">
        <div className="logo_login">
          <img src={logo} alt="logo" />
          <h1>Log in</h1>
        </div>
        <div className="user_pass">
          <div className="userName">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Cập nhật username
            />
          </div>
          <div className="pass">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Cập nhật password
            />
          </div>
        </div>
        <div className="button_login">
          <Link to="/">
            <button>Cancel</button>
          </Link>
          <button onClick={handleLogin}>Login</button> {/* Gắn sự kiện login */}
        </div>
      </div>
    </div>
  );
}

export default Login;
