import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("onboardingData");
    if (data) setUser(JSON.parse(data));
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("onboardingData", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
