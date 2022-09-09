import React, { useState } from "react";

export const context = React.createContext();

const LoginContext = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  return (
    <context.Provider
      value={{ isError, setIsError, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </context.Provider>
  );
};
export default LoginContext;
