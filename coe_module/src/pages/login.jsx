import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../pages/AuthContex"; 

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setAuthToken } = useAuth(); 

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setError("");
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          user_name: username,
          password: password,
        },
        {
          withCredentials: true, 
        }
      );

      if (response.status === 200) {
        navigate("/AdminAccess"); 
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error); 
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md p-6 space-y-6 bg-slate-200 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src="/login.png" alt="Login" className="w-36 h-36" />
        </div>

        <h2 className="text-xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
              className="input-class-inp w-full p-2 border rounded-md"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              className="input-class-inp w-full p-2 border rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition-colors ${
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
