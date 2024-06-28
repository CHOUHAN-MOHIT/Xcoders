import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { UserContext } from "../contexts/UserContext";

const Login = ({ showLogin, setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setMessage } =
    useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      setAccessToken(userData.access);
      setRefreshToken(userData.refresh);
      setMessage("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  const showRegisterForm = () => {
    setShowLogin(false);
  };

  if (!showLogin) return <></>;
  return (
    <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg p-5 bg-gray-900 text-white shadow-lg shadow-gray-900/50">
      <h2 className="text-2xl font-bold pb-5 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2 px-4"
            placeholder="andrew@mail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2 px-4"
            placeholder="*********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end mb-4">
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center mb-4">
          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-8 w-full sm:w-auto"
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center text-white mt-4">
        <div className="text-sm">Not registered yet?</div>
        <button
          onClick={showRegisterForm}
          className="underline cursor-pointer ml-1 text-sm text-indigo-600 hover:text-indigo-500 font-bold"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
