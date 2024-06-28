import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Message from "./Message";

const Navbar = () => {
  const { accessToken, setAccessToken, setUser, setMessage } =
    useContext(UserContext);

  const handleLogout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setMessage("Logged out successfully!");
  };

  return (
    <>
      <div className="w-full md:px-40 container mx-auto">
        <div className="w-full flex items-center justify-between">
          <Link
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            to="/"
          >
            X
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              Coders
            </span>
          </Link>
          <div className="flex justify-center content-center">
            <Link
              className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              to="/problems/"
            >
              Problems
            </Link>
            <Link
              className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              to="/contests/"
            >
              Contests
            </Link>
            <Link
              className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              to="/feedback/"
            >
              Feedback
            </Link>
          </div>
          <div className="flex justify-center content-center">
            {accessToken ? (
              <a
                className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                href="#"
                onClick={handleLogout}
              >
                Logout
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
      <Message />
      </div>
    </>
  );
};

export default Navbar;
