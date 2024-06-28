import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const Message = () => {
  const { message, clearMessage } = useContext(UserContext);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000); // Clear message after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

    if (!message) return null;

  return (
    <div className="grid  place-content-end mt-2 ">
      <p className=" bg-green-500 text-white rounded shadow-md py-2 px-4">
        {message}
      </p>
    </div>
  );
};

export default Message;
