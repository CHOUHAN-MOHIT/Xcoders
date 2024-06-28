import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import { UserContext } from "../contexts/UserContext";

const Register = ({ showLogin, setShowLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { setMessage } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      await register({ name, email, password });
      setMessage("Registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  const showLoginForm = () => {
    setShowLogin(true);
  };

  if (showLogin) return <></>;

  return (
    <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg p-5 bg-gray-900 text-white shadow-lg shadow-gray-900/50">
      <h2 className="text-2xl font-bold pb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2 px-4"
            placeholder="Andrew Jackson"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium">
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
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium">
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
        <div className="mb-3">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2 px-4"
            placeholder="*********"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center mb-3">
          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-8 w-full sm:w-auto"
          >
            Register
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center text-sm">
        <p>Already have an account?</p>
        <p
          onClick={showLoginForm}
          className="underline cursor-pointer ml-1 text-indigo-600 hover:text-indigo-500 font-bold"
        >
          Sign in
        </p>
      </div>
    </div>
  );
};

export default Register;
