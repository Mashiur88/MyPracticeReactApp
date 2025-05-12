import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        userId,
        password,
      });

      const token = response?.data?.token || "abc";
      localStorage.setItem("jwt", token);

      dispatch(login());
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked (connect to OAuth logic)");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign in to your account</h2>
        <p className="text-center text-sm text-gray-500">Use your credentials or Google</p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-md text-center">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition duration-200"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <div className="h-px bg-gray-300 w-full" />
          <span>OR</span>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center text-gray-500">
          Forgot password? <a href="#" className="text-blue-600 hover:underline">Reset it</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
