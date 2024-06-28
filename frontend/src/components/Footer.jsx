import React from "react";
import linkedInLogo from '../assets/logos/linkedin-svgrepo-com.svg'

const Footer = () => {
  return (
    <div className="absolute bottom-5 w-full flex justify-center content-center">
      <a
        className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
        href="https://twitter.com/intent/tweet?url=#"
      >
        <img src={linkedInLogo} className="h-6" />
      </a>
      <a
        className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
        href="https://www.facebook.com/sharer/sharer.php?u=#"
      >
        <svg
          className="fill-current h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
        </svg>
      </a>
    </div>
  );
};

export default Footer;
