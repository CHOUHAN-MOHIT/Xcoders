import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, accessToken, setAccessToken, refreshToken, setRefreshToken, message, setMessage, clearMessage }}>
      {children}
    </UserContext.Provider>
  );
};
