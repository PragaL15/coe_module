import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../../public/login.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(""); // Clear error when typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error when typing
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "password") {
        navigate("/dashboard"); 
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md p-4 space-y-6 ml-9 bg-slate rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img
            src="/login.png"
            alt="Login"
            className="w-44 h-36"
          />
        </div>

        <h2 className="text-sm font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium ">Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="input-class-inp"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-class-inp"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
